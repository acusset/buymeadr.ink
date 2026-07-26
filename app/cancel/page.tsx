import Link from "next/link";

export default function CancelPage() {
  return (
    <section className="section is-small">
      <div className="notification is-info has-text-centered">
        <p className="title is-4">Checkout canceled</p>
        <p className="subtitle is-6">You have not been charged.</p>
        <Link href="/" className="button is-light mt-4">
          Back to drinks
        </Link>
      </div>
    </section>
  );
}
