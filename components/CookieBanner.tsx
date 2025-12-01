"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookies-accepted")) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 text-center z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies to ensure you get the best experience. No personal data is stored.
        </p>
        <button
          onClick={() => {
            localStorage.setItem("cookies-accepted", "true");
            setShow(false);
          }}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
