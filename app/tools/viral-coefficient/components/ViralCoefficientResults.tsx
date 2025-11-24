'use client';

import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface ViralCoefficientResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function ViralCoefficientResults({ results, currency, onReset }: ViralCoefficientResultsProps) {
  const { viralCoefficient, invitesPerUser, conversionRate, viralCycleTime, projectedGrowth } = results;

  // Determine virality status
  let viralityStatus = 'Unknown';
  let viralityColor = 'text-gray-600';
  let viralityBg = 'bg-gray-100';

  if (viralCoefficient !== undefined) {
    if (viralCoefficient >= 1.0) {
      viralityStatus = 'Viral Growth';
      viralityColor = 'text-green-600';
      viralityBg = 'bg-green-50';
    } else if (viralCoefficient >= 0.5) {
      viralityStatus = 'Strong Referral';
      viralityColor = 'text-blue-600';
      viralityBg = 'bg-blue-50';
    } else if (viralCoefficient >= 0.2) {
      viralityStatus = 'Average';
      viralityColor = 'text-yellow-600';
      viralityBg = 'bg-yellow-50';
    } else {
      viralityStatus = 'Needs Improvement';
      viralityColor = 'text-red-600';
      viralityBg = 'bg-red-50';
    }
  }

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Viral Coefficient Analysis</h2>
          <p className="text-gray-500 mt-1">Organic growth potential</p>
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
        {/* Viral Coefficient Hero Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">🚀</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Viral Coefficient (K)</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {viralCoefficient !== undefined ? viralCoefficient.toFixed(2) : 'N/A'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {viralCoefficient >= 1.0 ? 'Exponential growth' : 'Linear growth'}
          </p>
        </div>

        {/* Virality Status Card */}
        <div className={`${viralityBg} p-8 rounded-2xl border-2 ${viralityColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">📈</span>
          </div>
          <p className="text-gray-600 font-medium mb-2">Growth Type</p>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl font-bold ${viralityColor}`}>
              {viralityStatus}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {viralCoefficient >= 1.0 ? 'Self-sustaining viral loop' :
              viralCoefficient >= 0.5 ? 'Strong word-of-mouth' :
                viralCoefficient >= 0.2 ? 'Moderate referral activity' :
                  'Optimize invitation flow'}
          </p>
        </div>
      </div>

      {/* Viral Metrics Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6 text-xl">Viral Loop Components</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {invitesPerUser !== undefined && (
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-1">Invites per User</p>
              <p className="text-4xl font-bold text-gray-900">{invitesPerUser.toFixed(1)}</p>
              <p className="text-xs text-gray-600 mt-2">Average invitations sent</p>
            </div>
          )}
          {conversionRate !== undefined && (
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm text-green-800 font-bold mb-1">Conversion Rate</p>
              <p className="text-4xl font-bold text-gray-900">{conversionRate.toFixed(1)}%</p>
              <p className="text-xs text-gray-600 mt-2">Invite acceptance rate</p>
            </div>
          )}
          {viralCycleTime !== undefined && (
            <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-sm text-purple-800 font-bold mb-1">Cycle Time</p>
              <p className="text-4xl font-bold text-gray-900">{viralCycleTime}</p>
              <p className="text-xs text-gray-600 mt-2">Days per viral cycle</p>
            </div>
          )}
        </div>
      </div>

      {/* Growth Projection */}
      {projectedGrowth !== undefined && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
          <h3 className="font-bold text-gray-900 mb-6 text-xl">Growth Projection</h3>
          <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
            <p className="text-sm text-gray-600 font-bold mb-1">Projected Monthly Growth</p>
            <p className="text-5xl font-bold text-gray-900">{projectedGrowth > 0 ? '+' : ''}{projectedGrowth.toFixed(1)}%</p>
            <p className="text-sm text-gray-600 mt-3">Based on current viral coefficient</p>
          </div>
        </div>
      )}

      {/* Industry Benchmarks */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span> Virality Benchmarks
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-green-100 shadow-sm">
            <p className="font-bold text-green-600">Viral Growth (K &gt; 1.0)</p>
            <p className="text-gray-600 text-sm mt-1">Exponential, self-sustaining growth</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-blue-600">Strong Referral (K 0.5-1.0)</p>
            <p className="text-gray-600 text-sm mt-1">Linear growth with strong word-of-mouth</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-yellow-100 shadow-sm">
            <p className="font-bold text-yellow-600">Average (K 0.2-0.5)</p>
            <p className="text-gray-600 text-sm mt-1">Moderate referral activity</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-red-100 shadow-sm">
            <p className="font-bold text-red-600">Poor (K &lt; 0.2)</p>
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
            <h4 className="font-bold text-gray-900 mb-2">Improve Invitation Flow</h4>
            <p className="text-gray-600 text-sm">Make it easier to send more invites</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Optimize Landing Pages</h4>
            <p className="text-gray-600 text-sm">Boost conversion rate of invites</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Double-Sided Rewards</h4>
            <p className="text-gray-600 text-sm">Incentivize both sender and receiver</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Reduce Friction</h4>
            <p className="text-gray-600 text-sm">Simplify the sign-up process</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Target K &gt; 1.0</h4>
            <p className="text-gray-600 text-sm">Achieve self-sustaining growth</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Shorten Cycle Time</h4>
            <p className="text-gray-600 text-sm">Faster cycles = faster growth</p>
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
