"use client";

import { use, type ReactNode } from "react";
import Link from "next/link";
import type Stripe from "stripe";

export type SessionResult =
  | { status: "confirmed"; session: Stripe.Checkout.Session }
  | { status: "unconfirmed" };

export default function PaymentConfirmation({
  resultPromise,
  unconfirmedFallback,
}: {
  resultPromise: Promise<SessionResult>;
  unconfirmedFallback: ReactNode;
}) {
  const result = use(resultPromise);

  if (result.status === "unconfirmed") {
    return unconfirmedFallback;
  }

  const { session } = result;
  const amount =
    session.amount_total != null
      ? (session.amount_total / 100).toFixed(2)
      : null;
  const currency = session.currency?.toUpperCase();
  const productName = session.line_items?.data?.[0]?.description;

  return (
    <div className="notification is-success has-text-centered">
      <p className="title is-4">
        Thank you{productName ? ` for the ${productName}` : " for the drink"}!
      </p>
      <p className="subtitle is-6">
        Payment confirmed{amount ? ` — ${currency} $${amount}` : ""}.
      </p>
      <Link href="/" className="button is-primary mt-4">
        Back to drinks
      </Link>
    </div>
  );
}
