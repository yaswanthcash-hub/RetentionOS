'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface RoiCalculatorResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function RoiCalculatorResults({ results, currency, onReset }: RoiCalculatorResultsProps) {
  const {
    current_metrics,
    projected_metrics,
    impact,
    timeline,
    roi,
    health_status,
    currency: resultCurrency
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">ROI Projection</h2>
          <p className="text-gray-500 mt-1">Financial impact of {projected_metrics.retention_rate - current_metrics.retention_rate}% retention increase</p>
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

      {/* Hero Metrics */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Annual Impact Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">🚀</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Projected Annual Revenue Increase</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-[#D1F25E]">
              +{formatCurrency(impact.annual_increase, resultCurrency)}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            That's a <span className="text-white font-bold">{impact.percentage_growth.toFixed(1)}%</span> boost to your top line.
          </p>
        </div>

        {/* ROI Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">📈</span>
          </div>
          <p className="text-gray-500 font-medium mb-2">Year 1 ROI</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-gray-900">
              {roi.year_one_roi.toFixed(0)}%
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700">
              {health_status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            For every $1 invested, you get ${(roi.year_one_roi / 100).toFixed(2)} back.
          </p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Monthly Revenue Lift</p>
          <p className="text-2xl font-bold text-gray-900">+{formatCurrency(impact.monthly_increase, resultCurrency)}</p>
          <p className="text-xs text-gray-400 mt-1">Recurring monthly gain</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Investment Required</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(roi.investment_required, resultCurrency)}</p>
          <p className="text-xs text-gray-400 mt-1">Est. 5% of annual revenue</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Break-even Point</p>
          <p className="text-2xl font-bold text-blue-600">{roi.break_even_months} Months</p>
          <p className="text-xs text-gray-400 mt-1">Time to recover investment</p>
        </div>
      </div>

      {/* Timeline Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-10">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">12-Month Revenue Projection</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Month</th>
                <th className="px-6 py-4">Projected Revenue</th>
                <th className="px-6 py-4">Additional Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {timeline.filter((_: any, i: number) => i % 2 === 0).map((item: any) => ( // Show every other month to save space
                <tr key={item.month} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">Month {item.month}</td>
                  <td className="px-6 py-4 text-gray-600">{formatCurrency(item.revenue, resultCurrency)}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">+{formatCurrency(item.additional_revenue, resultCurrency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
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
