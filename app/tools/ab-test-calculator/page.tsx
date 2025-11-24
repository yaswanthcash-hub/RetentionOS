'use client';

import { useState } from 'react';
import AbTestCalculatorForm from './components/AbTestCalculatorForm';
import AbTestCalculatorResults from './components/AbTestCalculatorResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function AbTestCalculatorPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="A/B Test Significance Calculator"
      description="Calculate statistical significance of your A/B tests to make data-driven decisions."
    >
      {!results ? (
        <AbTestCalculatorForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <AbTestCalculatorResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
