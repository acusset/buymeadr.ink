import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            url: "https://checkout.stripe.com/c/pay/cs_test_123",
          }),
      }),
    );
  });

  it("renders the product name and formatted price", () => {
    render(
      <ProductCard
        name="kombucha"
        description="kombucha"
        price={700}
        imageUri="001-kombucha.svg"
      />,
    );

    expect(screen.getByText("kombucha")).toBeInTheDocument();
    expect(screen.getByText("S$7.00")).toBeInTheDocument();
  });

  it("posts the product to /api/session and redirects to the returned Checkout url on click", async () => {
    delete (window as unknown as { location?: unknown }).location;
    (window as unknown as { location: { href: string } }).location = {
      href: "",
    };

    render(
      <ProductCard
        name="kombucha"
        description="kombucha"
        price={700}
        imageUri="001-kombucha.svg"
      />,
    );

    fireEvent.click(screen.getByText("kombucha"));

    await waitFor(() => {
      expect(window.location.href).toBe(
        "https://checkout.stripe.com/c/pay/cs_test_123",
      );
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/session",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "kombucha",
          description: "kombucha",
          price: 700,
          imageUri: "001-kombucha.svg",
        }),
      }),
    );
  });
});
