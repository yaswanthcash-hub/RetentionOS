'use client';

import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface ConversionOptimizationResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function ConversionOptimizationResults({ results, currency, onReset }: ConversionOptimizationResultsProps) {
  const { currentRate, optimizedRate, improvement, additionalRevenue, additionalConversions } = results;

  // Determine improvement status
  let improvementStatus = 'Unknown';
  let improvementColor = 'text-gray-600';
  let improvementBg = 'bg-gray-100';

  if (improvement) {
    if (improvement >= 50) {
      improvementStatus = 'Excellent';
      improvementColor = 'text-green-600';
      improvementBg = 'bg-green-50';
    } else if (improvement >= 25) {
      improvementStatus = 'Good';
      improvementColor = 'text-blue-600';
      improvementBg = 'bg-blue-50';
    } else if (improvement >= 10) {
      improvementStatus = 'Moderate';
      improvementColor = 'text-yellow-600';
      improvementBg = 'bg-yellow-50';
    } else {
      improvementStatus = 'Minimal';
      improvementColor = 'text-orange-600';
      improvementBg = 'bg-orange-50';
    }
  }

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Conversion Optimization Analysis</h2>
          <p className="text-gray-500 mt-1">Potential revenue impact</p>
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
        {/* Improvement Hero Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">🚀</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Conversion Rate Improvement</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {improvement ? `+${improvement.toFixed(1)}%` : 'N/A'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Potential uplift
          </p>
        </div>

        {/* Impact Status Card */}
        <div className={`${improvementBg} p-8 rounded-2xl border-2 ${improvementColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">⚡</span>
          </div>
          <p className="text-gray-600 font-medium mb-2">Impact Level</p>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl font-bold ${improvementColor}`}>
              {improvementStatus}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {improvement >= 50 ? 'Transformative opportunity' :
              improvement >= 25 ? 'Significant potential' :
                improvement >= 10 ? 'Worthwhile optimization' :
                  'Incremental gains'}
          </p>
        </div>
      </div>

      {/* Conversion Rate Comparison */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6 text-xl">Conversion Rate Analysis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-red-50 rounded-xl border border-red-100">
            <p className="text-sm text-red-800 font-bold mb-1">Current Rate</p>
            <p className="text-4xl font-bold text-gray-900">{currentRate ? `${currentRate.toFixed(2)}%` : 'N/A'}</p>
            <div className="mt-3 w-full bg-red-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-red-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(currentRate || 0, 100)}%` }}
              />
            </div>
          </div>
          <div className="p-6 bg-green-50 rounded-xl border border-green-100">
            <p className="text-sm text-green-800 font-bold mb-1">Optimized Rate</p>
            <p className="text-4xl font-bold text-gray-900">{optimizedRate ? `${optimizedRate.toFixed(2)}%` : 'N/A'}</p>
            <div className="mt-3 w-full bg-green-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#D1F25E] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(optimizedRate || 0, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Impact */}
      {(additionalRevenue !== undefined || additionalConversions !== undefined) && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
          <h3 className="font-bold text-gray-900 mb-6 text-xl">Revenue Impact</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalRevenue !== undefined && (
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800 font-bold mb-1">Additional Revenue</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(additionalRevenue, currency)}</p>
                <p className="text-xs text-gray-600 mt-2">From optimization</p>
              </div>
            )}
            {additionalConversions !== undefined && (
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
                <p className="text-sm text-purple-800 font-bold mb-1">Additional Conversions</p>
                <p className="text-3xl font-bold text-gray-900">{additionalConversions}</p>
                <p className="text-xs text-gray-600 mt-2">Extra customers</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Industry Benchmarks */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span> Industry Benchmarks
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">E-commerce Average</p>
            <p className="text-gray-600 text-sm mt-1">2-3% conversion rate</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">SaaS Average</p>
            <p className="text-gray-600 text-sm mt-1">3-5% visitor to trial</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">B2B Lead Gen</p>
            <p className="text-gray-600 text-sm mt-1">2-5% form completion</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Top Performers</p>
            <p className="text-gray-600 text-sm mt-1">10%+ conversion rates</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Optimization Tactics
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Simplify Forms</h4>
            <p className="text-gray-600 text-sm">Remove unnecessary fields, use autofill</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Clear CTAs</h4>
            <p className="text-gray-600 text-sm">Make action buttons prominent and compelling</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Social Proof</h4>
            <p className="text-gray-600 text-sm">Add testimonials, reviews, and trust badges</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Page Speed</h4>
            <p className="text-gray-600 text-sm">1 second delay = 7% conversion loss</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Mobile Optimization</h4>
            <p className="text-gray-600 text-sm">Ensure seamless mobile experience</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">A/B Testing</h4>
            <p className="text-gray-600 text-sm">Continuously test and iterate</p>
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
