'use client';

import { useState } from 'react';
import ContentRoiForm from './components/ContentRoiForm';
import ContentRoiResults from './components/ContentRoiResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function ContentRoiPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Content Marketing ROI Calculator"
      description="Measure the true returns from your content marketing investments. Track traffic, conversions, and long-term value."
    >
      {!results ? (
        <ContentRoiForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <ContentRoiResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
