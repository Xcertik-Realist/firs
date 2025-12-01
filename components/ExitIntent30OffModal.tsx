"use client";

import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCartStore } from "@/lib/store";

export default function ExitIntent30OffModal() {
  const [open, setOpen] = useState(false);
  const applyDiscount = useCartStore(s => s.applyDiscount);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem("seen30off2025")) {
        localStorage.setItem("seen30off2025", "true");
        setOpen(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-center max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-5xl font-bold text-red-600">
            WAIT! 30% OFF!
          </DialogTitle>
        </DialogHeader>
        <div className="py-8">
          <p className="text-3xl mb-6">Don’t leave without your tree!</p>
          <p className="text-2xl mb-8">Use code: <strong className="text-green-700">SAVE30XMAS</strong></p>
          <button
            onClick={() => {
              applyDiscount("SAVE30XMAS");
              setOpen(false);
            }}
            className="bg-red-600 hover:bg-red-700 text-white py-5 px-16 rounded-xl text-2xl font-bold"
          >
            Yes – Give Me 30% Off!
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
