import { getSiteUrl } from "@/lib/getSiteUrl";
import type { Product } from "@/lib/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!);

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
    success_url: `${siteUrl}?success=true`,
    cancel_url: `${siteUrl}?success=false`,
  });

  return NextResponse.json({ url: session.url });
}
