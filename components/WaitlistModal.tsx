"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export default function WaitlistModal({ open, setOpen, variant, productName }: any) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    await fetch("/api/waitlist/subscribe", {
      method: "POST",
      body: JSON.stringify({ email, productName, height: variant.height }),
    });
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">This size is sold out</DialogTitle>
        </DialogHeader>
        {submitted ? (
          <p className="text-center py-8 text-xl">You’re on the list! We’ll email you the second it’s back.</p>
        ) : (
          <div className="space-y-6 py-6">
            <p className="text-lg">
              <strong>{productName} – {variant.height}</strong> is currently sold out.
            </p>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-green-700 hover:bg-green-600 text-white py-4 rounded-lg font-bold text-lg"
            >
              Notify Me When Back in Stock
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
