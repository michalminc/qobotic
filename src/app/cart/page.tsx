"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { useCart, itemTotal, depositAmount, monthlyPrice, PLAN_LABELS, PLAN_DISCOUNTS, type SubscriptionPlan, type CartItem } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { ArrowRight, Trash2, ShoppingCart, Plus, Lock, Truck, Headset } from "lucide-react";


function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="w-16 h-16 rounded-2xl bg-[#111] border border-[rgba(255,255,255,0.07)] flex items-center justify-center mb-6">
        <ShoppingCart size={28} className="text-[#444]" />
      </div>
      <h2 className="text-[20px] font-bold text-[#f0f0f8] mb-2">Your cart is empty</h2>
      <p className="text-[14px] text-[#888] mb-8">Configure a robot to get started</p>
      <Link
        href="/robots"
        className="inline-flex items-center gap-2 px-7 py-3 text-[14px] font-medium text-white bg-[#7e1c26] hover:bg-[#962330] rounded-full transition-all duration-150"
      >
        Browse robots <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function CartItemCard({ item, onRemove, categoryLabel }: { item: CartItem; onRemove: () => void; categoryLabel: string }) {
  const { format } = useCurrency();
  const img = (item.robot as any).images?.[0]?.url ?? null;
  const total = itemTotal(item);
  const robot = item.robot as any;

  return (
    <div className="rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] overflow-hidden">
      <div className="flex gap-0">
        {/* Robot image — left side */}
        <div className="relative w-[140px] sm:w-[180px] shrink-0 bg-[#080808]">
          {img ? (
            <Image src={img} alt={item.robot.name} fill className="object-cover" sizes="180px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center min-h-[160px]">
              <span className="font-mono text-[28px] text-[#222]">{item.robot.name[0]}</span>
            </div>
          )}
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
        </div>

        {/* Details — right side */}
        <div className="flex-1 min-w-0 p-5">
          {/* Category label */}
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-2">
            {categoryLabel}
          </span>
          {/* Header: name + remove */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[18px] font-bold text-[#f0f0f8] tracking-[-0.02em]">{item.robot.name}</h3>
              <p className="font-mono text-[12px] text-[#666] mt-0.5">
                {item.robot.brand} · {item.robot.type} · {robot.dof || 0} DOF
              </p>
            </div>
            <button
              onClick={onRemove}
              className="p-2 rounded-lg text-[#444] hover:text-[#c4484f] hover:bg-[rgba(126,28,38,0.1)] transition-all shrink-0"
              title="Remove from cart"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Type badge + details */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {item.type === "buy" && (
              <span className="px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] font-mono text-[12px] text-[#bbb] font-medium">
                Purchase
              </span>
            )}
            {item.type === "rent" && (
              <>
                <span className="px-3 py-1.5 rounded-lg bg-[rgba(126,28,38,0.12)] border border-[rgba(126,28,38,0.2)] font-mono text-[12px] text-[#c4484f] font-medium">
                  Rental · {item.days} days
                </span>
                {item.startDate && item.endDate && (
                  <span className="font-mono text-[11px] text-[#666]">
                    {item.startDate} → {item.endDate}
                  </span>
                )}
              </>
            )}
            {item.type === "subscribe" && (
              <>
                <span className="px-3 py-1.5 rounded-lg bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] font-mono text-[12px] text-[#5b9bf5] font-medium">
                  Subscription
                </span>
                <span className="font-mono text-[11px] text-[#666]">
                  {PLAN_LABELS[item.plan ?? "monthly"]}
                </span>
              </>
            )}
          </div>

          {/* Specs row */}
          <div className="mt-3 flex flex-wrap gap-2">
            {robot.speed > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#111] border border-[rgba(255,255,255,0.07)] font-mono text-[10px] text-[#555]">
                Speed {robot.speed}
              </span>
            )}
            {robot.strength > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#111] border border-[rgba(255,255,255,0.07)] font-mono text-[10px] text-[#555]">
                Strength {robot.strength}
              </span>
            )}
            {robot.torque > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#111] border border-[rgba(255,255,255,0.07)] font-mono text-[10px] text-[#555]">
                {robot.torque} Nm
              </span>
            )}
          </div>

          {/* Skills */}
          {item.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {item.skills.map((s) => (
                <span key={s.id} className="px-2 py-0.5 rounded-full bg-[rgba(126,28,38,0.08)] border border-[rgba(126,28,38,0.15)] font-mono text-[10px] text-[#c4484f]">
                  {s.name}
                </span>
              ))}
            </div>
          )}

          {/* Price row */}
          <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.05)] flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[22px] font-bold text-white">{format(total)}</span>
              {item.type === "rent" && (
                <span className="font-mono text-[12px] text-[#555]">{format(item.robot.rentalPrice)}/day × {item.days}d</span>
              )}
              {item.type === "subscribe" && (
                <span className="font-mono text-[12px] text-[#555]">/month</span>
              )}
            </div>
            {item.type === "subscribe" && (
              <span className="font-mono text-[12px] text-[#888]">
                + {format(depositAmount(item.robot))} deposit
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, removeItem, clearCart, totalPrice, rentItems, buyItems, subscribeItems, addItem } = useCart();
  const { format } = useCurrency();
  const addedRef = useRef(false);

  // Auto-add robot from URL params
  useEffect(() => {
    if (addedRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const robotId = params.get("add");
    const mode = params.get("mode") as "buy" | "rent" | "subscribe" | null;
    if (!robotId || !mode) return;
    addedRef.current = true;

    // Fetch robot from API
    fetch("/api/robots")
      .then((r) => r.json())
      .then((data: any[]) => {
        const robot = data.find((r: any) => r.id === robotId || r.slug === robotId);
        if (!robot) return;

        if (mode === "buy") {
          addItem({ type: "buy", robot, skills: [] });
        } else if (mode === "rent") {
          const today = new Date();
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7);
          addItem({ type: "rent", robot, skills: [], startDate: today.toISOString().slice(0, 10), endDate: nextWeek.toISOString().slice(0, 10), days: 7 });
        } else if (mode === "subscribe") {
          addItem({ type: "subscribe", robot, skills: [], plan: "monthly" });
        }
      })
      .catch(() => {});

    window.history.replaceState({}, "", "/cart");
  }, [addItem]);

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black">
          <div className="max-w-[900px] mx-auto px-6 lg:px-8">
            <EmptyCart />
          </div>
        </div>
      </>
    );
  }

  const totalDeposit = subscribeItems.reduce((sum, i) => sum + depositAmount(i.robot), 0);
  const dueToday = totalPrice + totalDeposit;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[32px] font-bold tracking-[-0.03em]">Cart</h1>
              <p className="text-[14px] text-[#888] mt-1">{items.length} {items.length === 1 ? "item" : "items"}</p>
            </div>
            <button
              onClick={clearCart}
              className="px-4 py-2 rounded-lg text-[13px] text-[#888] hover:text-[#c4484f] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(126,28,38,0.2)] transition-all"
            >
              Clear cart
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items column */}
            <div className="flex-1 space-y-3">
              {buyItems.map((item) => (
                <CartItemCard key={item.id} item={item} onRemove={() => removeItem(item.id)} categoryLabel="Purchase" />
              ))}
              {rentItems.map((item) => (
                <CartItemCard key={item.id} item={item} onRemove={() => removeItem(item.id)} categoryLabel="Short-term Rental" />
              ))}
              {subscribeItems.map((item) => (
                <CartItemCard key={item.id} item={item} onRemove={() => removeItem(item.id)} categoryLabel="Subscription" />
              ))}
            </div>

            {/* Order summary sidebar */}
            <div className="w-full lg:w-[340px] shrink-0">
              <div className="sticky top-[100px] rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] p-6">
                <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-5">
                  Order Summary
                </span>

                <div className="space-y-3">
                  {buyItems.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-[#888]">Purchases ({buyItems.length})</span>
                      <span className="font-mono text-[13px] text-[#f0f0f8]">
                        {format(buyItems.reduce((s, i) => s + itemTotal(i), 0))}
                      </span>
                    </div>
                  )}
                  {rentItems.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-[#888]">Rentals ({rentItems.length})</span>
                      <span className="font-mono text-[13px] text-[#f0f0f8]">
                        {format(rentItems.reduce((s, i) => s + itemTotal(i), 0))}
                      </span>
                    </div>
                  )}
                  {subscribeItems.length > 0 && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] text-[#888]">Subscriptions ({subscribeItems.length})</span>
                        <span className="font-mono text-[13px] text-[#f0f0f8]">
                          {format(subscribeItems.reduce((s, i) => s + itemTotal(i), 0))}/mo
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] text-[#888]">Deposit (refundable)</span>
                        <span className="font-mono text-[13px] text-[#f0f0f8]">{format(totalDeposit)}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t border-[rgba(255,255,255,0.07)] mt-5 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-bold text-white">Due today</span>
                    <span className="font-mono text-[22px] font-bold text-[#c4484f]">{format(dueToday)}</span>
                  </div>
                  {subscribeItems.length > 0 && (
                    <p className="font-mono text-[10px] text-[#555] mt-1 text-right">
                      Then {format(subscribeItems.reduce((s, i) => s + itemTotal(i), 0))}/mo recurring
                    </p>
                  )}
                </div>

                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2 w-full mt-6 px-6 py-3.5 rounded-xl bg-[#7e1c26] hover:bg-[#962330] text-[14px] font-medium text-white transition-all duration-150"
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </Link>

                <p className="text-center font-mono text-[10px] text-[#444] mt-3">
                  Secure payment &middot; Cancel anytime
                </p>
              </div>
            </div>
          </div>

          {/* You may also need */}
          <SuggestedSkills />

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-10 py-8 border-t border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-2.5">
              <Lock size={16} className="text-[#555]" />
              <span className="font-mono text-[12px] text-[#555]">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck size={16} className="text-[#555]" />
              <span className="font-mono text-[12px] text-[#555]">48h Delivery</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Headset size={16} className="text-[#555]" />
              <span className="font-mono text-[12px] text-[#555]">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface SuggestedSkill {
  id: string;
  name: string;
  author: string;
  price: number;
  icon?: string | null;
}

function SuggestedSkills() {
  const [skills, setSkills] = useState<SuggestedSkill[]>([]);
  const { format } = useCurrency();

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((data: SuggestedSkill[]) => {
        setSkills(data.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  if (skills.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="mb-4">
        <h2 className="text-[18px] font-bold text-[#f0f0f8] tracking-[-0.02em]">You may also need</h2>
        <p className="text-[13px] text-[#555] mt-1">Popular AI skills for your robot</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="min-w-[200px] max-w-[220px] shrink-0 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              {skill.icon && <span className="text-[18px]">{skill.icon}</span>}
              <span className="font-mono text-[13px] font-medium text-[#f0f0f8] truncate">{skill.name}</span>
            </div>
            <span className="font-mono text-[11px] text-[#555] truncate">{skill.author}</span>
            <div className="mt-auto pt-3 flex items-center justify-between">
              <span className="font-mono text-[14px] font-bold text-white">
                {skill.price === 0 ? "Free" : format(skill.price)}
              </span>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[rgba(126,28,38,0.12)] border border-[rgba(126,28,38,0.2)] text-[#c4484f] font-mono text-[11px] font-medium hover:bg-[rgba(126,28,38,0.2)] transition-colors">
                <Plus size={12} />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
