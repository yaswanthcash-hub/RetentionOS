'use client';

import { useState } from 'react';
import CustomerHealthScoreForm from './components/CustomerHealthScoreForm';
import CustomerHealthScoreResults from './components/CustomerHealthScoreResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function CustomerHealthScorePage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Customer Health Score Calculator"
      description="Assess the vitality of your customer relationships. Identify at-risk accounts and opportunities for expansion."
    >
      {!results ? (
        <CustomerHealthScoreForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <CustomerHealthScoreResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
