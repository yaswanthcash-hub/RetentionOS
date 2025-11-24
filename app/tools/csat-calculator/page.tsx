'use client';

import { useState } from 'react';
import CsatCalculatorForm from './components/CsatCalculatorForm';
import CsatCalculatorResults from './components/CsatCalculatorResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function CsatCalculatorPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Customer Satisfaction Score (CSAT) Calculator"
      description="Measure customer satisfaction with your products and services to identify areas for improvement."
    >
      {!results ? (
        <CsatCalculatorForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <CsatCalculatorResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
