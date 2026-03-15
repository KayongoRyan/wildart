"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "RWF";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (amountUsd: number) => string;
  rates: Record<CurrencyCode, number>;
  loading: boolean;
}

const defaultRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.87,
  GBP: 0.75,
  RWF: 1300,
};

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "USD",
  setCurrency: () => {},
  formatPrice: (n) => `$${n.toLocaleString()}`,
  rates: defaultRates,
  loading: false,
});

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  RWF: "RWF ",
};

const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD",
  GB: "GBP",
  UK: "GBP",
  RW: "RWF",
  FR: "EUR",
  DE: "EUR",
  ES: "EUR",
  IT: "EUR",
  BE: "EUR",
  NL: "EUR",
  AT: "EUR",
  PT: "EUR",
  IE: "EUR",
  KE: "USD",
  UG: "USD",
  TZ: "USD",
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(defaultRates);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch(
          "https://api.frankfurter.app/latest?from=USD&to=EUR,GBP"
        );
        if (res.ok) {
          const data = await res.json();
          setRates((prev) => ({
            ...prev,
            EUR: data.rates.EUR ?? prev.EUR,
            GBP: data.rates.GBP ?? prev.GBP,
          }));
        }
      } catch {
        // Keep default rates on error
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("sawa-currency") as CurrencyCode | null;
    if (stored && ["USD", "EUR", "GBP", "RWF"].includes(stored)) {
      setCurrencyState(stored);
      return;
    }
    // Try to detect from IP/country via free API
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        const country = data.country_code as string;
        const detected = COUNTRY_TO_CURRENCY[country];
        if (detected) {
          setCurrencyState(detected);
        }
      })
      .catch(() => {});
  }, []);

  function setCurrency(c: CurrencyCode) {
    setCurrencyState(c);
    if (typeof window !== "undefined") {
      localStorage.setItem("sawa-currency", c);
    }
  }

  function formatPrice(amountUsd: number): string {
    const amount = amountUsd * rates[currency];
    const symbol = CURRENCY_SYMBOLS[currency];
    if (currency === "RWF") {
      return `${symbol}${Math.round(amount).toLocaleString()}`;
    }
    return `${symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatPrice, rates, loading }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
