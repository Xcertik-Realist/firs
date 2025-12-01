"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCartStore } from "@/lib/store";

export default function FirstClickDiscountModal({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const applyDiscount = useCartStore(s => s.applyDiscount);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-center max-w-md">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-green-900">
            25% OFF YOUR FIRST ORDER!
          </DialogTitle>
        </DialogHeader>
        <div className="py-8">
          <p className="text-2xl mb-6">Use code: <strong className="text-green-700">FIR25</strong></p>
          <p className="text-gray-600 mb-8">
            Limited to the first 500 customers – applied automatically at checkout!
          </p>
          <button
            onClick={() => {
              applyDiscount("FIR25");
              setOpen(false);
            }}
            className="bg-green-700 hover:bg-green-600 text-white py-4 px-12 rounded-xl text-xl font-bold"
          >
            Claim 25% Off Now
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
