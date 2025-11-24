'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface ContentRoiResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function ContentRoiResults({ results, currency, onReset }: ContentRoiResultsProps) {
  const {
    roi,
    total_revenue,
    net_profit,
    monthly_revenue,
    monthly_conversions,
    cost_per_visitor,
    revenue_per_visitor,
    content_cost,
    traffic_generated,
    lifespan,
    health_status,
    health_color,
    currency: resultCurrency
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Content Performance</h2>
          <p className="text-gray-500 mt-1">Projected over {lifespan} months</p>
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
            <span className="text-6xl">📝</span>
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

        {/* Net Profit Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">💰</span>
          </div>
          <p className="text-gray-500 font-medium mb-2">Total Net Profit</p>
          <div className="flex items-baseline gap-3">
            <span className={`text-5xl font-bold ${net_profit >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
              {formatCurrency(net_profit, resultCurrency)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Total Revenue ({formatCurrency(total_revenue, resultCurrency)}) - Cost ({formatCurrency(content_cost, resultCurrency)})
          </p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthly_revenue, resultCurrency)}</p>
          <p className="text-xs text-gray-400 mt-1">Recurring value</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Cost per Visitor</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(cost_per_visitor, resultCurrency)}</p>
          <p className="text-xs text-gray-400 mt-1">Acquisition efficiency</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Revenue per Visitor</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(revenue_per_visitor, resultCurrency)}</p>
          <p className="text-xs text-gray-400 mt-1">Visitor value</p>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Optimization Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Improve Conversion Rate</h4>
            <p className="text-gray-600 text-sm">Add clear CTAs and lead magnets. A 1% increase in conversion rate can double your ROI.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Extend Lifespan</h4>
            <p className="text-gray-600 text-sm">Update old content regularly to keep it ranking. Evergreen content compounds in value over time.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Lower Distribution Costs</h4>
            <p className="text-gray-600 text-sm">Leverage organic channels like SEO and email lists to drive traffic without high ad spend.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Target High-Value Users</h4>
            <p className="text-gray-600 text-sm">Create content that attracts customers with higher LTV potential to boost revenue per visitor.</p>
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
