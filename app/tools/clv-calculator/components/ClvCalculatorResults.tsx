'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { PremiumHeroCard } from '@/components/ui/PremiumHeroCard';

interface ClvCalculatorResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function ClvCalculatorResults({ results, currency, onReset }: ClvCalculatorResultsProps) {
  const {
    gross_clv,
    net_clv,
    discounted_clv,
    annual_value,
    monthly_value,
    average_order_value,
    purchase_frequency,
    customer_lifespan,
    profit_margin,
    discount_rate,
    churn_rate,
    isAdvancedMode,
    currency: resultCurrency
  } = results;

  // Dynamic recommendations based on data
  const isHighChurn = churn_rate > 30 || customer_lifespan < 2;
  const isLowMargin = profit_margin > 0 && profit_margin < 15;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isAdvancedMode ? 'Advanced CLV Analysis' : 'CLV Analysis'}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAdvancedMode ? 'Discounted Cash Flow & Profitability Model' : 'Customer Value Projection'}
          </p>
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
        {/* Primary Metric: Discounted CLV (Advanced) or Gross CLV (Basic) */}
        <PremiumHeroCard
          title={isAdvancedMode ? 'Discounted Lifetime Value (NPV)' : 'Customer Lifetime Value (Gross)'}
          value={formatCurrency(isAdvancedMode ? discounted_clv : gross_clv, resultCurrency)}
          subtext={isAdvancedMode
            ? `Present value of future profits, discounted at ${discount_rate}% annually.`
            : `Total revenue expected from a single customer over ${customer_lifespan} years.`}
          icon="💎"
        />

        {/* Secondary Metric */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">💰</span>
          </div>
          <p className="text-gray-500 font-medium mb-2">
            {isAdvancedMode ? 'Unadjusted Gross CLV' : 'Annual Customer Value'}
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-gray-900">
              {formatCurrency(isAdvancedMode ? gross_clv : annual_value, resultCurrency)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {isAdvancedMode
              ? 'Total lifetime revenue before costs and discounting.'
              : 'Revenue generated per customer each year.'}
          </p>
        </div>
      </div>

      {/* Advanced Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Acquisition Ceiling (3:1)</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency((isAdvancedMode ? discounted_clv : gross_clv) / 3, resultCurrency)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Max recommended CAC</p>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Payback Target</p>
          <p className="text-2xl font-bold text-gray-900">
            &lt; {(12 / purchase_frequency).toFixed(1)} mo
          </p>
          <p className="text-xs text-gray-400 mt-1">To recover CAC in 1st purchase</p>
        </div>

        {isAdvancedMode && churn_rate ? (
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Churn Risk</p>
            <p className={`text-2xl font-bold ${isHighChurn ? 'text-red-600' : 'text-green-600'}`}>
              {churn_rate.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-400 mt-1">Annual attrition</p>
          </div>
        ) : (
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{(purchase_frequency * customer_lifespan).toFixed(0)}</p>
            <p className="text-xs text-gray-400 mt-1">Over lifetime</p>
          </div>
        )}

        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Profit Margin</p>
          <p className={`text-2xl font-bold ${isLowMargin ? 'text-orange-500' : 'text-gray-900'}`}>
            {profit_margin > 0 ? `${profit_margin}%` : 'N/A'}
          </p>
          <p className="text-xs text-gray-400 mt-1">Gross margin</p>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">🚀</span> Strategic Recommendations
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {isHighChurn && (
            <div className="bg-white p-5 rounded-xl border-l-4 border-red-500 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">🚨 Fix Retention First</h4>
              <p className="text-gray-600 text-sm">
                Your churn rate is high ({churn_rate?.toFixed(1)}%). Increasing CLV is impossible with a leaky bucket.
                Focus on onboarding and first-90-day engagement before acquisition.
              </p>
            </div>
          )}

          {isLowMargin && (
            <div className="bg-white p-5 rounded-xl border-l-4 border-orange-500 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">⚠️ Margin Optimization Needed</h4>
              <p className="text-gray-600 text-sm">
                Low margins ({profit_margin}%) severely limit your CAC. Consider bundling high-margin add-ons
                or raising prices for premium tiers to expand your acquisition budget.
              </p>
            </div>
          )}

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Increase AOV</h4>
            <p className="text-gray-600 text-sm">Implement cross-selling and up-selling strategies at checkout. Bundling products is a proven way to lift average order value.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Extend Lifespan</h4>
            <p className="text-gray-600 text-sm">Focus on customer success and support. A happy customer stays longer. Invest in onboarding and education.</p>
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
