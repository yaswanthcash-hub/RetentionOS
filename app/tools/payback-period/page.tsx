'use client';

import { useState } from 'react';
import PaybackPeriodForm from './components/PaybackPeriodForm';
import PaybackPeriodResults from './components/PaybackPeriodResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function PaybackPeriodPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Payback Period Calculator"
      description="Calculate how long it takes to recover your customer acquisition costs and achieve profitability."
    >
      {!results ? (
        <PaybackPeriodForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <PaybackPeriodResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
