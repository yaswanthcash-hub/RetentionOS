'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { PremiumHeroCard } from '@/components/ui/PremiumHeroCard';

interface AovCalculatorResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function AovCalculatorResults({ results, currency, onReset }: AovCalculatorResultsProps) {
  const {
    aov,
    total_revenue,
    number_of_orders,
    potential_revenue_10,
    potential_revenue_20,
    potential_revenue_30,
    additional_revenue_10,
    additional_revenue_20,
    additional_revenue_30,
    currency: resultCurrency
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Transaction Analysis</h2>
          <p className="text-gray-500 mt-1">Based on {number_of_orders.toLocaleString()} orders</p>
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
        {/* AOV Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">🛒</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Average Order Value (AOV)</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {formatCurrency(aov, resultCurrency)}
            </span>
          </div>
          <p className="text-gray-400 mt-2">
            Average revenue per transaction
          </p>
        </div>

        {/* Revenue Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">💰</span>
          </div>
          <p className="text-gray-500 font-medium mb-2">Total Revenue</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-gray-900">
              {formatCurrency(total_revenue, resultCurrency)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            From {number_of_orders.toLocaleString()} orders
          </p>
        </div>
      </div>

      {/* Growth Potential */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6">Revenue Growth Potential</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 font-bold mb-1">If AOV increases by 10%</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(potential_revenue_10, resultCurrency)}</p>
            <p className="text-sm text-green-600 font-bold mt-2">+{formatCurrency(additional_revenue_10, resultCurrency)}</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-sm text-indigo-800 font-bold mb-1">If AOV increases by 20%</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(potential_revenue_20, resultCurrency)}</p>
            <p className="text-sm text-green-600 font-bold mt-2">+{formatCurrency(additional_revenue_20, resultCurrency)}</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
            <p className="text-sm text-purple-800 font-bold mb-1">If AOV increases by 30%</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(potential_revenue_30, resultCurrency)}</p>
            <p className="text-sm text-green-600 font-bold mt-2">+{formatCurrency(additional_revenue_30, resultCurrency)}</p>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Tactics to Increase AOV
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Product Bundling</h4>
            <p className="text-gray-600 text-sm">Group related products together at a slight discount. "Buy the kit and save 15%" encourages customers to spend more upfront.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Free Shipping Threshold</h4>
            <p className="text-gray-600 text-sm">Set your free shipping threshold 15-20% higher than your current AOV. Customers will add items to qualify.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Cross-Sells & Upsells</h4>
            <p className="text-gray-600 text-sm">Recommend complementary items in the cart or at checkout. "Customers who bought this also bought..."</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Volume Discounts</h4>
            <p className="text-gray-600 text-sm">Offer "Buy 2, Get 1 Free" or tiered pricing (e.g., "Save $10 when you spend $100").</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-12">
        <PremiumButton
          onClick={() => window.print()}
          variant="primary"
          size="lg"
          icon="🖨️"
        >
          Print Report
        </PremiumButton>
      </div>
    </div>
  );
}
