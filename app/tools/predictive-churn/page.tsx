'use client';

import { useState } from 'react';
import PredictiveChurnForm from './components/PredictiveChurnForm';
import PredictiveChurnResults from './components/PredictiveChurnResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function PredictiveChurnPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Predictive Churn Score Calculator"
      description="Predict customer churn risk based on behavior patterns to enable proactive retention."
    >
      {!results ? (
        <PredictiveChurnForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <PredictiveChurnResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
