'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface CartAbandonmentResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function CartAbandonmentResults({ results, currency, onReset }: CartAbandonmentResultsProps) {
  const {
    cart_abandonment_rate,
    abandoned_carts,
    lost_revenue,
    conversion_rate,
    completed_purchases,
    carts_created,
    average_cart_value,
    recovery_potential_10,
    recovery_potential_20,
    recovery_potential_30,
    currency: resultCurrency,
    health_status,
    health_color
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Abandonment Analysis</h2>
          <p className="text-gray-500 mt-1">Based on {carts_created.toLocaleString()} cart sessions</p>
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
        {/* Abandonment Rate Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">🛒</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Abandonment Rate</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {cart_abandonment_rate.toFixed(1)}%
            </span>
          </div>
          <p className={`text-lg font-bold mt-2 ${health_color.includes('green') ? 'text-green-400' :
            health_color.includes('blue') ? 'text-blue-400' :
              'text-red-400'
            }`}>
            {health_status}
          </p>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${health_color.includes('green') ? 'bg-green-400' :
                health_color.includes('blue') ? 'bg-blue-400' :
                  'bg-red-400'
                }`}
              style={{ width: `${Math.min(Math.max(cart_abandonment_rate, 0), 100)}%` }}
            />
          </div>
        </div>

        {/* Lost Revenue Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">💸</span>
          </div>
          <p className="text-gray-500 font-medium mb-2">Total Lost Revenue</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-red-500">
              {formatCurrency(lost_revenue, resultCurrency)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            From {abandoned_carts.toLocaleString()} abandoned carts
          </p>
        </div>
      </div>

      {/* Funnel Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6">Cart Funnel</h3>
        <div className="space-y-6">
          <div className="relative">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-900">Carts Created</span>
              <span className="font-bold text-gray-900">{carts_created.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div className="bg-gray-400 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="relative pl-4 border-l-2 border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-red-600">Abandoned</span>
              <span className="font-bold text-red-600">{abandoned_carts.toLocaleString()} ({cart_abandonment_rate.toFixed(1)}%)</span>
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-green-600">Completed Purchases</span>
              <span className="font-bold text-green-600">{completed_purchases.toLocaleString()} ({conversion_rate.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div className="bg-[#D1F25E] h-full rounded-full" style={{ width: `${conversion_rate}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recovery Potential */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6">Revenue Recovery Opportunity</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 font-bold mb-1">Recover 10% of Carts</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(recovery_potential_10, resultCurrency)}</p>
            <p className="text-xs text-gray-500 mt-2">Conservative Goal</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-sm text-indigo-800 font-bold mb-1">Recover 20% of Carts</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(recovery_potential_20, resultCurrency)}</p>
            <p className="text-xs text-gray-500 mt-2">Moderate Goal</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
            <p className="text-sm text-purple-800 font-bold mb-1">Recover 30% of Carts</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(recovery_potential_30, resultCurrency)}</p>
            <p className="text-xs text-gray-500 mt-2">Aggressive Goal</p>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Recovery Strategies
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Automated Email Series</h4>
            <p className="text-gray-600 text-sm">Send a 3-part email sequence: 1 hour after (reminder), 24 hours after (social proof), and 48 hours after (discount).</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Exit-Intent Popups</h4>
            <p className="text-gray-600 text-sm">Detect when a user is about to leave and offer a small incentive (e.g., 5% off or free shipping) to complete the purchase now.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Simplify Checkout</h4>
            <p className="text-gray-600 text-sm">Remove required account creation (guest checkout), reduce form fields, and offer multiple payment options (Apple Pay, PayPal).</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Retargeting Ads</h4>
            <p className="text-gray-600 text-sm">Show dynamic ads to users featuring the exact products they left in their cart to bring them back to your site.</p>
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
