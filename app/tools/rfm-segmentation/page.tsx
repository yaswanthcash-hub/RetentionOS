'use client';

import { useState } from 'react';
import RfmSegmentationForm from './components/RfmSegmentationForm';
import RfmSegmentationResults from './components/RfmSegmentationResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function RfmSegmentationPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="RFM Segmentation Calculator"
      description="Score and segment your customers based on Recency, Frequency, and Monetary value to tailor your marketing strategies."
    >
      {!results ? (
        <RfmSegmentationForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <RfmSegmentationResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
