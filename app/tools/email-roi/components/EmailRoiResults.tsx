'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface EmailRoiResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function EmailRoiResults({ results, currency, onReset }: EmailRoiResultsProps) {
  const {
    roi,
    roas,
    revenue,
    net_profit,
    conversions,
    clicks,
    opens,
    cost_per_conversion,
    revenue_per_email,
    open_rate,
    click_rate,
    conversion_rate,
    campaign_cost,
    list_size,
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
          <p className="text-gray-500 mt-1">Performance analysis for {list_size.toLocaleString()} recipients</p>
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
            <span className="text-6xl">📧</span>
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
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-xl relative">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sent</p>
            <p className="text-xl font-bold text-gray-900">{list_size.toLocaleString()}</p>
            <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-300 transform -translate-y-1/2 z-10"></div>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl relative">
            <p className="text-xs text-blue-600 uppercase tracking-wider mb-1">Opened ({open_rate}%)</p>
            <p className="text-xl font-bold text-blue-900">{opens.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
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
          <p className="text-sm text-gray-500 mb-1">Revenue per Email</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenue_per_email, resultCurrency)}</p>
          <p className="text-xs text-gray-400 mt-1">Value of each subscriber</p>
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
          <span className="text-2xl">💡</span> Improvement Tactics
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Subject Line Testing</h4>
            <p className="text-gray-600 text-sm">A/B test subject lines to boost open rates. Even a 1% increase adds {((list_size * 0.01) * (click_rate / 100) * (conversion_rate / 100) * (revenue / conversions)).toLocaleString(undefined, { style: 'currency', currency: 'USD' })} in revenue.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">List Segmentation</h4>
            <p className="text-gray-600 text-sm">Don't blast everyone. Segmented campaigns have 14.31% higher open rates and 100.95% higher click rates.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Personalization</h4>
            <p className="text-gray-600 text-sm">Go beyond "Hi [Name]". Use purchase history to recommend relevant products and increase conversion rates.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Automated Flows</h4>
            <p className="text-gray-600 text-sm">Set up abandoned cart and welcome series. These automated emails often generate 320% more revenue than promotional emails.</p>
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
