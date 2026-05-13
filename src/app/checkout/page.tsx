"use client";

import { ROBOT_IMAGES } from "@/lib/data";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { useCart, itemTotal, depositAmount, type CartItem } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { ArrowLeft, Lock, CreditCard, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";


const COUNTRIES = ["Germany", "France", "Netherlands", "Poland", "Czech Republic", "Austria"];

type Step = "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const { items, clearCart, subscribeItems } = useCart();
  const { format } = useCurrency();
  const router = useRouter();

  const [step, setStep] = useState<Step>("shipping");

  // Form state
  const [form, setForm] = useState({
    country: "Germany",
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "invoice">("card");

  if (items.length === 0 && step !== "confirmation") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <p className="text-[16px] text-[#888] mb-4">Your cart is empty</p>
            <Link href="/robots" className="text-[14px] text-[#c4484f] hover:text-[#e06068]">
              Browse robots &rarr;
            </Link>
          </div>
        </div>
      </>
    );
  }

  const totalPrice = items.reduce((s, i) => s + itemTotal(i), 0);
  const totalDeposit = subscribeItems.reduce((s, i) => s + depositAmount(i.robot), 0);
  const dueToday = totalPrice + totalDeposit;

  const isFormValid = form.firstName && form.lastName && form.email && form.address && form.city && form.zip;

  function handlePlaceOrder() {
    setStep("confirmation");
    clearCart();
  }

  function updateForm(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  /* ── Confirmation view ── */
  if (step === "confirmation") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="max-w-[480px] w-full text-center">
            <div className="w-16 h-16 rounded-full bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-[#22c55e]" />
            </div>
            <h1 className="text-[28px] font-bold tracking-[-0.03em] mb-3">Order Confirmed</h1>
            <p className="text-[15px] text-[#888] leading-relaxed mb-2">
              Thank you for your order! We&apos;ll send a confirmation email with delivery details shortly.
            </p>
            <p className="font-mono text-[13px] text-[#555] mb-8">
              Order #QBT-{Date.now().toString(36).toUpperCase()}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard"
                className="px-7 py-3 text-[14px] font-medium text-white bg-[#7e1c26] hover:bg-[#962330] rounded-full transition-all"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/robots"
                className="px-7 py-3 text-[14px] text-[#888] hover:text-white border border-[rgba(255,255,255,0.07)] rounded-full transition-all"
              >
                Continue browsing
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10">
          {/* Back link */}
          <Link href="/cart" className="inline-flex items-center gap-2 text-[13px] text-[#888] hover:text-white mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to cart
          </Link>

          {/* Steps indicator */}
          <div className="flex items-center gap-3 mb-10">
            {(["shipping", "payment"] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                {i > 0 && <div className="w-8 h-px bg-[rgba(255,255,255,0.1)]" />}
                <button
                  onClick={() => { if (s === "shipping" || (s === "payment" && isFormValid)) setStep(s); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-mono uppercase tracking-wider transition-all ${
                    step === s
                      ? "bg-[#7e1c26] text-white"
                      : "text-[#555] hover:text-[#888]"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">{i + 1}</span>
                  {s}
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column — form */}
            <div className="flex-1">
              {step === "shipping" && (
                <div className="space-y-6">
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">
                    Shipping Information
                  </span>

                  {/* Country */}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">Country</label>
                    <select
                      value={form.country}
                      onChange={(e) => updateForm("country", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#f0f0f8] outline-none focus:border-[#7e1c26] transition-colors appearance-none"
                    >
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="First Name" value={form.firstName} onChange={(v) => updateForm("firstName", v)} />
                    <InputField label="Last Name" value={form.lastName} onChange={(v) => updateForm("lastName", v)} />
                  </div>

                  <InputField label="Company (optional)" value={form.company} onChange={(v) => updateForm("company", v)} />
                  <InputField label="Email" value={form.email} onChange={(v) => updateForm("email", v)} type="email" />
                  <InputField label="Phone" value={form.phone} onChange={(v) => updateForm("phone", v)} type="tel" />
                  <InputField label="Address" value={form.address} onChange={(v) => updateForm("address", v)} />

                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="City" value={form.city} onChange={(v) => updateForm("city", v)} />
                    <InputField label="ZIP Code" value={form.zip} onChange={(v) => updateForm("zip", v)} />
                  </div>

                  <button
                    disabled={!isFormValid}
                    onClick={() => setStep("payment")}
                    className={`w-full py-3.5 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                      isFormValid
                        ? "bg-[#7e1c26] hover:bg-[#962330] text-white"
                        : "bg-[#151515] text-[#444] cursor-not-allowed"
                    }`}
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {step === "payment" && (
                <div className="space-y-6">
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block">
                    Payment Method
                  </span>

                  <div className="space-y-3">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl border transition-all text-left ${
                        paymentMethod === "card"
                          ? "bg-[#111] border-[#7e1c26]"
                          : "bg-[#0a0a0a] border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)]"
                      }`}
                    >
                      <CreditCard size={20} className="text-[#888] shrink-0" />
                      <div>
                        <span className="text-[14px] font-medium text-[#f0f0f8] block">Credit / Debit Card</span>
                        <span className="text-[12px] text-[#555]">Visa, Mastercard, AMEX</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("invoice")}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl border transition-all text-left ${
                        paymentMethod === "invoice"
                          ? "bg-[#111] border-[#7e1c26]"
                          : "bg-[#0a0a0a] border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)]"
                      }`}
                    >
                      <Building2 size={20} className="text-[#888] shrink-0" />
                      <div>
                        <span className="text-[14px] font-medium text-[#f0f0f8] block">Invoice / Bank Transfer</span>
                        <span className="text-[12px] text-[#555]">NET 30 for verified companies</span>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mt-4">
                      <InputField label="Card Number" value="" onChange={() => {}} placeholder="4242 4242 4242 4242" />
                      <div className="grid grid-cols-2 gap-3">
                        <InputField label="Expiry" value="" onChange={() => {}} placeholder="MM/YY" />
                        <InputField label="CVC" value="" onChange={() => {}} placeholder="123" />
                      </div>
                      <InputField label="Cardholder Name" value="" onChange={() => {}} placeholder={`${form.firstName} ${form.lastName}`} />
                    </div>
                  )}

                  {paymentMethod === "invoice" && (
                    <div className="p-5 rounded-xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)]">
                      <p className="text-[13px] text-[#888] leading-relaxed">
                        An invoice will be sent to <strong className="text-[#f0f0f8]">{form.email}</strong> after order confirmation. Payment is due within 30 days for verified company accounts.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[12px] text-[#555] mt-2">
                    <Lock size={12} />
                    <span>Your payment information is encrypted and secure</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-3.5 rounded-xl bg-[#7e1c26] hover:bg-[#962330] text-[14px] font-medium text-white transition-all duration-200"
                  >
                    Place Order &mdash; {format(dueToday)}
                  </button>
                </div>
              )}
            </div>

            {/* Right column — order summary */}
            <div className="w-full lg:w-[360px] shrink-0">
              <div className="sticky top-[100px] rounded-2xl bg-[#0a0a0a] border border-[rgba(255,255,255,0.07)] p-6">
                <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-white font-bold block mb-5">
                  Order Summary
                </span>

                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {items.map((item) => (
                    <MiniItem key={item.id} item={item} />
                  ))}
                </div>

                <div className="border-t border-[rgba(255,255,255,0.07)] mt-5 pt-5 space-y-2">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#888]">Subtotal</span>
                    <span className="text-[#f0f0f8] font-mono">{format(totalPrice)}</span>
                  </div>
                  {totalDeposit > 0 && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#888]">Deposit (refundable)</span>
                      <span className="text-[#f0f0f8] font-mono">{format(totalDeposit)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#888]">Shipping</span>
                    <span className="text-[#22c55e] font-mono">Free</span>
                  </div>
                </div>

                <div className="border-t border-[rgba(255,255,255,0.07)] mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="text-[15px] font-bold text-white">Due today</span>
                    <span className="font-mono text-[22px] font-bold text-[#c4484f]">{format(dueToday)}</span>
                  </div>
                </div>

                {/* Shipping address preview */}
                {form.firstName && (
                  <div className="mt-5 pt-5 border-t border-[rgba(255,255,255,0.07)]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#444] block mb-2">Ship to</span>
                    <p className="text-[13px] text-[#888] leading-relaxed">
                      {form.firstName} {form.lastName}<br />
                      {form.company && <>{form.company}<br /></>}
                      {form.address}<br />
                      {form.zip} {form.city}, {form.country}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InputField({
  label, value, onChange, type = "text", placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[rgba(255,255,255,0.07)] text-[14px] text-[#f0f0f8] placeholder:text-[#333] outline-none focus:border-[#7e1c26] transition-colors"
      />
    </div>
  );
}

function MiniItem({ item }: { item: CartItem }) {
  const { format } = useCurrency();
  const img = ROBOT_IMAGES[item.robot.id] ?? null;
  return (
    <div className="flex gap-3">
      {img && (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0">
          <Image src={img} alt={item.robot.name} fill className="object-contain p-0.5" sizes="48px" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <span className="text-[13px] font-medium text-[#f0f0f8] block truncate">{item.robot.name}</span>
        <span className="font-mono text-[10px] text-[#555]">
          {item.type === "buy" ? "Purchase" : item.type === "rent" ? `Rental · ${item.days}d` : "Subscription"}
        </span>
      </div>
      <span className="font-mono text-[13px] text-[#f0f0f8] shrink-0">{format(itemTotal(item))}</span>
    </div>
  );
}
