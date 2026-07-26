import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductGrid from "./ProductGrid";

describe("ProductGrid", () => {
  it("renders one ProductCard per drink", () => {
    const drinks = [
      { id: "001-kombucha", name: "kombucha", description: "kombucha", price: 700, imageUri: "001-kombucha.svg" },
      { id: "002-milk-box", name: "milk box", description: "milk box", price: 300, imageUri: "002-milk box.svg" },
    ];

    render(<ProductGrid drinks={drinks} />);

    expect(screen.getByText("kombucha")).toBeInTheDocument();
    expect(screen.getByText("milk box")).toBeInTheDocument();
  });
});
