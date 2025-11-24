'use client';

import { useState } from 'react';
import SegmentProfitabilityForm from './components/SegmentProfitabilityForm';
import SegmentProfitabilityResults from './components/SegmentProfitabilityResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function SegmentProfitabilityPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Customer Segment Profitability Calculator"
      description="Analyze the profitability of different customer segments to optimize your marketing spend and resource allocation."
    >
      {!results ? (
        <SegmentProfitabilityForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <SegmentProfitabilityResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
