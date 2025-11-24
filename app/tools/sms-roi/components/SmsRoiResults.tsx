'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface SmsRoiResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function SmsRoiResults({ results, currency, onReset }: SmsRoiResultsProps) {
  const {
    roi,
    roas,
    revenue,
    net_profit,
    conversions,
    clicks,
    cost_per_message,
    cost_per_conversion,
    revenue_per_message,
    click_rate,
    conversion_rate,
    messages_sent,
    campaign_cost,
    health_status,
    health_color,
    currency: resultCurrency
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Campaign Results</h2>
          <p className="text-gray-500 mt-1">Performance analysis for {messages_sent.toLocaleString()} messages</p>
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
        {/* ROI Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">📱</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Return on Investment (ROI)</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-[#D1F25E]">
              {roi.toFixed(0)}%
            </span>
          </div>
          <p className={`text-lg font-bold mt-2 ${health_color.includes('green') ? 'text-green-400' :
            health_color.includes('blue') ? 'text-blue-400' :
              health_color.includes('yellow') ? 'text-yellow-400' :
                'text-red-400'
            }`}>
            {health_status}
          </p>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${health_color.includes('green') ? 'bg-green-400' :
                health_color.includes('blue') ? 'bg-blue-400' :
                  health_color.includes('yellow') ? 'bg-yellow-400' :
                    'bg-red-400'
                }`}
              style={{ width: `${Math.min(Math.max(roi, 0), 500) / 5}%` }}
            />
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">💰</span>
          </div>
          <p className="text-gray-500 font-medium mb-2">Total Revenue Generated</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-gray-900">
              {formatCurrency(revenue, resultCurrency)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Net Profit: <span className={net_profit >= 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{formatCurrency(net_profit, resultCurrency)}</span>
          </p>
        </div>
      </div>

      {/* Funnel Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6">Campaign Funnel</h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-xl relative">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sent</p>
            <p className="text-xl font-bold text-gray-900">{messages_sent.toLocaleString()}</p>
            <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-300 transform -translate-y-1/2 z-10"></div>
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl relative">
            <p className="text-xs text-indigo-600 uppercase tracking-wider mb-1">Clicked ({click_rate}%)</p>
            <p className="text-xl font-bold text-indigo-900">{clicks.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-300 transform -translate-y-1/2 z-10"></div>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="text-xs text-green-600 uppercase tracking-wider mb-1">Converted ({conversion_rate}%)</p>
            <p className="text-xl font-bold text-green-900">{conversions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
        </div>
      </div>

      {/* Efficiency Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Revenue per Message</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenue_per_message, resultCurrency)}</p>
          <p className="text-xs text-gray-400 mt-1">Value of each SMS</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Cost per Conversion</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(cost_per_conversion, resultCurrency)}</p>
          <p className="text-xs text-gray-400 mt-1">Acquisition cost</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">ROAS</p>
          <p className="text-2xl font-bold text-blue-600">{roas.toFixed(2)}x</p>
          <p className="text-xs text-gray-400 mt-1">Return on Ad Spend</p>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Optimization Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Timing is Everything</h4>
            <p className="text-gray-600 text-sm">Send SMS during peak engagement hours (usually mid-day or early evening). Avoid early mornings or late nights.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Clear Call-to-Action</h4>
            <p className="text-gray-600 text-sm">SMS is short. Get straight to the point with a clear CTA and link. "Shop now: [Link]" works best.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Exclusive Offers</h4>
            <p className="text-gray-600 text-sm">Treat SMS subscribers like VIPs. Exclusive flash sales drive higher conversion rates than generic offers.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Personalization</h4>
            <p className="text-gray-600 text-sm">Use first names and reference past purchases. Personalized SMS can see 2-3x higher engagement.</p>
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
