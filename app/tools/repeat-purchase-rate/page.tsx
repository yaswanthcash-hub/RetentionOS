'use client';

import { useState } from 'react';
import RepeatPurchaseRateForm from './components/RepeatPurchaseRateForm';
import RepeatPurchaseRateResults from './components/RepeatPurchaseRateResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function RepeatPurchaseRatePage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Repeat Purchase Rate Calculator"
      description="Measure customer loyalty by tracking the percentage of customers who buy more than once."
    >
      {!results ? (
        <RepeatPurchaseRateForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <RepeatPurchaseRateResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
