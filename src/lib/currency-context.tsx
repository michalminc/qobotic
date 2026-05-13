"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";

export type CurrencyCode = "EUR" | "USD" | "PLN";

interface CurrencyCtx {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  convert: (eurAmount: number) => number;
  format: (eurAmount: number) => string;
  symbol: string;
  rates: Record<CurrencyCode, number>;
  loading: boolean;
}

const SYMBOLS: Record<CurrencyCode, string> = { EUR: "€", USD: "$", PLN: "zł" };

const FALLBACK_RATES: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.08,
  PLN: 4.28,
};

const CurrencyContext = createContext<CurrencyCtx>({
  currency: "EUR",
  setCurrency: () => {},
  convert: (n) => n,
  format: (n) => `€${n}`,
  symbol: "€",
  rates: FALLBACK_RATES,
  loading: false,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchRates() {
      try {
        // Free API — ECB rates via frankfurter.app
        const res = await fetch("https://api.frankfurter.app/latest?from=EUR&to=USD,PLN");
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        if (!cancelled) {
          setRates({
            EUR: 1,
            USD: data.rates.USD ?? FALLBACK_RATES.USD,
            PLN: data.rates.PLN ?? FALLBACK_RATES.PLN,
          });
        }
      } catch {
        // Use fallback rates silently
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRates();
    return () => { cancelled = true; };
  }, []);

  const convert = useCallback(
    (eurAmount: number) => {
      const converted = eurAmount * rates[currency];
      return Math.round(converted);
    },
    [currency, rates]
  );

  const format = useCallback(
    (eurAmount: number) => {
      const converted = convert(eurAmount);
      const sym = SYMBOLS[currency];
      const formatted = converted.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return currency === "PLN" ? `${formatted} ${sym}` : `${sym}${formatted}`;
    },
    [convert, currency]
  );

  const value = useMemo(() => ({
    currency, setCurrency, convert, format,
    symbol: SYMBOLS[currency], rates, loading,
  }), [currency, setCurrency, convert, format, rates, loading]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
