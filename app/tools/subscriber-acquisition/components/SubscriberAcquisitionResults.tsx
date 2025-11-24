'use client';

import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface SubscriberAcquisitionResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function SubscriberAcquisitionResults({ results, currency, onReset }: SubscriberAcquisitionResultsProps) {
  const { sac, totalCost, newSubscribers, costPerChannel } = results;

  // Determine health status
  let healthStatus = 'Unknown';
  let healthColor = 'text-gray-600';
  let healthBg = 'bg-gray-100';

  if (sac) {
    if (sac < 10) {
      healthStatus = 'Excellent';
      healthColor = 'text-green-600';
      healthBg = 'bg-green-50';
    } else if (sac < 25) {
      healthStatus = 'Good';
      healthColor = 'text-blue-600';
      healthBg = 'bg-blue-50';
    } else if (sac < 50) {
      healthStatus = 'Average';
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
          <h2 className="text-3xl font-bold text-gray-900">Subscriber Acquisition Analysis</h2>
          <p className="text-gray-500 mt-1">Cost per new subscriber</p>
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
        {/* SAC Hero Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">📊</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Subscriber Acquisition Cost</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {formatCurrency(sac || 0, currency)}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Per subscriber
          </p>
        </div>

        {/* Health Status Card */}
        <div className={`${healthBg} p-8 rounded-2xl border-2 ${healthColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">⚡</span>
          </div>
          <p className="text-gray-600 font-medium mb-2">Efficiency Rating</p>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl font-bold ${healthColor}`}>
              {healthStatus}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {sac < 10 ? 'Outstanding acquisition efficiency' :
              sac < 25 ? 'Solid performance' :
                sac < 50 ? 'Room for optimization' :
                  'Focus on cost reduction'}
          </p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6 text-xl">Acquisition Metrics</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-red-50 rounded-xl border border-red-100">
            <p className="text-sm text-red-800 font-bold mb-1">Total Cost</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalCost || 0, currency)}</p>
          </div>
          <div className="p-6 bg-green-50 rounded-xl border border-green-100">
            <p className="text-sm text-green-800 font-bold mb-1">New Subscribers</p>
            <p className="text-3xl font-bold text-gray-900">{newSubscribers || 0}</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 font-bold mb-1">Cost Per Subscriber</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(sac || 0, currency)}</p>
          </div>
        </div>
      </div>

      {/* Industry Benchmarks */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span> Industry Benchmarks
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Excellent (&lt;$10)</p>
            <p className="text-gray-600 text-sm mt-1">Top-tier acquisition efficiency</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Good ($10-$25)</p>
            <p className="text-gray-600 text-sm mt-1">Above average performance</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Average ($25-$50)</p>
            <p className="text-gray-600 text-sm mt-1">Industry standard range</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Poor (&gt;$50)</p>
            <p className="text-gray-600 text-sm mt-1">Optimization needed</p>
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
            <h4 className="font-bold text-gray-900 mb-2">Channel Optimization</h4>
            <p className="text-gray-600 text-sm">Focus spend on high-performing channels</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Landing Page CRO</h4>
            <p className="text-gray-600 text-sm">Improve conversion rates to lower SAC</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Organic Growth</h4>
            <p className="text-gray-600 text-sm">Leverage SEO and content marketing</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Referral Programs</h4>
            <p className="text-gray-600 text-sm">Acquire subscribers at lower cost</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Quality Over Quantity</h4>
            <p className="text-gray-600 text-sm">High retention subscribers are worth more</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">A/B Testing</h4>
            <p className="text-gray-600 text-sm">Continuously test and optimize campaigns</p>
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
