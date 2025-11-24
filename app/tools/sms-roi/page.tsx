'use client';

import { useState } from 'react';
import SmsRoiForm from './components/SmsRoiForm';
import SmsRoiResults from './components/SmsRoiResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function SmsRoiPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="SMS Marketing ROI Calculator"
      description="Calculate the return on investment for your SMS campaigns. Track delivery, clicks, conversions, and revenue."
    >
      {!results ? (
        <SmsRoiForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <SmsRoiResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
