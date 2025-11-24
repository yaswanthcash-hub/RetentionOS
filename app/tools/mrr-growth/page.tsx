'use client';

import { useState } from 'react';
import MrrGrowthForm from './components/MrrGrowthForm';
import MrrGrowthResults from './components/MrrGrowthResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function MrrGrowthPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Monthly Recurring Revenue (MRR) Growth Calculator"
      description="Track your SaaS revenue growth, momentum, and key expansion metrics."
    >
      {!results ? (
        <MrrGrowthForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <MrrGrowthResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
