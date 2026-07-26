import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ drinks }: { drinks: Product[] }) {
  const drinkCards = drinks.map((product) => (
    <div
      key={product.id}
      className="column is-2-fullhd is-one-fifth-widescreen is-one-quarter-desktop is-one-third-tablet is-half-mobile"
    >
      <ProductCard {...product} />
    </div>
  ));

  return (
    <div className="columns is-mobile is-multiline is-variable is-2">
      {drinkCards}
    </div>
  );
}
