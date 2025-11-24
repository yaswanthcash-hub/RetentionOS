'use client';

import { useState } from 'react';
import AovCalculatorForm from './components/AovCalculatorForm';
import AovCalculatorResults from './components/AovCalculatorResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function AovCalculatorPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Average Order Value (AOV) Calculator"
      description="Calculate your Average Order Value and discover the revenue impact of increasing it."
    >
      {!results ? (
        <AovCalculatorForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <AovCalculatorResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
