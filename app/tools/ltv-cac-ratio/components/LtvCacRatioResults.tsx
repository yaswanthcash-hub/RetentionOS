'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface LtvCacRatioResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function LtvCacRatioResults({ results, currency, onReset }: LtvCacRatioResultsProps) {
  const {
    ratio,
    health_status,
    health_color,
    recommendation,
    customer_lifetime_value,
    customer_acquisition_cost,
    currency: resultCurrency
  } = results;

  // Calculate position for the visual scale (capped between 0 and 6 for display)
  const scalePosition = Math.min(Math.max(ratio, 0), 6) / 6 * 100;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Unit Economics Analysis</h2>
          <p className="text-gray-500 mt-1">LTV to CAC Relationship</p>
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
        {/* Ratio Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">⚖️</span>
          </div>
          <div>
            <p className="text-gray-400 font-medium mb-2">LTV:CAC Ratio</p>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-bold text-[#D1F25E]">
                {ratio.toFixed(1)}:1
              </span>
            </div>
            <p className={`text-lg font-bold mt-2 ${health_color.includes('blue') ? 'text-blue-400' :
              health_color.includes('green') ? 'text-green-400' :
                health_color.includes('yellow') ? 'text-yellow-400' :
                  'text-red-400'
              }`}>
              {health_status}
            </p>
          </div>

          <div className="mt-8">
            <div className="relative h-4 bg-gray-700 rounded-full w-full">
              {/* Zones */}
              <div className="absolute left-0 w-1/6 h-full bg-red-500 rounded-l-full opacity-50"></div> {/* 0-1 */}
              <div className="absolute left-[16.66%] w-2/6 h-full bg-yellow-500 opacity-50"></div> {/* 1-3 */}
              <div className="absolute left-[50%] w-1/6 h-full bg-green-500 opacity-50"></div> {/* 3-4 */}
              <div className="absolute left-[66.66%] w-2/6 h-full bg-blue-500 rounded-r-full opacity-50"></div> {/* 4+ */}

              {/* Marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-[#D1F25E] rounded-full shadow-lg transition-all duration-1000"
                style={{ left: `calc(${scalePosition}% - 12px)` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>0x</span>
              <span>1x</span>
              <span>3x</span>
              <span>4x</span>
              <span>6x+</span>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center border-b border-gray-100 pb-6">
            <div>
              <p className="text-gray-500 font-medium mb-1">Customer Lifetime Value</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(customer_lifetime_value, resultCurrency)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              💰
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 font-medium mb-1">Customer Acquisition Cost</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(customer_acquisition_cost, resultCurrency)}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
              💸
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span> Strategic Recommendation
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          {recommendation}
        </p>
      </div>

      {/* Benchmarks Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <p className="font-bold text-gray-900">Unprofitable (&lt; 1:1)</p>
          </div>
          <p className="text-sm text-gray-600">You lose money on every customer. Stop paid ads immediately.</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <p className="font-bold text-gray-900">Healthy (3:1)</p>
          </div>
          <p className="text-sm text-gray-600">The sweet spot. You are growing efficiently and profitably.</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <p className="font-bold text-gray-900">High Potential (&gt; 5:1)</p>
          </div>
          <p className="text-sm text-gray-600">You are too conservative. Spend more to grow faster.</p>
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
