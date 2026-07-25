import ProductGrid from "@/components/ProductGrid";
import drinks from "@/lib/drinks.json";

export default function Home() {
  return (
    <section className="section is-small">
      <ProductGrid drinks={drinks} />
    </section>
  );
}
