'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface PurchaseFrequencyResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function PurchaseFrequencyResults({ results, currency, onReset }: PurchaseFrequencyResultsProps) {
  const {
    purchase_frequency,
    purchases_per_month,
    purchases_per_year,
    days_between_purchases,
    total_purchases,
    total_customers,
    time_period_days,
    health_status,
    health_color
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Frequency Analysis</h2>
          <p className="text-gray-500 mt-1">Based on {total_purchases.toLocaleString()} orders over {time_period_days} days</p>
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
        {/* Frequency Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">🔢</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Purchase Frequency</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {purchase_frequency.toFixed(2)}
            </span>
            <span className="text-xl text-gray-400">orders / customer</span>
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
              style={{ width: `${Math.min(Math.max(purchase_frequency, 0), 5) / 5 * 100}%` }}
            />
          </div>
        </div>

        {/* Time Between Purchases Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">⏳</span>
          </div>
          <p className="text-gray-500 font-medium mb-2">Average Time Between Orders</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-gray-900">
              {days_between_purchases.toFixed(0)}
            </span>
            <span className="text-xl text-gray-500">days</span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Customers typically return every {Math.round(days_between_purchases / 30)} months.
          </p>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Orders per Month</p>
          <p className="text-2xl font-bold text-gray-900">{purchases_per_month.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">Avg. monthly volume</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Orders per Year</p>
          <p className="text-2xl font-bold text-gray-900">{purchases_per_year.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">Avg. annual volume</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Customers</p>
          <p className="text-2xl font-bold text-blue-600">{total_customers.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">Active base</p>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Strategies to Increase Frequency
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Win-Back Campaigns</h4>
            <p className="text-gray-600 text-sm">Send automated emails {Math.round(days_between_purchases + 10)} days after purchase (just after the average return time) to prompt a re-order.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Subscription Model</h4>
            <p className="text-gray-600 text-sm">Offer a "Subscribe & Save" option. This guarantees recurring revenue and increases frequency automatically.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Limited Time Offers</h4>
            <p className="text-gray-600 text-sm">Create urgency with flash sales or limited-edition product drops to encourage impulse buys between regular purchases.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Product Recommendations</h4>
            <p className="text-gray-600 text-sm">Use "Frequently Bought Together" or "You May Also Like" widgets to drive cross-sells and additional orders.</p>
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
