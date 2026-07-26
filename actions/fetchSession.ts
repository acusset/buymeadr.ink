import { Product } from "@/lib/types";

export const fetchSession = async (product: Product): Promise<{ url?: string }> => {
  return fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .catch(() => {
      // swallow errors
    });
}
