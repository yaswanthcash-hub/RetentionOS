'use client';

import { useState } from 'react';
import CustomerLifespanForm from './components/CustomerLifespanForm';
import CustomerLifespanResults from './components/CustomerLifespanResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function CustomerLifespanPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Customer Lifespan Calculator"
      description="Calculate the average duration of your customer relationships to better understand long-term value."
    >
      {!results ? (
        <CustomerLifespanForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <CustomerLifespanResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
