'use client';

import { useState } from 'react';
import ChurnRateForm from './components/ChurnRateForm';
import ChurnRateResults from './components/ChurnRateResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function ChurnRatePage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Churn Rate Calculator"
      description="Measure customer attrition to understand retention health. Calculate your churn rate, identify at-risk revenue, and get actionable insights to improve customer longevity."
    >
      {!results ? (
        <ChurnRateForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <ChurnRateResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
