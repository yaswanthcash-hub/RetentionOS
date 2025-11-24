'use client';

import { useState } from 'react';
import SubscriberAcquisitionForm from './components/SubscriberAcquisitionForm';
import SubscriberAcquisitionResults from './components/SubscriberAcquisitionResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function SubscriberAcquisitionPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Subscriber Acquisition Cost Calculator"
      description="Calculate the cost to acquire email and SMS subscribers for your marketing campaigns."
    >
      {!results ? (
        <SubscriberAcquisitionForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <SubscriberAcquisitionResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
