'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface RepeatPurchaseRateResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function RepeatPurchaseRateResults({ results, currency, onReset }: RepeatPurchaseRateResultsProps) {
  const {
    repeat_rate,
    repeat_customers,
    one_time_customers,
    one_time_rate,
    total_customers,
    health_status,
    health_color,
    time_period
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Loyalty Analysis</h2>
          <p className="text-gray-500 mt-1">Based on {total_customers.toLocaleString()} customers ({time_period})</p>
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
        {/* Repeat Rate Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">🔁</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Repeat Purchase Rate</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {repeat_rate.toFixed(1)}%
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
              style={{ width: `${Math.min(Math.max(repeat_rate, 0), 100)}%` }}
            />
          </div>
        </div>

        {/* Customer Breakdown Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">👥</span>
          </div>
          <p className="text-gray-500 font-medium mb-6">Customer Composition</p>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-900 font-bold">Repeat Customers</span>
                <span className="text-gray-900 font-bold">{repeat_customers.toLocaleString()} ({repeat_rate.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#D1F25E] h-full rounded-full" style={{ width: `${repeat_rate}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-medium">One-time Buyers</span>
                <span className="text-gray-500 font-medium">{one_time_customers.toLocaleString()} ({one_time_rate.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-gray-400 h-full rounded-full" style={{ width: `${one_time_rate}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> How to Increase Repeat Purchases
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Post-Purchase Flows</h4>
            <p className="text-gray-600 text-sm">Send a "Thank You" email immediately, followed by product education, and then a cross-sell offer 14-30 days later.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Loyalty Program</h4>
            <p className="text-gray-600 text-sm">Reward points for every purchase. Customers who join loyalty programs are 47% more likely to make a second purchase.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Replenishment Reminders</h4>
            <p className="text-gray-600 text-sm">If you sell consumable products, send automated reminders when they are likely to run out.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Unboxing Experience</h4>
            <p className="text-gray-600 text-sm">A premium unboxing experience increases perceived value and encourages social sharing and re-ordering.</p>
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
