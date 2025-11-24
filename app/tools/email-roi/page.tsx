'use client';

import { useState } from 'react';
import EmailRoiForm from './components/EmailRoiForm';
import EmailRoiResults from './components/EmailRoiResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function EmailRoiPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Email Marketing ROI Calculator"
      description="Calculate the return on investment for your email campaigns. Track opens, clicks, conversions, and total revenue generated."
    >
      {!results ? (
        <EmailRoiForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <EmailRoiResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
