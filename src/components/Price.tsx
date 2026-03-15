"use client";
import { useCurrency } from "@/context/CurrencyContext";

interface PriceProps {
  amount: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Price({ amount, className, style }: PriceProps) {
  const { formatPrice } = useCurrency();
  return (
    <span className={className} style={style}>
      {formatPrice(amount)}
    </span>
  );
}
