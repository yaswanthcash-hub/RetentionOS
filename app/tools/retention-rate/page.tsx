'use client';

import { useState } from 'react';
import RetentionRateForm from './components/RetentionRateForm';
import RetentionRateResults from './components/RetentionRateResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function RetentionRatePage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Retention Rate Calculator"
      description="Calculate your Customer Retention Rate (CRR) to measure how well you keep customers over a specific period. A high CRR indicates product-market fit and sustainable growth."
    >
      {!results ? (
        <RetentionRateForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <RetentionRateResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
