import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-green-900 mb-12">
            Choose Your Perfect Tree
          </h2>
          <ProductGrid />
        </div>
      </section>
    </>
  );
}
