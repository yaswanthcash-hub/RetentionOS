'use client';

import { useState } from 'react';
import ReferralProgramForm from './components/ReferralProgramForm';
import ReferralProgramResults from './components/ReferralProgramResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function ReferralProgramPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Referral Program ROI Calculator"
      description="Calculate the effectiveness and ROI of your customer referral programs."
    >
      {!results ? (
        <ReferralProgramForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <ReferralProgramResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
