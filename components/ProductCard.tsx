"use client";

import Image from "next/image";
import { useState } from "react";
import ProductModal from "./ProductModal";

export default function ProductCard({ product }: { product: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      >
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
        </div>
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-green-900 mb-2">
            {product.name}
          </h3>
          <p className="text-3xl font-bold text-green-700">
            from £{Math.min(...product.variants.map((v: any) => v.price)).toFixed(2)}
          </p>
        </div>
      </button>

      <ProductModal product={product} open={open} setOpen={setOpen} />
    </>
  );
}
