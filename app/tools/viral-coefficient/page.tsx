'use client';

import { useState } from 'react';
import ViralCoefficientForm from './components/ViralCoefficientForm';
import ViralCoefficientResults from './components/ViralCoefficientResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function ViralCoefficientPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Viral Coefficient Calculator"
      description="Measure the viral growth potential of your product and optimize referral mechanics."
    >
      {!results ? (
        <ViralCoefficientForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <ViralCoefficientResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
