"use client";

import { fetchSession } from "@/actions/fetchSession";
import type { Product } from "@/lib/types";
import { useState } from "react";

export default function ProductCardButton({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    const result = await fetchSession(product);

    if (result.url) {
      window.location.href = result.url;
      return; // keep isLoading true through the redirect, no flash back to idle
    }

    setError(result.error ?? "Something went wrong. Please try again.");
    setIsLoading(false);
  };

  return (
    <button
      type="button"
      className="card card-button"
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading && (
        <span className="loading-bar" aria-hidden="true" data-testid="loading-bar" />
      )}
      {children}
      {error && (
        <p className="help is-danger has-text-centered" role="alert">
          {error}
        </p>
      )}
    </button>
  );
}
