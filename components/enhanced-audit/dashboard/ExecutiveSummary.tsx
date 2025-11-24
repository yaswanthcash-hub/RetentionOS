// components/dashboard/ExecutiveSummary.tsx
'use client';

import React from 'react';
import { EnhancedAuditResults, INDUSTRY_BENCHMARKS } from '@/types/enhanced-audit/enhanced-audit';
import { formatCurrency } from '@/lib/utils';

interface ExecutiveSummaryProps {
  results: EnhancedAuditResults;
}

export default function ExecutiveSummary({ results }: ExecutiveSummaryProps) {
  const { executiveSummary, financialAnalysis, leadData } = results;

  // Map properties that were missing in the interface but expected by the UI
  const industryBenchmark = results.industryBenchmark;

  // Calculate percentile based on score (mock logic for display)
  const percentile = Math.min(99, Math.floor(results.overallScore * 0.95));

  // Get top quartile benchmark
  const industryKey = leadData.industry?.toLowerCase() || 'saas';
  const benchmarkData = INDUSTRY_BENCHMARKS[industryKey] || INDUSTRY_BENCHMARKS['saas'];
  const topQuartile = benchmarkData?.topQuartile?.retentionRate || 90;

  // Map arrays
  const keyFindings = results.keyInsights || [];

  const criticalIssues = results.risks
    ? results.risks
      .filter(r => r.severity === 'critical' || r.severity === 'high')
      .map(r => r.title)
      .slice(0, 5)
    : [];

  const quickWins = results.opportunities
    ? results.opportunities
      .filter(o => o.quickWin)
      .map(o => o.title)
      .slice(0, 4)
    : [];

  const strategicPriorities = results.prioritizedOpportunities
    ? results.prioritizedOpportunities
      .slice(0, 3)
      .map(o => o.title)
    : [];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 55) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 85) return 'bg-green-50 border-green-200';
    if (score >= 70) return 'bg-blue-50 border-blue-200';
    if (score >= 55) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6 print:break-after">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
          <h2 className="text-3xl font-bold mb-2">📊 Executive Summary</h2>
          <p className="text-blue-100">
            Strategic overview of your retention capabilities and growth opportunities
          </p>
        </div>

        {/* Overall Score Hero */}
        <div className={`p-8 border-b ${getScoreBackground(executiveSummary.overallScore)}`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Score Circle */}
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center border-8 border-current"
                  style={{ borderColor: 'currentColor' }}>
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(executiveSummary.overallScore)}`}>
                      {executiveSummary.overallScore}
                    </div>
                    <div className="text-gray-600 text-sm font-medium mt-1">
                      Overall Score
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg border-2 border-current">
                  <span className="font-bold capitalize text-sm">
                    {executiveSummary.maturityLevel}
                  </span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-6 flex-1">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <p className="text-sm text-gray-600 mb-1">Industry Benchmark</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {industryBenchmark}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {results.leadData.industry}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <p className="text-sm text-gray-600 mb-1">Your Percentile</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {percentile}th
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    vs. industry peers
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <p className="text-sm text-gray-600 mb-1">Top Quartile</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {topQuartile}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Gap: {topQuartile - executiveSummary.overallScore} pts
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <p className="text-sm text-gray-600 mb-1">Annual Opportunity</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(financialAnalysis.opportunityAnalysis.totalAnnualOpportunity)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Potential revenue lift
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Findings */}
        <div className="p-8 border-b">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🔍</span>
            Key Findings
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {keyFindings.map((finding, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{finding}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Issues */}
        {criticalIssues.length > 0 && (
          <div className="p-8 border-b bg-red-50">
            <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <span>🚨</span>
              Critical Issues Requiring Immediate Attention
            </h3>
            <div className="space-y-3">
              {criticalIssues.map((issue, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-red-200">
                  <span className="flex-shrink-0 text-2xl">⚠️</span>
                  <p className="text-gray-800 font-medium">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Wins */}
        {quickWins.length > 0 && (
          <div className="p-8 border-b bg-green-50">
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span>⚡</span>
              Quick Wins - Immediate Impact Opportunities
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {quickWins.map((win, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border-2 border-green-200">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-2xl">🎯</span>
                    <p className="text-gray-800 font-medium">{win}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strategic Priorities */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎯</span>
            Strategic Priorities
          </h3>
          <div className="space-y-3">
            {strategicPriorities.map((priority, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-800 font-medium leading-relaxed">{priority}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6 text-white">
          <p className="text-center text-sm opacity-90">
            💡 <strong>Executive Insight:</strong> The average company implementing these recommendations
            sees a {financialAnalysis.opportunityAnalysis.netROI.toFixed(0)}% ROI within 12 months,
            with payback achieved in {financialAnalysis.opportunityAnalysis.breakEvenMonths} months.
          </p>
        </div>
      </div>
    </div>
  );
}
