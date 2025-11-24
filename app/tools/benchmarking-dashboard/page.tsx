'use client';

import { useState } from 'react';
import BenchmarkingForm from './components/BenchmarkingForm';
import BenchmarkingResults from './components/BenchmarkingResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function BenchmarkingDashboardPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Industry Benchmarking Dashboard"
      description="Compare your metrics against Indian and global industry standards to identify opportunities."
    >
      {!results ? (
        <BenchmarkingForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <BenchmarkingResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
