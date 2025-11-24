'use client';

import { formatCurrency } from '@/components/CurrencySelector';

interface WinbackCalculatorResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

// Note: Division operations should check for zero divisors
export default function WinbackCalculatorResults({ results, currency, onReset }: WinbackCalculatorResultsProps) {
  const exportToCSV = () => {
    const csvContent = [
      ['Win-Back Campaign Calculator Report'],
      [''],
      ['Results'],
      ...Object.entries(results).map(([key, value]) => [key, String(value)]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `winback-campaign-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Your Results</h2>
            <p className="text-gray-600">Win-Back Campaign Calculator</p>
          </div>
          <button type="button" onClick={onReset} className="btn btn-secondary">
            ← Start Over
          </button>
        </div>

        {/* Display results */}
        <div className="space-y-6">
          {Object.entries(results).map(([key, value]) => (
            <div key={key} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">{key.replace(/_/g, ' ')}</p>
              <p className="text-2xl font-bold">
                {typeof value === 'number' ? value.toFixed(2) : String(value)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <button type="button" onClick={exportToCSV} className="btn btn-secondary flex-1">
            📊 Export CSV
          </button>
          <button type="button" onClick={() => window.print()} className="btn btn-secondary flex-1">
            🖨️ Print
          </button>
        </div>
      </div>

      {/* Benchmarks */}

      <div className="card bg-blue-50 mb-8">
        <h3 className="text-2xl font-bold mb-4">📊 Industry Benchmarks</h3>
        <div className="space-y-3">

          <div className="p-4 bg-white rounded-lg">
            <p className="font-bold">Excellent</p>
            <p className="text-gray-600">&gt; 25% Reactivation Rate</p>
          </div>

          <div className="p-4 bg-white rounded-lg">
            <p className="font-bold">Good</p>
            <p className="text-gray-600">15-25% Reactivation Rate</p>
          </div>

          <div className="p-4 bg-white rounded-lg">
            <p className="font-bold">Average</p>
            <p className="text-gray-600">10-15% Reactivation Rate</p>
          </div>

          <div className="p-4 bg-white rounded-lg">
            <p className="font-bold">Poor</p>
            <p className="text-gray-600">&lt; 10% Reactivation Rate</p>
          </div>

        </div>
      </div>


      {/* Recommendations */}

      <div className="card bg-yellow-50">
        <h3 className="text-2xl font-bold mb-4">💡 Recommendations</h3>
        <div className="space-y-3">

          <div className="p-4 bg-white rounded-lg">
            <p className="text-gray-700">Segment lapsed customers by value (high LTV first)</p>
          </div>

          <div className="p-4 bg-white rounded-lg">
            <p className="text-gray-700">Personalize offers based on past purchase history</p>
          </div>

          <div className="p-4 bg-white rounded-lg">
            <p className="text-gray-700">Use multi-channel approach (Email + SMS + Retargeting)</p>
          </div>

          <div className="p-4 bg-white rounded-lg">
            <p className="text-gray-700">Test different incentives (discount vs. credit vs. gift)</p>
          </div>

          <div className="p-4 bg-white rounded-lg">
            <p className="text-gray-700">Act quickly - win-back is harder as time passes</p>
          </div>

        </div>
      </div>

    </div>
  );
}
