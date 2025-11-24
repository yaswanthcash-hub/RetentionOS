'use client';

import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface MrrGrowthResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function MrrGrowthResults({ results, currency, onReset }: MrrGrowthResultsProps) {
  const { growthRate, startingMRR, endingMRR, newMRR, expansionMRR, contractionMRR, churnedMRR } = results;

  // Determine growth health
  let growthStatus = 'Unknown';
  let growthColor = 'text-gray-600';
  let growthBg = 'bg-gray-100';

  if (growthRate) {
    if (growthRate >= 15) {
      growthStatus = 'Hypergrowth';
      growthColor = 'text-green-600';
      growthBg = 'bg-green-50';
    } else if (growthRate >= 10) {
      growthStatus = 'Strong Growth';
      growthColor = 'text-blue-600';
      growthBg = 'bg-blue-50';
    } else if (growthRate >= 5) {
      growthStatus = 'Steady Growth';
      growthColor = 'text-yellow-600';
      growthBg = 'bg-yellow-50';
    } else if (growthRate > 0) {
      growthStatus = 'Slow Growth';
      growthColor = 'text-orange-600';
      growthBg = 'bg-orange-50';
    } else {
      growthStatus = 'Declining';
      growthColor = 'text-red-600';
      growthBg = 'bg-red-50';
    }
  }

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">MRR Growth Analysis</h2>
          <p className="text-gray-500 mt-1">Monthly Recurring Revenue Performance</p>
        </div>
        <PremiumButton
          onClick={onReset}
          variant="outline"
          size="md"
          icon="←"
        >
          Calculate Again
        </PremiumButton>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Growth Rate Hero Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">📈</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">MRR Growth Rate</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {growthRate ? `${growthRate > 0 ? '+' : ''}${growthRate.toFixed(1)}%` : 'N/A'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Month-over-month
          </p>
        </div>

        {/* Growth Status Card */}
        <div className={`${growthBg} p-8 rounded-2xl border-2 ${growthColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">🚀</span>
          </div>
          <p className="text-gray-600 font-medium mb-2">Growth Stage</p>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl font-bold ${growthColor}`}>
              {growthStatus}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {growthRate >= 15 ? 'Exceptional growth trajectory' :
              growthRate >= 10 ? 'Healthy expansion' :
                growthRate >= 5 ? 'Moderate progress' :
                  growthRate > 0 ? 'Room for acceleration' :
                    'Urgent attention needed'}
          </p>
        </div>
      </div>

      {/* MRR Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6 text-xl">MRR Movement</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 font-medium mb-1">Starting MRR</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(startingMRR || 0, currency)}</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 font-medium mb-1">Ending MRR</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(endingMRR || 0, currency)}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {newMRR !== undefined && (
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm text-green-800 font-bold mb-1">New MRR</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(newMRR, currency)}</p>
            </div>
          )}
          {expansionMRR !== undefined && (
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-1">Expansion MRR</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(expansionMRR, currency)}</p>
            </div>
          )}
          {contractionMRR !== undefined && (
            <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-sm text-orange-800 font-bold mb-1">Contraction MRR</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(contractionMRR, currency)}</p>
            </div>
          )}
          {churnedMRR !== undefined && (
            <div className="p-6 bg-red-50 rounded-xl border border-red-100">
              <p className="text-sm text-red-800 font-bold mb-1">Churned MRR</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(churnedMRR, currency)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Industry Benchmarks */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span> Growth Stage Benchmarks
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Early Stage</p>
            <p className="text-gray-600 text-sm mt-1">100-200% YoY growth</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Growth Stage</p>
            <p className="text-gray-600 text-sm mt-1">50-100% YoY growth</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Mature Stage</p>
            <p className="text-gray-600 text-sm mt-1">20-50% YoY growth</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Public Company</p>
            <p className="text-gray-600 text-sm mt-1">10-20% YoY growth</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Growth Strategies
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Focus on NRR</h4>
            <p className="text-gray-600 text-sm">Net Revenue Retention drives sustainable growth</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Reduce Churn</h4>
            <p className="text-gray-600 text-sm">Stop the leaky bucket first</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Expansion Revenue</h4>
            <p className="text-gray-600 text-sm">Upsells and cross-sells to existing customers</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Optimize Pricing</h4>
            <p className="text-gray-600 text-sm">Review and adjust pricing tiers</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Sales & Marketing Alignment</h4>
            <p className="text-gray-600 text-sm">Better lead quality drives growth</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Product-Led Growth</h4>
            <p className="text-gray-600 text-sm">Let the product drive acquisition</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-12">
        <button
          onClick={() => window.print()}
          className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
        >
          🖨️ Print Report
        </button>
      </div>
    </div>
  );
}
