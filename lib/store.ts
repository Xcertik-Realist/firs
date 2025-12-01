import { create } from "zustand";
import { persist } from "zustand/middleware";

type Variant = {
  height: string;
  price: number;
  sku: string;
  inStock: boolean;
};

type CartItem = {
  id: string;
  name: string;
  image: string;
  selectedVariant: Variant;
  quantity: number;
};

type Store = {
  items: CartItem[];
  discountCode: string | null;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (sku: string) => void;
  updateQuantity: (sku: string, qty: number) => void;
  applyDiscount: (code: string) => void;
  clearCart: () => void;
  getTotal: () => number;
};

export const useCartStore = create<Store>()(
  persist(
    (set, get) => ({
      items: [],
      discountCode: null,
      addToCart: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.selectedVariant.sku === item.selectedVariant.sku);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.selectedVariant.sku === item.selectedVariant.sku
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeFromCart: (sku) => set((state) => ({ items: state.items.filter((i) => i.selectedVariant.sku !== sku) })),
      updateQuantity: (sku, qty) =>
        set((state) => ({
          items: state.items.map((i) => (i.selectedVariant.sku === sku ? { ...i, quantity: qty } : i)),
        })),
      applyDiscount: (code) => set({ discountCode: code }),
      clearCart: () => set({ items: [], discountCode: null }),
      getTotal: () => {
        const subtotal = get().items.reduce((sum, i) => sum + i.selectedVariant.price * i.quantity, 0);
        if (get().discountCode === "FIR25") return subtotal * 0.75;
        if (get().discountCode === "SAVE30XMAS") return subtotal * 0.7;
        return subtotal;
      },
    }),
    { name: "scandinavianfirs-cart" }
  )
);
