"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import type { Robot, Skill } from "@/lib/data";

/* ── Types ── */

export type CartItemType = "buy" | "rent" | "subscribe";

export type SubscriptionPlan = "monthly" | "quarterly" | "annual";

export const PLAN_DISCOUNTS: Record<SubscriptionPlan, number> = {
  monthly: 1,
  quarterly: 0.9,
  annual: 0.75,
};

export const PLAN_LABELS: Record<SubscriptionPlan, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly (-10%)",
  annual: "Annual (-25%)",
};

export interface CartItem {
  id: string; // unique cart item id
  type: CartItemType;
  robot: Robot;
  skills: Skill[];

  // Rent-specific (1-30 days, paid upfront)
  startDate?: string; // YYYY-MM-DD
  endDate?: string;
  days?: number;

  // Subscribe-specific
  plan?: SubscriptionPlan;
}

/* ── Price helpers ── */

/** Monthly subscription price = rental price × 20 (approx 20 working days) */
export function monthlyPrice(robot: Robot): number {
  return robot.rentalPrice * 20;
}

export function itemTotal(item: CartItem): number {
  const skillsCost = item.skills.reduce((sum, s) => sum + s.price, 0);

  switch (item.type) {
    case "buy":
      return item.robot.buyPrice + skillsCost;

    case "rent": {
      const days = item.days ?? 1;
      return item.robot.rentalPrice * days + skillsCost;
    }

    case "subscribe": {
      const plan = item.plan ?? "monthly";
      const discount = PLAN_DISCOUNTS[plan];
      const monthly = Math.round(monthlyPrice(item.robot) * discount);
      return monthly + skillsCost; // first month + skills
    }
  }
}

/** Deposit for subscriptions (10% of robot buy price, max €2000) */
export function depositAmount(robot: Robot): number {
  return Math.min(Math.round(robot.buyPrice * 0.1), 2000);
}

/* ── Context ── */

interface CartCtx {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
  rentItems: CartItem[];
  buyItems: CartItem[];
  subscribeItems: CartItem[];
}

const CartContext = createContext<CartCtx>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
  clearCart: () => {},
  itemCount: 0,
  totalPrice: 0,
  rentItems: [],
  buyItems: [],
  subscribeItems: [],
});

let nextId = 1;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    setItems((prev) => [...prev, { ...item, id: `cart-${nextId++}` }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<CartItem>) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updates } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.length;
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + itemTotal(i), 0), [items]);
  const rentItems = useMemo(() => items.filter((i) => i.type === "rent"), [items]);
  const buyItems = useMemo(() => items.filter((i) => i.type === "buy"), [items]);
  const subscribeItems = useMemo(() => items.filter((i) => i.type === "subscribe"), [items]);

  const value = useMemo(() => ({
    items, addItem, removeItem, updateItem, clearCart,
    itemCount, totalPrice, rentItems, buyItems, subscribeItems,
  }), [items, addItem, removeItem, updateItem, clearCart, itemCount, totalPrice, rentItems, buyItems, subscribeItems]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
