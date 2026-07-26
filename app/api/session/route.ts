import { getSiteUrl } from "@/lib/getSiteUrl";
import { stripe } from "@/lib/stripe";
import type { Product } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const product: Product = await request.json();

  const siteUrl = getSiteUrl();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "sgd",
          product_data: {
            name: product.name,
            metadata: {
              productId: product.id,
            },
          },
          unit_amount: product.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
