'use client';

import { useState } from 'react';
import CACForm from './components/CACForm';
import CACResults from './components/CACResults';
import ToolLayout from '@/components/tools/ToolLayout';

export type CACResults = {
  cac: number;
  totalMarketingSpend: number;
  newCustomersAcquired: number;
  marketingSpendPerChannel: { channel: string; amount: number }[];
  averageOrderValue?: number;
  ltv?: number;
  ltvCacRatio?: number;
  paybackMonths?: number;
  profitMargin?: number;
  currency: string;
};

export default function CACCalculatorPage() {
  const [results, setResults] = useState<CACResults | null>(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => {
    setResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ToolLayout
      title="Customer Acquisition Cost (CAC) Calculator"
      description="Calculate how much you spend to acquire each customer across all marketing channels and measure your marketing efficiency."
    >
      {!results ? (
        <CACForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <CACResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
