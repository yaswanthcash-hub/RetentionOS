'use client';

import { useState } from 'react';
import RoiCalculatorForm from './components/RoiCalculatorForm';
import RoiCalculatorResults from './components/RoiCalculatorResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function ROICalculatorPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="ROI Impact Projector"
      description="Precisely calculate the financial impact of improving your retention rate with month-by-month revenue projections and ROI analysis."
    >
      {!results ? (
        <RoiCalculatorForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <RoiCalculatorResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
