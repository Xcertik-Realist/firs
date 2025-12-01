"use client";

import { useCartStore } from "@/lib/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  addressLine1: z.string().min(5),
  addressLine2: z.string().optional(),
  townCity: z.string().min(2),
  postcode: z.string().regex(/^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i, "Valid UK postcode"),
  deliveryDate: z.string().min(1),
  cardName: z.string().min(3),
  cardNumber: z.string().length(16),
  expiryMonth: z.string().length(2),
  expiryYear: z.string().length(2),
  cvv: z.string().length(3),
});

export default function Checkout() {
  const { items, getTotal, discountCode, clearCart } = useCartStore();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    const order = { ...data, items, total: getTotal(), discountCode };
    await fetch("/api/submit-order", { method: "POST", body: JSON.stringify(order) });
    clearCart();
    window.location.href = "/order-success";
  };

  if (items.length === 0) return <p className="text-center py-20 text-3xl">Your cart is empty</p>;

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold text-green-900 text-center mb-10">Checkout</h1>
      <div className="bg-green-100 border-4 border-green-600 p-8 rounded-xl text-center text-2xl font-bold mb-10">
        NO PAYMENT TAKEN TODAY – Only charged when your tree ships
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Add all your input fields here – fullName, email, address, card details, etc. */}
        <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white py-6 text-3xl rounded-xl font-bold">
          Complete Order – Pay Nothing Today
        </button>
      </form>
    </div>
  );
}
