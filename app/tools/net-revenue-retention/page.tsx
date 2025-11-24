'use client';

import { useState } from 'react';
import NetRevenueRetentionForm from './components/NetRevenueRetentionForm';
import NetRevenueRetentionResults from './components/NetRevenueRetentionResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function NetRevenueRetentionPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Net Revenue Retention (NRR) Calculator"
      description="Measure revenue retention and expansion from your existing customer base."
    >
      {!results ? (
        <NetRevenueRetentionForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <NetRevenueRetentionResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
