'use client';
import ToolLayout from '@/components/tools/ToolLayout';

import { formatCurrency } from '@/components/CurrencySelector';

interface EngagementScoreResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

// Note: Division operations should check for zero divisors
export default function EngagementScoreResults({ results, currency, onReset }: EngagementScoreResultsProps) {
  const exportToCSV = () => {
    const csvContent = [
      ['Customer Engagement Score Calculator Report'],
      [''],
      ['Results'],
      ...Object.entries(results).map(([key, value]) => [key, String(value)]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `engagement-score-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <ToolLayout title="Customer Engagement Score" description="Analyze customer engagement levels and receive actionable insights.">
      <div className="max-w-4xl mx-auto">
        <div className="card mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Results</h2>
              <p className="text-gray-600">Customer Engagement Score Calculator</p>
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

        <div className="card card-premium bg-blue-50 mb-8">
          <h3 className="text-2xl font-bold mb-4">📊 Industry Benchmarks</h3>
          <div className="space-y-3">

            <div className="p-4 bg-white rounded-lg">
              <p className="font-bold">Highly Engaged</p>
              <p className="text-gray-600">80-100 score</p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <p className="font-bold">Engaged</p>
              <p className="text-gray-600">60-79 score</p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <p className="font-bold">Moderate</p>
              <p className="text-gray-600">40-59 score</p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <p className="font-bold">At Risk</p>
              <p className="text-gray-600">&lt;40 score</p>
            </div>

          </div>
        </div>


        {/* Recommendations */}

        <div className="card card-premium bg-yellow-50">
          <h3 className="text-2xl font-bold mb-4">💡 Recommendations</h3>
          <div className="space-y-3">

            <div className="p-4 bg-white rounded-lg">
              <p className="text-gray-700">Score customers weekly to identify at-risk accounts</p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <p className="text-gray-700">Highly engaged customers have 90% lower churn</p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <p className="text-gray-700">Target low-engagement customers with win-back campaigns</p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <p className="text-gray-700">Purchases are the strongest engagement indicator</p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <p className="text-gray-700">Too many support tickets can indicate friction</p>
            </div>

          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
