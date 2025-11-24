'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface CustomerHealthScoreResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function CustomerHealthScoreResults({ results, currency, onReset }: CustomerHealthScoreResultsProps) {
  const {
    health_score,
    health_level,
    action,
    product_usage,
    support_tickets,
    payment_status,
    engagement_score,
    health_color
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Health Assessment</h2>
          <p className="text-gray-500 mt-1">Based on usage, support, billing, and engagement</p>
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
        {/* Health Score Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">💚</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Overall Health Score</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {health_score.toFixed(0)}
            </span>
            <span className="text-2xl text-gray-400">/ 100</span>
          </div>
          <p className={`text-lg font-bold mt-2 ${health_color.includes('green') ? 'text-green-400' :
            health_color.includes('blue') ? 'text-blue-400' :
              health_color.includes('yellow') ? 'text-yellow-400' :
                'text-red-400'
            }`}>
            {health_level}
          </p>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${health_color.includes('green') ? 'bg-green-400' :
                health_color.includes('blue') ? 'bg-blue-400' :
                  health_color.includes('yellow') ? 'bg-yellow-400' :
                    'bg-red-400'
                }`}
              style={{ width: `${Math.min(Math.max(health_score, 0), 100)}%` }}
            />
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">⚡</span>
          </div>
          <p className="text-gray-500 font-medium mb-2">Recommended Action</p>
          <p className="text-2xl font-bold text-gray-900 leading-tight">
            {action}
          </p>
          <div className="mt-4">
            {health_level === 'Healthy' && (
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">Upsell Opportunity</span>
            )}
            {health_level === 'Stable' && (
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">Nurture</span>
            )}
            {health_level === 'At Risk' && (
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">Churn Risk</span>
            )}
            {health_level === 'Critical' && (
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">High Churn Risk</span>
            )}
          </div>
        </div>
      </div>

      {/* Component Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6">Score Breakdown</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Product Usage</p>
            <p className="text-xl font-bold text-gray-900">{product_usage}%</p>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
              <div className="bg-gray-900 h-1.5 rounded-full" style={{ width: `${Math.min(product_usage, 100)}%` }}></div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Support Tickets</p>
            <p className="text-xl font-bold text-gray-900">{support_tickets}</p>
            <p className="text-xs text-gray-400 mt-1">{support_tickets === 0 ? 'Excellent' : support_tickets > 5 ? 'High Volume' : 'Normal'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Payment Status</p>
            <p className={`text-xl font-bold ${payment_status === 'Current' ? 'text-green-600' : 'text-red-600'}`}>{payment_status}</p>
            <p className="text-xs text-gray-400 mt-1">{payment_status === 'Current' ? 'On Track' : 'Attention Needed'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Engagement</p>
            <p className="text-xl font-bold text-gray-900">{engagement_score}/100</p>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
              <div className="bg-gray-900 h-1.5 rounded-full" style={{ width: `${engagement_score}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Strategic Next Steps
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">If Healthy (80-100)</h4>
            <p className="text-gray-600 text-sm">Ask for referrals, case studies, or reviews. Introduce advanced features or upsell to higher tiers.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">If Stable (60-79)</h4>
            <p className="text-gray-600 text-sm">Maintain regular check-ins. Ensure they are getting value from core features. Look for small expansion opportunities.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">If At Risk (40-59)</h4>
            <p className="text-gray-600 text-sm">Schedule a health check call immediately. Identify pain points and offer training or support to resolve issues.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">If Critical (0-39)</h4>
            <p className="text-gray-600 text-sm">Executive intervention required. Offer incentives to stay or a dedicated success plan to get back on track.</p>
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
