// components/dashboard/CompetitiveBenchmarks.tsx
'use client';

import React from 'react';
import { EnhancedAuditResults } from '@/types/enhanced-audit/enhanced-audit';

export default function CompetitiveBenchmarks({ results }: { results: EnhancedAuditResults }) {
  const { categoryScores, leadData } = results;
  const industry = leadData?.industry || 'E-commerce';

  const benchmarks = [
    {
      metric: 'Email Open Rate',
      icon: '📧',
      yourScore: 22,
      industryAvg: 18.5,
      topPerformers: 28,
      unit: '%',
      status: 'above',
      insight: 'You\'re performing 19% above industry average. Top performers achieve this through subject line A/B testing and send time optimization.'
    },
    {
      metric: 'Repeat Purchase Rate',
      icon: '🔄',
      yourScore: categoryScores.retention || 65,
      industryAvg: 27,
      topPerformers: 45,
      unit: '%',
      status: categoryScores.retention > 27 ? 'above' : 'below',
      insight: 'Industry leaders use loyalty programs and personalized recommendations to drive 45%+ repeat rates.'
    },
    {
      metric: 'Customer Lifetime Value',
      icon: '💰',
      yourScore: 12500,
      industryAvg: 8200,
      topPerformers: 18000,
      unit: '₹',
      status: 'above',
      insight: 'Your CLV is strong. Top performers focus on upselling, cross-selling, and subscription models to reach ₹18K+.'
    },
    {
      metric: 'Churn Rate',
      icon: '📉',
      yourScore: 35,
      industryAvg: 42,
      topPerformers: 18,
      unit: '%',
      status: 'above',
      inverse: true,
      insight: 'Lower is better. You\'re doing well vs. average. Best-in-class achieve <20% through proactive retention campaigns.'
    },
    {
      metric: 'Net Promoter Score',
      icon: '⭐',
      yourScore: 45,
      industryAvg: 32,
      topPerformers: 65,
      unit: '',
      status: 'above',
      insight: 'Solid NPS. Top performers (65+) create exceptional experiences and actively manage customer feedback loops.'
    },
    {
      metric: 'Average Order Value',
      icon: '🛒',
      yourScore: 2100,
      industryAvg: 1850,
      topPerformers: 3200,
      unit: '₹',
      status: 'above',
      insight: 'You\'re above average. Leaders use product bundling, free shipping thresholds, and upsell strategies to reach ₹3.2K+.'
    },
    {
      metric: 'Cart Abandonment Rate',
      icon: '🛍️',
      yourScore: 68,
      industryAvg: 72,
      topPerformers: 45,
      unit: '%',
      status: 'above',
      inverse: true,
      insight: 'Lower is better. Best practices: exit-intent popups, abandoned cart emails, and streamlined checkout reduce to 45%.'
    },
    {
      metric: 'Customer Acquisition Cost',
      icon: '💸',
      yourScore: 850,
      industryAvg: 920,
      topPerformers: 580,
      unit: '₹',
      status: 'above',
      inverse: true,
      insight: 'Lower is better. Top performers optimize through referral programs, organic content, and efficient ad targeting.'
    },
    {
      metric: 'Time to Second Purchase',
      icon: '⏱️',
      yourScore: 45,
      industryAvg: 52,
      topPerformers: 28,
      unit: 'days',
      status: 'above',
      inverse: true,
      insight: 'Lower is better. Leaders use post-purchase email sequences and personalized recommendations to reduce to <30 days.'
    }
  ];

  const getStatusColor = (status: string, inverse: boolean = false) => {
    const isGood = inverse ? status === 'below' : status === 'above';
    return isGood
      ? { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', icon: '✅' }
      : { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', icon: '⚠️' };
  };

  const calculatePercentile = (score: number, avg: number, top: number) => {
    if (score >= top) return 95;
    if (score <= avg * 0.7) return 25;
    const range = top - avg;
    const position = score - avg;
    return Math.round(50 + (position / range) * 45);
  };

  return (
    <div className="space-y-6 print:break-after">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
              <span className="text-2xl">📈</span>
            </div>
            <h2 className="text-3xl font-bold">Competitive Benchmarks</h2>
          </div>
          <p className="text-gray-300">
            How you compare to {industry} industry standards and top performers
          </p>
        </div>

        {/* Summary Cards */}
        <div className="p-8 border-b bg-gradient-to-br from-gray-50 to-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-md">
              <p className="text-sm text-gray-600 mb-2">Metrics Above Average</p>
              <p className="text-4xl font-black text-green-600">
                {benchmarks.filter(b => b.inverse ? b.yourScore < b.industryAvg : b.yourScore > b.industryAvg).length}
              </p>
              <p className="text-xs text-gray-500 mt-1">out of {benchmarks.length} tracked</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-md">
              <p className="text-sm text-gray-600 mb-2">Average Percentile</p>
              <p className="text-4xl font-black text-blue-600">
                {Math.round(benchmarks.reduce((sum, b) =>
                  sum + calculatePercentile(b.yourScore, b.industryAvg, b.topPerformers), 0) / benchmarks.length
                )}th
              </p>
              <p className="text-xs text-gray-500 mt-1">across all metrics</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-md">
              <p className="text-sm text-gray-600 mb-2">Gap to Top Performers</p>
              <p className="text-4xl font-black text-purple-600">
                {benchmarks.filter(b => {
                  const gap = b.inverse
                    ? ((b.yourScore - b.topPerformers) / b.topPerformers) * 100
                    : ((b.topPerformers - b.yourScore) / b.topPerformers) * 100;
                  return gap > 20;
                }).length}
              </p>
              <p className="text-xs text-gray-500 mt-1">significant opportunities</p>
            </div>
          </div>
        </div>

        {/* Benchmark Details */}
        <div className="p-8">
          <div className="space-y-6">
            {benchmarks.map((benchmark, idx) => {
              const colors = getStatusColor(benchmark.status, benchmark.inverse);
              const percentile = calculatePercentile(benchmark.yourScore, benchmark.industryAvg, benchmark.topPerformers);

              return (
                <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-all">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{benchmark.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{benchmark.metric}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${colors.bg} ${colors.text} ${colors.border} mt-1`}>
                          {colors.icon} {benchmark.inverse
                            ? (benchmark.yourScore < benchmark.industryAvg ? 'Above Average' : 'Below Average')
                            : (benchmark.yourScore > benchmark.industryAvg ? 'Above Average' : 'Below Average')
                          }
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Your Percentile</p>
                      <p className="text-2xl font-black text-blue-600">{percentile}th</p>
                    </div>
                  </div>

                  {/* Comparison Bars */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold text-gray-900">Your Score</span>
                        <span className="font-bold text-blue-600">
                          {benchmark.unit === '₹' ? '₹' : ''}{benchmark.yourScore.toLocaleString('en-IN')}{benchmark.unit !== '₹' ? benchmark.unit : ''}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                          style={{ width: `${Math.min(100, (benchmark.yourScore / benchmark.topPerformers) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Industry Average</span>
                        <span className="text-gray-700">
                          {benchmark.unit === '₹' ? '₹' : ''}{benchmark.industryAvg.toLocaleString('en-IN')}{benchmark.unit !== '₹' ? benchmark.unit : ''}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-400 h-2 rounded-full"
                          style={{ width: `${Math.min(100, (benchmark.industryAvg / benchmark.topPerformers) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Top Performers</span>
                        <span className="text-green-700 font-semibold">
                          {benchmark.unit === '₹' ? '₹' : ''}{benchmark.topPerformers.toLocaleString('en-IN')}{benchmark.unit !== '₹' ? benchmark.unit : ''}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-full" />
                      </div>
                    </div>
                  </div>

                  {/* Insight */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-xs text-blue-900">
                      <span className="font-bold">💡 Insight:</span> {benchmark.insight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Insight */}
        <div className="px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <p className="font-bold text-lg mb-2">Competitive Positioning</p>
              <p className="text-cyan-100 text-sm leading-relaxed">
                You're performing above average in {benchmarks.filter(b => b.inverse ? b.yourScore < b.industryAvg : b.yourScore > b.industryAvg).length} out of {benchmarks.length} key metrics.
                Focus on closing the gap to top performers in high-impact areas like repeat purchase rate and customer lifetime value to gain competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
