'use client';

import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface AbTestCalculatorResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function AbTestCalculatorResults({ results, currency, onReset }: AbTestCalculatorResultsProps) {
  const { isSignificant, pValue, confidenceLevel, variantAConversion, variantBConversion, improvement, winner } = results;

  // Determine significance status
  let significanceStatus = 'Unknown';
  let significanceColor = 'text-gray-600';
  let significanceBg = 'bg-gray-100';

  if (isSignificant !== undefined) {
    if (isSignificant) {
      significanceStatus = 'Statistically Significant';
      significanceColor = 'text-green-600';
      significanceBg = 'bg-green-50';
    } else {
      significanceStatus = 'Not Significant';
      significanceColor = 'text-yellow-600';
      significanceBg = 'bg-yellow-50';
    }
  }

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">A/B Test Results</h2>
          <p className="text-gray-500 mt-1">Statistical significance analysis</p>
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
            <span className="text-6xl">📊</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Performance Improvement</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {improvement !== undefined ? `${improvement > 0 ? '+' : ''}${improvement.toFixed(1)}%` : 'N/A'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Variant B vs Variant A
          </p>
        </div>

        {/* Significance Status Card */}
        <div className={`${significanceBg} p-8 rounded-2xl border-2 ${significanceColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">✓</span>
          </div>
          <p className="text-gray-600 font-medium mb-2">Test Result</p>
          <div className="flex flex-col gap-2">
            <span className={`text-3xl font-bold ${significanceColor}`}>
              {significanceStatus}
            </span>
            {pValue !== undefined && (
              <span className="text-sm text-gray-600">
                p-value: {pValue.toFixed(4)}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {isSignificant ? 'Safe to implement winner' : 'Continue testing or try new variant'}
          </p>
        </div>
      </div>

      {/* Variant Comparison */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6 text-xl">Variant Performance</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-xl border-2 ${winner === 'A' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-600 font-bold mb-1">Variant A (Control)</p>
                {winner === 'A' && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Winner</span>}
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {variantAConversion !== undefined ? `${variantAConversion.toFixed(2)}%` : 'N/A'}
              </p>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${winner === 'A' ? 'bg-[#D1F25E]' : 'bg-gray-400'}`}
                style={{ width: `${Math.min(variantAConversion || 0, 100)}%` }}
              />
            </div>
          </div>

          <div className={`p-6 rounded-xl border-2 ${winner === 'B' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-600 font-bold mb-1">Variant B (Test)</p>
                {winner === 'B' && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Winner</span>}
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {variantBConversion !== undefined ? `${variantBConversion.toFixed(2)}%` : 'N/A'}
              </p>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${winner === 'B' ? 'bg-[#D1F25E]' : 'bg-gray-400'}`}
                style={{ width: `${Math.min(variantBConversion || 0, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistical Details */}
      {(pValue !== undefined || confidenceLevel !== undefined) && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
          <h3 className="font-bold text-gray-900 mb-6 text-xl">Statistical Analysis</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {pValue !== undefined && (
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800 font-bold mb-1">P-Value</p>
                <p className="text-3xl font-bold text-gray-900">{pValue.toFixed(4)}</p>
                <p className="text-xs text-gray-600 mt-2">{pValue < 0.05 ? 'Significant' : 'Not significant'}</p>
              </div>
            )}
            {confidenceLevel !== undefined && (
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
                <p className="text-sm text-purple-800 font-bold mb-1">Confidence Level</p>
                <p className="text-3xl font-bold text-gray-900">{confidenceLevel}%</p>
                <p className="text-xs text-gray-600 mt-2">Standard: 95%</p>
              </div>
            )}
            {improvement !== undefined && (
              <div className={`p-6 rounded-xl border ${improvement > 0 ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                <p className={`text-sm font-bold mb-1 ${improvement > 0 ? 'text-green-800' : 'text-red-800'}`}>Relative Lift</p>
                <p className="text-3xl font-bold text-gray-900">{improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%</p>
                <p className="text-xs text-gray-600 mt-2">B vs A</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Industry Benchmarks */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span> Testing Best Practices
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Significance Level</p>
            <p className="text-gray-600 text-sm mt-1">95% confidence is standard (p &lt; 0.05)</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Minimum Detectable Effect</p>
            <p className="text-gray-600 text-sm mt-1">Typically 5-10% lift</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Sample Size</p>
            <p className="text-gray-600 text-sm mt-1">Depends on baseline and MDE</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Test Duration</p>
            <p className="text-gray-600 text-sm mt-1">Run for 1-2 full business cycles</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Testing Guidelines
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Avoid Peeking</h4>
            <p className="text-gray-600 text-sm">Don't stop tests early - wait for significance</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">One Variable</h4>
            <p className="text-gray-600 text-sm">Test one change at a time for clear attribution</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Segment Analysis</h4>
            <p className="text-gray-600 text-sm">Look for hidden winners in specific segments</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Document Learnings</h4>
            <p className="text-gray-600 text-sm">Record insights even from failed tests</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Validate Results</h4>
            <p className="text-gray-600 text-sm">Confirm with follow-up tests</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Full Cycles</h4>
            <p className="text-gray-600 text-sm">Account for weekly/monthly patterns</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-12">
        <PremiumButton
          onClick={() => window.print()}
          variant="primary"
          size="lg"
          icon="🖨️"
        >
          Print Report
        </PremiumButton>
      </div>
    </div>
  );
}
