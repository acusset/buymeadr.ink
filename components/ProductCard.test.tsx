import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductCard from "./ProductCard";

const product = {
  id: "001-kombucha",
  name: "kombucha",
  description: "kombucha",
  price: 700,
  imageUri: "001-kombucha.svg",
};

describe("ProductCard", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            url: "https://checkout.stripe.com/c/pay/cs_test_123",
          }),
      }),
    );
  });

  afterEach(() => {
    delete (window as unknown as { location?: unknown }).location;
    (window as unknown as { location: Location }).location = originalLocation;
  });

  it("renders the product name and formatted price", () => {
    render(<ProductCard {...product} />);

    expect(screen.getByText("kombucha")).toBeInTheDocument();
    expect(screen.getByText("S$7.00")).toBeInTheDocument();
  });

  it("posts the product to /api/session and redirects to the returned Checkout url on click", async () => {
    delete (window as unknown as { location?: unknown }).location;
    (window as unknown as { location: { href: string } }).location = {
      href: "http://localhost/",
    };

    render(<ProductCard {...product} />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(window.location.href).toBe(
        "https://checkout.stripe.com/c/pay/cs_test_123",
      );
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/session",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(product),
      }),
    );
  });

  it("shows a loading indicator while the checkout session is being created", async () => {
    let resolveFetch!: (value: unknown) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
      ),
    );

    render(<ProductCard {...product} />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-busy",
        "true",
      );
    });
    expect(screen.getByTestId("loading-bar")).toBeInTheDocument();

    resolveFetch({
      ok: true,
      json: () =>
        Promise.resolve({ url: "https://checkout.stripe.com/c/pay/cs_test_123" }),
    });
  });

  it("does not fire a second request while a checkout session request is in flight", async () => {
    let resolveFetch!: (value: unknown) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
      ),
    );

    render(<ProductCard {...product} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
    expect(fetch).toHaveBeenCalledTimes(1);

    resolveFetch({
      ok: true,
      json: () =>
        Promise.resolve({ url: "https://checkout.stripe.com/c/pay/cs_test_123" }),
    });
  });

  it("renders an inline error and re-enables the button when fetchSession fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    render(<ProductCard {...product} />);

    fireEvent.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not reach checkout. Please try again.",
    );

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "false");
  });
});
