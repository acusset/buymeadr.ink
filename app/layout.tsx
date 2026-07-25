import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./bulma.css";

export const metadata: Metadata = {
  title: "Buy me a dr.ink",
  description: "Please get me some drinks, I am thirsty.",
  icons: {
    icon: "/images/drinks/030-beer.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script src="https://js.stripe.com/v3" strategy="afterInteractive" />
        <section className="hero is-small">
          <div className="hero-body">
            <div className="container">
              <h1 className="title has-text-white has-text-centered">
                Would you like to buy me a drink?
              </h1>
            </div>
          </div>
        </section>
        {children}
        <footer className="footer is-small">
          <div className="content has-text-centered">
            <p>
              <strong>buymeadr.ink</strong> by{" "}
              <a href="https://github.com/acusset">acusset</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
