/**
 * Purpose: Provides global shopping cart state and actions to the application.
 *
 * Responsibilities:
 * - Maintain an array of CartItems (product snapshot + quantity + selected size).
 * - Expose addItem, removeItem, updateQuantity, and clearCart actions.
 * - Derive cartCount and subtotal from cart state so consumers never compute them.
 * - Manage cart drawer open/close state via isCartOpen, openCart, closeCart so
 *   any component (e.g. ProductActions) can trigger the drawer after addItem.
 * - Persist cart to localStorage under "luxarist_cart" on every state change.
 * - Rehydrate cart from localStorage on initial load.
 * - Expose a useCart hook that throws if used outside CartProvider.
 *
 * Usage:
 *   // Wrap the app in main.tsx:
 *   <CartProvider>
 *     <App />
 *   </CartProvider>
 *
 *   // In any component:
 *   const { cart, addItem, openCart, cartCount, subtotal } = useCart();
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
 
// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
 
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  selectedSize: string | null;
  quantity: number;
}
 
interface CartContextType {
  // Cart state
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  // Cart actions
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, selectedSize: string | null) => void;
  updateQuantity: (productId: string, selectedSize: string | null, quantity: number) => void;
  clearCart: () => void;
  // Drawer state
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}
 
// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────
 
const CartContext = createContext<CartContextType | undefined>(undefined);
 
const STORAGE_KEY = "luxarist_cart";
 
// ─────────────────────────────────────────────────────────────────────────────
// Helper — two items are the same line if productId AND selectedSize match
// ─────────────────────────────────────────────────────────────────────────────
 
function isSameLine(a: CartItem, productId: string, selectedSize: string | null) {
  return a.productId === productId && a.selectedSize === selectedSize;
}
 
// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────
 
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
 
  const [isCartOpen, setIsCartOpen] = useState(false);
 
  // Persist to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);
 
  // ── Derived values ─────────────────────────────────────────────────────────
 
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = parseFloat(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );
 
  // ── Drawer actions ─────────────────────────────────────────────────────────
 
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
 
  // ── Cart actions ───────────────────────────────────────────────────────────
 
  const addItem = useCallback(
    (incoming: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      const qty = incoming.quantity ?? 1;
      setCart((prev) => {
        const existing = prev.find((item) =>
          isSameLine(item, incoming.productId, incoming.selectedSize)
        );
        if (existing) {
          return prev.map((item) =>
            isSameLine(item, incoming.productId, incoming.selectedSize)
              ? { ...item, quantity: item.quantity + qty }
              : item
          );
        }
        return [...prev, { ...incoming, quantity: qty }];
      });
    },
    []
  );
 
  const removeItem = useCallback(
    (productId: string, selectedSize: string | null) => {
      setCart((prev) =>
        prev.filter((item) => !isSameLine(item, productId, selectedSize))
      );
    },
    []
  );
 
  const updateQuantity = useCallback(
    (productId: string, selectedSize: string | null, quantity: number) => {
      if (quantity < 1) {
        setCart((prev) =>
          prev.filter((item) => !isSameLine(item, productId, selectedSize))
        );
        return;
      }
      setCart((prev) =>
        prev.map((item) =>
          isSameLine(item, productId, selectedSize)
            ? { ...item, quantity }
            : item
        )
      );
    },
    []
  );
 
  const clearCart = useCallback(() => setCart([]), []);
 
  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
 
// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────
 
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}