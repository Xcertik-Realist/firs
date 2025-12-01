import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function Header() {
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum: number, i: any) => sum + i.quantity, 0)
  );

  return (
    <header className="bg-green-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold">
          Scandinavian Firs
        </Link>
        <Link href="/cart" className="relative">
          <ShoppingCart size={32} />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-green-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
