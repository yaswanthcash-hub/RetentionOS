'use client';

// components/InlineCurrencySelector.tsx
import { useState } from 'react';
import { currencies, Currency } from './CurrencySelector';

interface InlineCurrencySelectorProps {
  value: string;
  onChange: (currency: string) => void;
  className?: string;
}

export default function InlineCurrencySelector({ value, onChange, className = '' }: InlineCurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedCurrency = currencies.find(c => c.code === value) || currencies[0];

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-l-lg hover:bg-gray-100 transition text-sm font-semibold"
      >
        <span>{selectedCurrency.symbol}</span>
        <span className="text-gray-400 text-xs">▼</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-48 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                type="button"
                onClick={() => {
                  onChange(currency.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition flex items-center justify-between text-sm ${
                  currency.code === value ? 'bg-gray-50 font-semibold' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{currency.symbol}</span>
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
