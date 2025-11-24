'use client';

import { useState } from 'react';
import NpsCalculatorForm from './components/NpsCalculatorForm';
import NpsCalculatorResults from './components/NpsCalculatorResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function NpsCalculatorPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Net Promoter Score (NPS) Calculator"
      description="Measure customer loyalty and satisfaction with the industry-standard NPS metric. Understand your balance of Promoters, Passives, and Detractors."
    >
      {!results ? (
        <NpsCalculatorForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <NpsCalculatorResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
