'use client';

import { useState } from 'react';
import ChannelAttributionForm from './components/ChannelAttributionForm';
import ChannelAttributionResults from './components/ChannelAttributionResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function ChannelAttributionPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Marketing Channel Attribution Calculator"
      description="Analyze ROI across multiple marketing channels to optimize your marketing spend."
    >
      {!results ? (
        <ChannelAttributionForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <ChannelAttributionResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
