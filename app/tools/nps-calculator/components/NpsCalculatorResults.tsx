'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { PremiumHeroCard } from '@/components/ui/PremiumHeroCard';

interface NpsCalculatorResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function NpsCalculatorResults({ results, currency, onReset }: NpsCalculatorResultsProps) {
  const {
    nps,
    promoter_percentage,
    detractor_percentage,
    passive_percentage,
    total_responses,
    promoters,
    passives,
    detractors,
    health_status,
    health_color,
    revenue_at_risk,
    revenue_safe,
    potential_revenue,
    sentiment_themes,
    currency: resultCurrency
  } = results;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">NPS Analysis</h2>
          <p className="text-gray-500 mt-1">Based on {total_responses} responses</p>
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
        {/* NPS Score Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">⭐</span>
          </div>
          <div>
            <p className="text-gray-400 font-medium mb-2">Net Promoter Score</p>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-bold text-[#D1F25E]">
                {nps.toFixed(0)}
              </span>
            </div>
            <p className={`text-lg font-bold mt-2 ${health_color.includes('green') ? 'text-green-400' :
              health_color.includes('blue') ? 'text-blue-400' :
                health_color.includes('indigo') ? 'text-indigo-400' :
                  health_color.includes('yellow') ? 'text-yellow-400' :
                    'text-red-400'
              }`}>
              {health_status}
            </p>
          </div>

          <div className="mt-8">
            <div className="relative h-4 bg-gray-700 rounded-full w-full overflow-hidden">
              {/* Zones */}
              <div className="absolute left-0 w-1/2 h-full bg-red-500 opacity-50"></div> {/* -100 to 0 */}
              <div className="absolute left-1/2 w-[15%] h-full bg-yellow-500 opacity-50"></div> {/* 0 to 30 */}
              <div className="absolute left-[65%] w-[10%] h-full bg-blue-500 opacity-50"></div> {/* 30 to 50 */}
              <div className="absolute left-[75%] w-[25%] h-full bg-green-500 opacity-50"></div> {/* 50 to 100 */}

              {/* Marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-8 bg-white border-2 border-[#D1F25E] rounded shadow-lg transition-all duration-1000 z-10"
                style={{ left: `calc(${((nps + 100) / 200) * 100}% - 8px)` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>-100</span>
              <span>0</span>
              <span>+100</span>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center gap-6">
          <h3 className="font-bold text-gray-900 mb-2">Response Breakdown</h3>

          {/* Promoters */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-green-700">😃 Promoters</span>
              <span className="font-bold text-gray-900">{promoter_percentage.toFixed(1)}% ({promoters})</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: `${promoter_percentage}%` }}></div>
            </div>
          </div>

          {/* Passives */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-yellow-700">😐 Passives</span>
              <span className="font-bold text-gray-900">{passive_percentage.toFixed(1)}% ({passives})</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-yellow-500 h-3 rounded-full" style={{ width: `${passive_percentage}%` }}></div>
            </div>
          </div>

          {/* Detractors */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-red-700">😠 Detractors</span>
              <span className="font-bold text-gray-900">{detractor_percentage.toFixed(1)}% ({detractors})</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-red-500 h-3 rounded-full" style={{ width: `${detractor_percentage}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Impact Section (If provided) */}
      {revenue_at_risk > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-red-50 border border-red-100 rounded-xl shadow-sm">
            <p className="text-sm text-red-700 font-bold mb-1">Revenue at Risk</p>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(revenue_at_risk, resultCurrency)}</p>
            <p className="text-xs text-red-500 mt-2">Annual revenue from Detractors likely to churn.</p>
          </div>
          <div className="p-6 bg-green-50 border border-green-100 rounded-xl shadow-sm">
            <p className="text-sm text-green-700 font-bold mb-1">Growth Potential</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(revenue_safe, resultCurrency)}</p>
            <p className="text-xs text-green-500 mt-2">Revenue from Promoters ripe for upsells/referrals.</p>
          </div>
        </div>
      )}

      {/* Sentiment Analysis (If provided) */}
      {sentiment_themes && (
        <div className="mb-12 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🧠</span> Sentiment Analysis
          </h3>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <p className="text-gray-700 italic mb-4">"{sentiment_themes}"</p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold uppercase">Topic Identified</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">Analysis Complete</span>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              *Key themes extracted from your customer feedback.
            </p>
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Strategic Actions
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-green-700 mb-2">Leverage Promoters</h4>
            <p className="text-gray-600 text-sm">Ask for referrals, reviews, and case studies immediately. They are ready to advocate for you.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-yellow-700 mb-2">Activate Passives</h4>
            <p className="text-gray-600 text-sm">Offer exclusive upgrades or content to push them into the promoter category. They are price-sensitive.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-red-700 mb-2">Recover Detractors</h4>
            <p className="text-gray-600 text-sm">Reach out personally within 24 hours. Solving their specific issue can turn them into your biggest fans.</p>
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
