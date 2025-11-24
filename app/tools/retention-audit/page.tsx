'use client';

import { useState } from 'react';
import AuditForm from './components/AuditForm';
import ResultsDashboard from './components/ResultsDashboard';
import type { AuditResults } from '@/types/audit';

export default function RetentionAuditPage() {
  const [results, setResults] = useState<AuditResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleComplete = (results: AuditResults) => {
    setIsProcessing(true);

    setTimeout(() => {
      setResults(results); // No type cast needed now
      setShowResults(true);
      setIsProcessing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const handleStartOver = () => {
    setResults(null);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 px-4">
      {!showResults ? (
        <>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: 'rgba(209, 242, 94, 0.2)', color: '#BFE043' }}>
              🔥 FREE RETENTION AUDIT • 5 MINUTES
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Retention Health
              <span className="block" style={{ color: '#D1F25E' }}>
                Audit
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get a comprehensive analysis of your retention strategy.
              Discover opportunities and receive actionable recommendations.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold mb-2">Quick Assessment</h3>
                <p className="text-gray-600 text-sm">
                  5-minute audit with instant results
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold mb-2">Revenue Impact</h3>
                <p className="text-gray-600 text-sm">
                  Calculate your retention opportunity
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="font-bold mb-2">Action Plan</h3>
                <p className="text-gray-600 text-sm">
                  Get personalized recommendations
                </p>
              </div>
            </div>
          </div>

          <AuditForm onComplete={handleComplete} />
        </>
      ) : results ? (
        <>
          <div className="max-w-7xl mx-auto mb-8">
            <button
              onClick={handleStartOver}
              className="btn btn-secondary mb-6"
            >
              ← Start New Audit
            </button>
          </div>
          <ResultsDashboard results={results} />
        </>
      ) : null}
    </div>
  );
}
