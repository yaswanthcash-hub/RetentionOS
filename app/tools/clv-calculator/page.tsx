'use client';

import { useState } from 'react';
import ClvCalculatorForm from './components/ClvCalculatorForm';
import ClvCalculatorResults from './components/ClvCalculatorResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function ClvCalculatorPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Customer Lifetime Value (CLV) Calculator"
      description="Calculate the total revenue a customer will generate throughout their relationship with your business. Use this metric to determine how much you can afford to spend on acquisition."
    >
      {!results ? (
        <ClvCalculatorForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <ClvCalculatorResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
