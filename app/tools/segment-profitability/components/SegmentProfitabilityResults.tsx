'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface SegmentProfitabilityResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function SegmentProfitabilityResults({ results, currency, onReset }: SegmentProfitabilityResultsProps) {
  const {
    gross_profit,
    profit_margin,
    revenue_per_customer,
    cost_per_customer,
    profit_per_customer,
    roi,
    segment_revenue,
    segment_costs,
    segment_size,
    health_status,
    health_color,
    currency: resultCurrency
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Profitability Analysis</h2>
          <p className="text-gray-500 mt-1">Segment Size: {segment_size.toLocaleString()} customers</p>
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
        {/* Profit Margin Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">💼</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Profit Margin</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {profit_margin.toFixed(1)}%
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
              style={{ width: `${Math.min(Math.max(profit_margin, 0), 100)}%` }}
            />
          </div>
        </div>

        {/* Gross Profit Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">💰</span>
          </div>
          <p className="text-gray-500 font-medium mb-2">Total Gross Profit</p>
          <div className="flex items-baseline gap-3">
            <span className={`text-5xl font-bold ${gross_profit >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
              {formatCurrency(gross_profit, resultCurrency)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ROI: <span className="font-bold text-gray-900">{roi.toFixed(1)}%</span>
          </p>
        </div>
      </div>

      {/* Per Customer Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6">Per Customer Economics</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 font-bold mb-1">Revenue per Customer</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenue_per_customer, resultCurrency)}</p>
          </div>
          <div className="p-6 bg-red-50 rounded-xl border border-red-100">
            <p className="text-sm text-red-800 font-bold mb-1">Cost per Customer</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(cost_per_customer, resultCurrency)}</p>
          </div>
          <div className="p-6 bg-green-50 rounded-xl border border-green-100">
            <p className="text-sm text-green-800 font-bold mb-1">Profit per Customer</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(profit_per_customer, resultCurrency)}</p>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Strategic Recommendations
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Resource Allocation</h4>
            <p className="text-gray-600 text-sm">
              {profit_margin >= 25
                ? "This is a high-value segment. Allocate more budget to acquire similar customers."
                : "This segment has lower margins. Focus on efficiency and cost reduction."}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Pricing Strategy</h4>
            <p className="text-gray-600 text-sm">
              {profit_margin < 10
                ? "Consider raising prices for this segment or unbundling services to improve margins."
                : "Maintain premium pricing while ensuring high service levels to justify the cost."}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Cross-Selling</h4>
            <p className="text-gray-600 text-sm">Introduce higher-margin complementary products to increase the overall profit per customer.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Retention Focus</h4>
            <p className="text-gray-600 text-sm">Ensure high retention for this segment as acquiring new profitable customers is often more expensive.</p>
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
