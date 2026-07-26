import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockCreate } = vi.hoisted(() => ({ mockCreate: vi.fn() }));

vi.mock("stripe", () => ({
  default: class MockStripe {
    checkout = { sessions: { create: mockCreate } };
  },
}));

import { POST } from "./route";

describe("POST /api/session", () => {
  beforeEach(() => {
    mockCreate.mockReset();
    mockCreate.mockResolvedValue({
      url: "https://checkout.stripe.com/c/pay/cs_test_123",
    });
  });

  it("creates a Stripe Checkout session for the given product and returns its url", async () => {
    const request = new Request("http://localhost/api/session", {
      method: "POST",
      body: JSON.stringify({
        name: "kombucha",
        description: "kombucha",
        price: 700,
        imageUri: "001-kombucha.svg",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(body).toEqual({
      url: "https://checkout.stripe.com/c/pay/cs_test_123",
    });
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          expect.objectContaining({
            quantity: 1,
            price_data: expect.objectContaining({
              currency: "sgd",
              unit_amount: 700,
              product_data: expect.objectContaining({ name: "kombucha" }),
            }),
          }),
        ],
        success_url: expect.stringContaining(
          "/success?session_id={CHECKOUT_SESSION_ID}",
        ),
        cancel_url: expect.stringContaining("/cancel"),
      }),
    );
  });
});
