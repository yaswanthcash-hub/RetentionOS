'use client';
import ToolLayout from '@/components/tools/ToolLayout';

import { useState } from 'react';
import WinbackCalculatorForm from './components/WinbackCalculatorForm';
import WinbackCalculatorResults from './components/WinbackCalculatorResults';


export default function WinbackCalculatorPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Win-Back Campaign ROI Calculator"
      description="Calculate the effectiveness and ROI of your customer win-back campaigns."
    >
      {!results ? (
        <WinbackCalculatorForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <WinbackCalculatorResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
