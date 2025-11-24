'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface ChurnRateResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function ChurnRateResults({ results, currency, onReset }: ChurnRateResultsProps) {
  const {
    churn_rate,
    net_churn_rate,
    retention_rate,
    lost_value,
    start_value,
    health_status,
    health_color,
    annual_retention,
    churnType,
    churn_reasons,
    currency: resultCurrency
  } = results;

  const isRevenueChurn = churnType === 'revenue';
  const isNetNegative = net_churn_rate !== null && net_churn_rate < 0;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isRevenueChurn ? 'Revenue Churn Analysis' : 'Customer Churn Analysis'}
          </h2>
          <p className="text-gray-500 mt-1">Based on your {results.time_period.toLowerCase()} data</p>
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
        {/* Churn Rate Card */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl">📉</span>
          </div>
          <p className="text-gray-600 font-medium mb-2">
            {isRevenueChurn ? 'Gross Revenue Churn' : 'Customer Churn Rate'}
          </p>
          <div className="flex items-baseline gap-3">
            <span className={`text-5xl font-bold ${health_color.includes('green') ? 'text-green-600' :
              health_color.includes('blue') ? 'text-blue-600' :
                health_color.includes('yellow') ? 'text-yellow-600' :
                  'text-red-600'
              }`}>
              {churn_rate.toFixed(2)}%
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gray-100 ${health_color.includes('green') ? 'text-green-700' :
              health_color.includes('blue') ? 'text-blue-700' :
                health_color.includes('yellow') ? 'text-yellow-700' :
                  'text-red-700'
              }`}>
              {health_status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {isRevenueChurn
              ? `${formatCurrency(lost_value, resultCurrency)} MRR lost this period`
              : `${lost_value.toLocaleString()} customers lost this period`}
          </p>
        </div>

        {/* Retention Rate / Net Churn Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">{isNetNegative ? '🚀' : '🔒'}</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">
            {isRevenueChurn ? 'Net Revenue Churn' : 'Retention Rate'}
          </p>
          <div className="flex items-baseline gap-3">
            <span className={`text-5xl font-bold ${isNetNegative ? 'text-[#D1F25E]' : 'text-white'}`}>
              {isRevenueChurn
                ? `${net_churn_rate?.toFixed(2)}%`
                : `${retention_rate.toFixed(2)}%`}
            </span>
            {isNetNegative && (
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-[#D1F25E] text-gray-900">
                Net Negative!
              </span>
            )}
          </div>

          {!isRevenueChurn && (
            <div className="w-full bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-[#D1F25E] h-full rounded-full transition-all duration-1000"
                style={{ width: `${retention_rate}%` }}
              />
            </div>
          )}

          <p className="text-sm text-gray-400 mt-4">
            {isRevenueChurn
              ? (net_churn_rate && net_churn_rate < 0
                ? 'Expansion revenue exceeds churn. You are growing automatically.'
                : 'Revenue lost after accounting for expansion.')
              : `${(start_value - lost_value).toLocaleString()} retained out of ${start_value.toLocaleString()}`}
          </p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Projected Annual Retention</p>
          <p className="text-2xl font-bold text-gray-900">{annual_retention.toFixed(1)}%</p>
          <p className="text-xs text-gray-400 mt-1">If current rate persists</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Lost Value Impact</p>
          <p className="text-2xl font-bold text-gray-900">
            {isRevenueChurn
              ? formatCurrency(lost_value * 12, resultCurrency)
              : 'High'}
          </p>
          <p className="text-xs text-gray-400 mt-1">Annualized loss</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Health Score</p>
          <p className={`text-2xl font-bold ${health_color}`}>{health_status}</p>
          <p className="text-xs text-gray-400 mt-1">Overall assessment</p>
        </div>
      </div>

      {/* Churn Reason Analysis (If provided) */}
      {churn_reasons && (
        <div className="mb-12 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🧠</span> Churn Reason Analysis
          </h3>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <p className="text-gray-700 italic mb-4">"{churn_reasons}"</p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase">Risk Factor Identified</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">Action Required</span>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              *Based on your input, specific retention plays have been highlighted below.
            </p>
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Expert Recommendations
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {isRevenueChurn && (
            <div className="bg-white p-5 rounded-xl border-l-4 border-blue-500 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">Drive Expansion Revenue</h4>
              <p className="text-gray-600 text-sm">
                To achieve Net Negative Churn, focus on upsells. If a customer is leaving, can you downsell them to a "pause" plan instead of a full cancel?
              </p>
            </div>
          )}

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Analyze "Why"</h4>
            <p className="text-gray-600 text-sm">Implement exit surveys immediately to understand the top 3 reasons for churn. Fix the root cause, not just the symptom.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Improve Onboarding</h4>
            <p className="text-gray-600 text-sm">Most churn happens in the first 90 days. Review your onboarding flow to ensure customers reach "Aha!" moment faster.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Win-Back Campaigns</h4>
            <p className="text-gray-600 text-sm">Set up automated email flows for churned customers 30, 60, and 90 days after cancellation with special offers.</p>
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
