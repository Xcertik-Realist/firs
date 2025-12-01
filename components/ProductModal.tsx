"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import SizeSelector from "./SizeSelector";
import StockBadge from "./StockBadge";
import { useCartStore } from "@/lib/store";
import FirstClickDiscountModal from "./FirstClickDiscountModal";
import WaitlistModal from "./WaitlistModal";

export default function ProductModal({ product, open, setOpen }: any) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants.find((v: any) => v.inStock) || product.variants[0]);
  const [showFirstDiscount, setShowFirstDiscount] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const addToCart = useCartStore(s => s.addToCart);

  const handleOpen = () => {
    if (!localStorage.getItem("seen25off2025")) {
      localStorage.setItem("seen25off2025", "true");
      setShowFirstDiscount(true);
    } else {
      setOpen(true);
    }
  };

  const handleAdd = () => {
    if (!selectedVariant.inStock) {
      setShowWaitlist(true);
      return;
    }
    addToCart({ ...product, selectedVariant, quantity: 1 });
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open && !showFirstDiscount} onOpenChange={handleOpen}>
        <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl text-green-900">{product.name}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="relative aspect-square">
              <Image src={product.image} alt={product.name} fill className="object-cover rounded-xl" />
            </div>
            <div className="space-y-6">
              <SizeSelector variants={product.variants} selected={selectedVariant} onSelect={setSelectedVariant} />
              <div className="flex items-center gap-4">
                <StockBadge inStock={selectedVariant.inStock} />
                <p className="text-4xl font-bold text-green-700">£{selectedVariant.price.toFixed(2)}</p>
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-green-700 hover:bg-green-600 disabled:bg-gray-400 text-white py-5 rounded-xl text-xl font-bold transition"
              >
                {selectedVariant.inStock ? "Add to Cart" : "Sold Out – Join Waitlist"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <FirstClickDiscountModal open={showFirstDiscount} setOpen={setShowFirstDiscount} />
      <WaitlistModal open={showWaitlist} setOpen={setShowWaitlist} variant={selectedVariant} productName={product.name} />
    </>
  );
}
