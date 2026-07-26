import { Suspense } from "react";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import ErrorBoundary from "@/components/ErrorBoundary";
import PaymentConfirmation, {
  type SessionResult,
} from "@/components/PaymentConfirmation";

async function getSessionResult(sessionId: string): Promise<SessionResult> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    if (session.payment_status !== "paid") {
      return { status: "unconfirmed" };
    }
    // Stripe's SDK attaches a non-enumerable `lastResponse` (raw HTTP
    // response) to this object, which fails React's plain-object check
    // when crossing the Server -> Client Component boundary.
    const { lastResponse: _lastResponse, ...plainSession } = session;
    return { status: "confirmed", session: plainSession };
  } catch {
    return { status: "unconfirmed" };
  }
}

function UnconfirmedNotice() {
  return (
    <div className="notification is-warning has-text-centered">
      <p>
        We couldn&apos;t confirm this payment. If you were charged, please
        contact us.
      </p>
      <Link href="/" className="button is-light mt-4">
        Back to drinks
      </Link>
    </div>
  );
}

function LoadingNotice() {
  return (
    <div className="notification has-text-centered">
      <button
        className="button is-loading is-white"
        aria-label="Confirming payment"
        disabled
      />
    </div>
  );
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  return (
    <section className="section is-small">
      {sessionId ? (
        <ErrorBoundary fallback={<UnconfirmedNotice />}>
          <Suspense fallback={<LoadingNotice />}>
            <PaymentConfirmation
              resultPromise={getSessionResult(sessionId)}
              unconfirmedFallback={<UnconfirmedNotice />}
            />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <UnconfirmedNotice />
      )}
    </section>
  );
}
