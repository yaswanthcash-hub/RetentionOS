'use client';

import { useState } from 'react';
import InventoryTurnoverForm from './components/InventoryTurnoverForm';
import InventoryTurnoverResults from './components/InventoryTurnoverResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function InventoryTurnoverPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Inventory Turnover Calculator"
      description="Measure inventory efficiency and stock management to optimize your supply chain."
    >
      {!results ? (
        <InventoryTurnoverForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <InventoryTurnoverResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
