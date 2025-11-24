'use client';

import { useState } from 'react';
import CohortAnalysisForm from './components/CohortAnalysisForm';
import CohortAnalysisResults from './components/CohortAnalysisResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function CohortAnalysisPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Cohort Retention Analysis Calculator"
      description="Track and visualize how different groups of customers retain over time to identify long-term trends."
    >
      {!results ? (
        <CohortAnalysisForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <CohortAnalysisResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
