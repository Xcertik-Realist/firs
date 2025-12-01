"use client";

import { useCartStore } from "@/lib/store";
import Link from "next/link";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCartStore();

  if (items.length === 0) return <p className="text-center py-20 text-3xl">Cart empty</p>;

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold text-green-900 mb-10">Your Cart</h1>
      {items.map((i: any) => (
        <div key={i.selectedVariant.sku} className="flex justify-between items-center py-4 border-b">
          <div>
            <p className="text-xl">{i.name} – {i.selectedVariant.height}</p>
            <p>£{i.selectedVariant.price.toFixed(2)} × {i.quantity}</p>
          </div>
          <button onClick={() => removeFromCart(i.selectedVariant.sku)} className="text-red-600">Remove</button>
        </div>
      ))}
      <div className="text-right text-3xl font-bold mt-10">
        Total: £{getTotal().toFixed(2)}
      </div>
      <Link href="/checkout" className="block text-center bg-green-700 text-white py-6 text-2xl rounded-xl mt-10">
        Proceed to Checkout
      </Link>
    </div>
  );
}
