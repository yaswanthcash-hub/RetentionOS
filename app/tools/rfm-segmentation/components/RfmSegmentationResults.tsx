'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface RfmSegmentationResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function RfmSegmentationResults({ results, currency, onReset }: RfmSegmentationResultsProps) {
  const {
    rfm_score,
    total_score,
    recency_score,
    frequency_score,
    monetary_score,
    segment,
    segment_action,
    segment_color,
    next_best_actions,
    recency_days,
    frequency_count,
    monetary_value,
    businessModel,
    currency: resultCurrency
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Segmentation Analysis</h2>
          <p className="text-gray-500 mt-1">
            Based on {businessModel === 'saas' ? 'SaaS' : businessModel === 'digital' ? 'Digital Product' : 'E-commerce'} RFM Model
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
        {/* Segment Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[240px]">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-8xl">🎯</span>
          </div>
          <div>
            <p className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-sm">Identified Persona</p>
            <h3 className="text-4xl md:text-5xl font-bold text-[#D1F25E] mb-2">
              {segment}
            </h3>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-700 bg-gray-800 text-sm text-gray-300">
              RFM Score: {rfm_score}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-400 text-sm mb-1">Primary Strategy</p>
            <p className="text-xl font-bold text-white">
              {segment_action}
            </p>
          </div>
        </div>

        {/* Next Best Actions Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">⚡</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">🚀</span> Next Best Actions
          </h3>

          <div className="space-y-4 flex-1">
            {next_best_actions && next_best_actions.map((action: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-300 transition-colors">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D1F25E] flex items-center justify-center text-gray-900 font-bold text-xs mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-700 font-medium">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6">RFM Score Breakdown</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Recency */}
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-blue-900">Recency</h4>
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-bold">Score: {recency_score}/5</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{recency_days} days</p>
            <p className="text-xs text-gray-500">Since last activity</p>
            <div className="w-full bg-blue-200 h-2 rounded-full mt-4">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(recency_score / 5) * 100}%` }}></div>
            </div>
          </div>

          {/* Frequency */}
          <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-purple-900">Frequency</h4>
              <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-bold">Score: {frequency_score}/5</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{frequency_count}</p>
            <p className="text-xs text-gray-500">Total interactions/orders</p>
            <div className="w-full bg-purple-200 h-2 rounded-full mt-4">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(frequency_score / 5) * 100}%` }}></div>
            </div>
          </div>

          {/* Monetary */}
          <div className="p-6 bg-green-50 rounded-xl border border-green-100">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-green-900">Monetary</h4>
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-bold">Score: {monetary_score}/5</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{formatCurrency(monetary_value, resultCurrency)}</p>
            <p className="text-xs text-gray-500">Total lifetime value</p>
            <div className="w-full bg-green-200 h-2 rounded-full mt-4">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(monetary_score / 5) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Segment Definitions (Context) */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">📚</span> Other Common Personas
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm opacity-60 hover:opacity-100 transition-opacity">
            <h4 className="font-bold text-gray-900 mb-2">Champions</h4>
            <p className="text-gray-600 text-sm">Bought recently, buy often, and spend the most. Your most valuable customers.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm opacity-60 hover:opacity-100 transition-opacity">
            <h4 className="font-bold text-gray-900 mb-2">Loyal Customers</h4>
            <p className="text-gray-600 text-sm">Spend good money and often. Responsive to promotions.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm opacity-60 hover:opacity-100 transition-opacity">
            <h4 className="font-bold text-gray-900 mb-2">At Risk</h4>
            <p className="text-gray-600 text-sm">Spent big money and purchased often, but haven't returned for a long time.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm opacity-60 hover:opacity-100 transition-opacity">
            <h4 className="font-bold text-gray-900 mb-2">Hibernating</h4>
            <p className="text-gray-600 text-sm">Last purchase was long ago, low spenders and low number of orders.</p>
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
