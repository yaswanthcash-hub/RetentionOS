'use client';

import { useState } from 'react';
import CesCalculatorForm from './components/CesCalculatorForm';
import CesCalculatorResults from './components/CesCalculatorResults';
import ToolLayout from '@/components/tools/ToolLayout';

export default function CesCalculatorPage() {
    const [results, setResults] = useState(null);
    const [currency, setCurrency] = useState('INR');
    const [language, setLanguage] = useState('en');

    const handleReset = () => setResults(null);

    return (
        <ToolLayout
            title="Customer Effort Score (CES) Calculator"
            description="Measure how easy it is for customers to interact with your business and complete tasks."
        >
            {!results ? (
                <CesCalculatorForm
                    onSubmit={setResults}
                    currency={currency}
                    language={language}
                />
            ) : (
                <CesCalculatorResults
                    results={results}
                    currency={currency}
                    onReset={handleReset}
                />
            )}
        </ToolLayout>
    );
}
