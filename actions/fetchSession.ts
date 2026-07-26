import { Product } from "@/lib/types";

export type FetchSessionResult =
  | { url: string; error?: undefined }
  | { url?: undefined; error: string };

export const fetchSession = async (
  product: Product,
): Promise<FetchSessionResult> => {
  try {
    const response = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      return { error: `Checkout session request failed (${response.status})` };
    }

    const data = await response.json();
    if (!data?.url) {
      return { error: "No checkout URL returned" };
    }

    return { url: data.url };
  } catch {
    return { error: "Could not reach checkout. Please try again." };
  }
};
