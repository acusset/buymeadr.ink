import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CancelPage from "./page";

describe("CancelPage", () => {
  it("shows a cancellation message with a link back home", () => {
    render(<CancelPage />);

    expect(screen.getByText("Checkout canceled")).toBeInTheDocument();
    expect(screen.getByText("You have not been charged.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to drinks" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
