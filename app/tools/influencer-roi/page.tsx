'use client';

import { useState } from 'react';
import InfluencerRoiForm from './components/InfluencerRoiForm';
import InfluencerRoiResults from './components/InfluencerRoiResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function InfluencerRoiPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Influencer Marketing ROI Calculator"
      description="Calculate the return on investment for your influencer partnerships. Track engagement, conversions, and revenue."
    >
      {!results ? (
        <InfluencerRoiForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <InfluencerRoiResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
