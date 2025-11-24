'use client';

import { useState } from 'react';
import RetentionCurveForm from './components/RetentionCurveForm';
import RetentionCurveResults from './components/RetentionCurveResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function RetentionCurvePage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Retention Curve Calculator"
      description="Visualize your customer retention decay over time to identify drop-off points and product-market fit."
    >
      {!results ? (
        <RetentionCurveForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <RetentionCurveResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
