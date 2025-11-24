'use client';

import { useState } from 'react';
import EngagementScoreForm from './components/EngagementScoreForm';
import EngagementScoreResults from './components/EngagementScoreResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function EngagementScorePage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Customer Engagement Score Calculator"
      description="Measure overall customer engagement levels across touchpoints to optimize retention strategies."
    >
      {!results ? (
        <EngagementScoreForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <EngagementScoreResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
