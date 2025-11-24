'use client';

import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface ReferralProgramResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function ReferralProgramResults({ results, currency, onReset }: ReferralProgramResultsProps) {
  const { roi, totalRevenue, totalCost, referralRate, referrals, conversions, conversionRate } = results;

  // Determine ROI health
  let roiStatus = 'Unknown';
  let roiColor = 'text-gray-600';
  let roiBg = 'bg-gray-100';

  if (roi) {
    if (roi >= 300) {
      roiStatus = 'Excellent';
      roiColor = 'text-green-600';
      roiBg = 'bg-green-50';
    } else if (roi >= 200) {
      roiStatus = 'Good';
      roiColor = 'text-blue-600';
      roiBg = 'bg-blue-50';
    } else if (roi >= 100) {
      roiStatus = 'Profitable';
      roiColor = 'text-yellow-600';
      roiBg = 'bg-yellow-50';
    } else {
      roiStatus = 'Needs Optimization';
      roiColor = 'text-red-600';
      roiBg = 'bg-red-50';
    }
  }

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Referral Program ROI</h2>
          <p className="text-gray-500 mt-1">Performance Analysis</p>
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
        {/* ROI Hero Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">🎯</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Return on Investment</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {roi ? `${roi.toFixed(0)}%` : 'N/A'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Program effectiveness
          </p>
        </div>

        {/* Status Card */}
        <div className={`${roiBg} p-8 rounded-2xl border-2 ${roiColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">⭐</span>
          </div>
          <p className="text-gray-600 font-medium mb-2">Program Health</p>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl font-bold ${roiColor}`}>
              {roiStatus}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {roi >= 300 ? 'Outstanding referral performance' :
              roi >= 200 ? 'Strong program ROI' :
                roi >= 100 ? 'Profitable but can improve' :
                  'Review incentive structure'}
          </p>
        </div>
      </div>

      {/* Financial Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6 text-xl">Financial Performance</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-green-50 rounded-xl border border-green-100">
            <p className="text-sm text-green-800 font-bold mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue || 0, currency)}</p>
          </div>
          <div className="p-6 bg-red-50 rounded-xl border border-red-100">
            <p className="text-sm text-red-800 font-bold mb-1">Total Cost</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalCost || 0, currency)}</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 font-bold mb-1">Net Profit</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency((totalRevenue || 0) - (totalCost || 0), currency)}</p>
          </div>
        </div>
      </div>

      {/* Referral Metrics */}
      {(referrals !== undefined || conversions !== undefined) && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
          <h3 className="font-bold text-gray-900 mb-6 text-xl">Referral Metrics</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 font-medium mb-1">Total Referrals</p>
              <p className="text-3xl font-bold text-gray-900">{referrals || 0}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 font-medium mb-1">Conversions</p>
              <p className="text-3xl font-bold text-gray-900">{conversions || 0}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 font-medium mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900">{conversionRate ? `${conversionRate.toFixed(1)}%` : 'N/A'}</p>
            </div>
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
            <p className="font-bold text-gray-900">Referral Rate</p>
            <p className="text-gray-600 text-sm mt-1">2.3% global average</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Conversion Rate</p>
            <p className="text-gray-600 text-sm mt-1">10-15% for referrals</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">LTV Increase</p>
            <p className="text-gray-600 text-sm mt-1">16% higher for referred customers</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Churn Reduction</p>
            <p className="text-gray-600 text-sm mt-1">18% lower for referred customers</p>
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
            <h4 className="font-bold text-gray-900 mb-2">Double-Sided Rewards</h4>
            <p className="text-gray-600 text-sm">Incentivize both referrer and referee</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Perfect Timing</h4>
            <p className="text-gray-600 text-sm">Promote at high-satisfaction moments</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Easy Sharing</h4>
            <p className="text-gray-600 text-sm">Pre-filled messages and one-click sharing</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Track Sources</h4>
            <p className="text-gray-600 text-sm">Identify and reward top advocates</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Gamification</h4>
            <p className="text-gray-600 text-sm">Tiered rewards for multiple referrals</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Social Proof</h4>
            <p className="text-gray-600 text-sm">Showcase success stories from referrals</p>
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
