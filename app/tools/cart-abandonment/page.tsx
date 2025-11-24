'use client';

import { useState } from 'react';
import CartAbandonmentForm from './components/CartAbandonmentForm';
import CartAbandonmentResults from './components/CartAbandonmentResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function CartAbandonmentPage() {
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');

  const handleReset = () => setResults(null);

  return (
    <ToolLayout
      title="Cart Abandonment Calculator"
      description="Measure lost revenue from abandoned carts and calculate the potential value of recovery strategies."
    >
      {!results ? (
        <CartAbandonmentForm
          onSubmit={setResults}
          currency={currency}
          language={language}
        />
      ) : (
        <CartAbandonmentResults
          results={results}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </ToolLayout>
  );
}
