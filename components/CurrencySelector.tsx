'use client';

// components/CurrencySelector.tsx
import { useState } from 'react';

export type Currency = {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate to USD
};

export const currencies: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.12 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.50 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 7.24 },
];

interface CurrencySelectorProps {
  value: string;
  onChange: (currency: string) => void;
  className?: string;
}

export default function CurrencySelector({ value, onChange, className = '' }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedCurrency = currencies.find(c => c.code === value) || currencies[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-primary transition font-semibold text-sm"
      >
        <span>{selectedCurrency.symbol}</span>
        <span>{selectedCurrency.code}</span>
        <span className="text-gray-400">▼</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-20">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onChange(currency.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center justify-between ${
                  currency.code === value ? 'bg-gray-50 font-semibold' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{currency.symbol}</span>
                  <div>
                    <div className="font-semibold">{currency.code}</div>
                    <div className="text-xs text-gray-500">{currency.name}</div>
                  </div>
                </div>
                {currency.code === value && (
                  <span style={{ color: '#D1F25E' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Utility function to format currency
export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = currencies.find(c => c.code === currencyCode) || currencies[0];
  
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' ' + currency.symbol;
}

// Utility function to get currency symbol
export function getCurrencySymbol(currencyCode: string): string {
  const currency = currencies.find(c => c.code === currencyCode) || currencies[0];
  return currency.symbol;
}
