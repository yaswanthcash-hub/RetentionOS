'use client';

import { useState } from 'react';
import LtvCacRatioForm from './components/LtvCacRatioForm';
import LtvCacRatioResults from './components/LtvCacRatioResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function LtvCacRatioPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="LTV:CAC Ratio Calculator"
      description="Determine the sustainability of your business model. The LTV:CAC ratio measures the relationship between the lifetime value of a customer and the cost to acquire them."
    >
      {!results ? (
        <LtvCacRatioForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <LtvCacRatioResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
