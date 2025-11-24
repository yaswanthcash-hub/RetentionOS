'use client';

import { useState } from 'react';
import ConversionOptimizationForm from './components/ConversionOptimizationForm';
import ConversionOptimizationResults from './components/ConversionOptimizationResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function ConversionOptimizationPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Conversion Rate Optimization Calculator"
      description="Analyze your conversion funnel and identify optimization opportunities to boost revenue."
    >
      {!results ? (
        <ConversionOptimizationForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <ConversionOptimizationResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
