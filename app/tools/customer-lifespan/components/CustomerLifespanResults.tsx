'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface CustomerLifespanResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function CustomerLifespanResults({ results, currency, onReset }: CustomerLifespanResultsProps) {
  const {
    average_lifespan_months,
    average_lifespan_years,
    lifespan_from_churn,
    lifespan_years_from_churn,
    total_active_months,
    total_customers,
    monthly_churn_rate,
    health_status,
    health_color
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Lifespan Analysis</h2>
          <p className="text-gray-500 mt-1">Based on {total_customers.toLocaleString()} customers</p>
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
        {/* Average Lifespan Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">⏳</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Average Customer Lifespan</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {average_lifespan_months.toFixed(1)}
            </span>
            <span className="text-2xl text-gray-400">months</span>
          </div>
          <p className={`text-lg font-bold mt-2 ${health_color.includes('green') ? 'text-green-400' :
            health_color.includes('blue') ? 'text-blue-400' :
              health_color.includes('yellow') ? 'text-yellow-400' :
                'text-red-400'
            }`}>
            {health_status}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            ({average_lifespan_years.toFixed(1)} years)
          </p>
        </div>

        {/* Projected Lifespan Card (if churn rate provided) */}
        {lifespan_from_churn ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="text-6xl">🔮</span>
            </div>
            <p className="text-gray-500 font-medium mb-2">Projected Lifespan (from Churn)</p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-gray-900">
                {lifespan_from_churn.toFixed(1)}
              </span>
              <span className="text-xl text-gray-500">months</span>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Based on {monthly_churn_rate}% monthly churn rate
            </p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-2">Projected Lifespan</p>
              <p className="text-gray-500 text-sm">Enter Monthly Churn Rate to see projection</p>
            </div>
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Strategies to Extend Lifespan
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Improve Onboarding</h4>
            <p className="text-gray-600 text-sm">A strong start leads to a longer journey. Ensure customers get value immediately.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Loyalty Programs</h4>
            <p className="text-gray-600 text-sm">Incentivize long-term engagement with points, tiers, or exclusive benefits for tenure.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Annual Contracts</h4>
            <p className="text-gray-600 text-sm">Encourage annual billing to automatically extend the minimum lifespan to 12 months.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Proactive Support</h4>
            <p className="text-gray-600 text-sm">Reach out before problems arise. Check in with customers who show signs of slipping away.</p>
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
