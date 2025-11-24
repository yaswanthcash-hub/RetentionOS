'use client';

import { useState } from 'react';
import KFactorForm from './components/KFactorForm';
import KFactorResults from './components/KFactorResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function KFactorPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="K-Factor Calculator"
      description="Calculate the viral growth metric for user acquisition and product virality."
    >
      {!results ? (
        <KFactorForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <KFactorResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
