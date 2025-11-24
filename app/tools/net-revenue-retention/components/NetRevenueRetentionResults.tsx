'use client';

import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface NetRevenueRetentionResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function NetRevenueRetentionResults({ results, currency, onReset }: NetRevenueRetentionResultsProps) {
  const { nrr, startingMRR, endingMRR, expansion, contraction, churn } = results;

  // Determine health status
  let healthStatus = 'Unknown';
  let healthColor = 'text-gray-600';
  let healthBg = 'bg-gray-100';

  if (nrr) {
    if (nrr >= 120) {
      healthStatus = 'World Class';
      healthColor = 'text-green-600';
      healthBg = 'bg-green-50';
    } else if (nrr >= 110) {
      healthStatus = 'Excellent';
      healthColor = 'text-blue-600';
      healthBg = 'bg-blue-50';
    } else if (nrr >= 100) {
      healthStatus = 'Good';
      healthColor = 'text-yellow-600';
      healthBg = 'bg-yellow-50';
    } else {
      healthStatus = 'Needs Improvement';
      healthColor = 'text-red-600';
      healthBg = 'bg-red-50';
    }
  }

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">NRR Analysis</h2>
          <p className="text-gray-500 mt-1">Net Revenue Retention Performance</p>
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
        {/* NRR Hero Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">📈</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Net Revenue Retention</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {nrr ? `${nrr.toFixed(0)}%` : 'N/A'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Annual retention rate
          </p>
        </div>

        {/* Health Status Card */}
        <div className={`${healthBg} p-8 rounded-2xl border-2 ${healthColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">⚡</span>
          </div>
          <p className="text-gray-600 font-medium mb-2">Performance Rating</p>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl font-bold ${healthColor}`}>
              {healthStatus}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {nrr >= 120 ? 'Best-in-class SaaS performance' :
              nrr >= 110 ? 'Strong expansion revenue' :
                nrr >= 100 ? 'Healthy retention baseline' :
                  'Focus on reducing churn'}
          </p>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6 text-xl">Revenue Movement</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 font-medium mb-1">Starting MRR</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(startingMRR || 0, currency)}</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 font-medium mb-1">Ending MRR</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(endingMRR || 0, currency)}</p>
          </div>
          {expansion !== undefined && (
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm text-green-800 font-bold mb-1">Expansion Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(expansion, currency)}</p>
            </div>
          )}
          {contraction !== undefined && (
            <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-sm text-orange-800 font-bold mb-1">Contraction</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(contraction, currency)}</p>
            </div>
          )}
          {churn !== undefined && (
            <div className="p-6 bg-red-50 rounded-xl border border-red-100">
              <p className="text-sm text-red-800 font-bold mb-1">Churned Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(churn, currency)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Industry Benchmarks */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span> Industry Benchmarks
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">World Class (120%+)</p>
            <p className="text-gray-600 text-sm mt-1">Best-in-class SaaS companies</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Excellent (110-120%)</p>
            <p className="text-gray-600 text-sm mt-1">Strong expansion revenue</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Good (100-110%)</p>
            <p className="text-gray-600 text-sm mt-1">Healthy retention baseline</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Poor (&lt;100%)</p>
            <p className="text-gray-600 text-sm mt-1">Revenue declining from cohort</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Optimization Strategies
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Target 110%+ NRR</h4>
            <p className="text-gray-600 text-sm">Sustainable SaaS growth requires strong net retention</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Expansion Revenue</h4>
            <p className="text-gray-600 text-sm">Focus on upsells and cross-sells to existing customers</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Reduce Churn</h4>
            <p className="text-gray-600 text-sm">Every point of churn reduction improves NRR floor</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Growth Without Acquisition</h4>
            <p className="text-gray-600 text-sm">NRR &gt; 100% means you can grow without new customers</p>
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
