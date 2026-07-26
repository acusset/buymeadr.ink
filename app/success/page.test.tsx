import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderToReadableStream } from "react-dom/server";
import type { ReactNode } from "react";
import SuccessPage from "./page";

const { mockRetrieve } = vi.hoisted(() => ({ mockRetrieve: vi.fn() }));

vi.mock("stripe", () => ({
  default: class MockStripe {
    checkout = { sessions: { retrieve: mockRetrieve } };
  },
}));

async function renderToHtml(node: ReactNode): Promise<string> {
  const stream = await renderToReadableStream(node);
  await stream.allReady;
  return new Response(stream).text();
}

describe("SuccessPage", () => {
  beforeEach(() => {
    mockRetrieve.mockReset();
  });

  it("shows the payment confirmation for a paid session", async () => {
    mockRetrieve.mockResolvedValue({
      payment_status: "paid",
      amount_total: 700,
      currency: "sgd",
      line_items: { data: [{ description: "kombucha" }] },
    });

    const jsx = await SuccessPage({
      searchParams: Promise.resolve({ session_id: "cs_test_123" }),
    });
    const html = await renderToHtml(jsx);

    expect(html).toContain("kombucha");
    expect(html).toContain("SGD $7.00");
    expect(mockRetrieve).toHaveBeenCalledWith("cs_test_123", {
      expand: ["line_items"],
    });
  });

  it("shows an unconfirmed notice when the session is not paid", async () => {
    mockRetrieve.mockResolvedValue({ payment_status: "unpaid" });

    const jsx = await SuccessPage({
      searchParams: Promise.resolve({ session_id: "cs_test_123" }),
    });
    const html = await renderToHtml(jsx);

    expect(html).toContain("confirm this payment");
  });

  it("shows an unconfirmed notice when Stripe retrieval fails", async () => {
    mockRetrieve.mockRejectedValue(new Error("Stripe API error"));

    const jsx = await SuccessPage({
      searchParams: Promise.resolve({ session_id: "cs_test_123" }),
    });
    const html = await renderToHtml(jsx);

    expect(html).toContain("confirm this payment");
  });

  it("shows an unconfirmed notice and never calls Stripe when session_id is missing", async () => {
    const jsx = await SuccessPage({ searchParams: Promise.resolve({}) });
    const html = await renderToHtml(jsx);

    expect(html).toContain("confirm this payment");
    expect(mockRetrieve).not.toHaveBeenCalled();
  });
});
