'use client';

import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface ChannelAttributionResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function ChannelAttributionResults({ results, currency, onReset }: ChannelAttributionResultsProps) {
  const { channels, totalRevenue, totalCost, overallROI, bestChannel, worstChannel } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Channel Attribution Analysis</h2>
          <p className="text-gray-500 mt-1">Multi-channel performance breakdown</p>
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
        {/* Overall ROI Hero Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">📈</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Overall Marketing ROI</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {overallROI ? `${overallROI.toFixed(0)}%` : 'N/A'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Across all channels
          </p>
        </div>

        {/* Revenue Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">💰</span>
          </div>
          <p className="text-gray-600 font-medium mb-2">Total Revenue</p>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-gray-900">
              {formatCurrency(totalRevenue || 0, currency)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Total cost: {formatCurrency(totalCost || 0, currency)}
          </p>
        </div>
      </div>

      {/* Channel Performance Breakdown */}
      {channels && channels.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
          <h3 className="font-bold text-gray-900 mb-6 text-xl">Channel Performance</h3>
          <div className="space-y-4">
            {channels.map((channel: any, index: number) => {
              const roi = channel.roi || 0;
              const isPositive = roi > 0;
              const isBest = bestChannel && channel.name === bestChannel.name;
              const isWorst = worstChannel && channel.name === worstChannel.name;

              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 ${isBest ? 'bg-green-50 border-green-200' :
                    isWorst ? 'bg-red-50 border-red-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                        {channel.name}
                        {isBest && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Best</span>}
                        {isWorst && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">Worst</span>}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Revenue: {formatCurrency(channel.revenue || 0, currency)} •
                        Cost: {formatCurrency(channel.cost || 0, currency)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {roi.toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-500">ROI</p>
                    </div>
                  </div>

                  {/* ROI Progress Bar */}
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isPositive ? 'bg-[#D1F25E]' : 'bg-red-500'
                        }`}
                      style={{ width: `${Math.min(Math.abs(roi), 500) / 5}%` }}
                    />
                  </div>

                  {channel.conversions !== undefined && (
                    <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Conversions</p>
                        <p className="font-bold text-gray-900">{channel.conversions}</p>
                      </div>
                      {channel.cpa !== undefined && (
                        <div>
                          <p className="text-gray-500">CPA</p>
                          <p className="font-bold text-gray-900">{formatCurrency(channel.cpa, currency)}</p>
                        </div>
                      )}
                      {channel.conversionRate !== undefined && (
                        <div>
                          <p className="text-gray-500">Conv. Rate</p>
                          <p className="font-bold text-gray-900">{channel.conversionRate.toFixed(1)}%</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Industry Benchmarks */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span> Channel Insights
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Organic Search</p>
            <p className="text-gray-600 text-sm mt-1">Highest ROI, long-term value</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Paid Search</p>
            <p className="text-gray-600 text-sm mt-1">High intent, immediate results</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Social Media</p>
            <p className="text-gray-600 text-sm mt-1">Good for awareness, lower direct conversion</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Email Marketing</p>
            <p className="text-gray-600 text-sm mt-1">Highest retention ROI, low cost</p>
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
            <h4 className="font-bold text-gray-900 mb-2">Invest in Winners</h4>
            <p className="text-gray-600 text-sm">Increase budget for high-ROI channels</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Multi-Touch Attribution</h4>
            <p className="text-gray-600 text-sm">Understand the full customer journey</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Assist Channels Matter</h4>
            <p className="text-gray-600 text-sm">Don't ignore brand awareness channels</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Test New Channels</h4>
            <p className="text-gray-600 text-sm">Start small before scaling</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Channel-Specific Creative</h4>
            <p className="text-gray-600 text-sm">Optimize messaging for each platform</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Track Incrementality</h4>
            <p className="text-gray-600 text-sm">Measure true incremental impact</p>
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
