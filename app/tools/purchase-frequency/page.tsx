'use client';

import { useState } from 'react';
import PurchaseFrequencyForm from './components/PurchaseFrequencyForm';
import PurchaseFrequencyResults from './components/PurchaseFrequencyResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function PurchaseFrequencyPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Purchase Frequency Calculator"
      description="Calculate how often your customers make repeat purchases to optimize your retention strategy."
    >
      {!results ? (
        <PurchaseFrequencyForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <PurchaseFrequencyResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
