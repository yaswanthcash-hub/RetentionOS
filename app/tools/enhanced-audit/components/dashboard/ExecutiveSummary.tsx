// components/dashboard/ExecutiveSummary.tsx
'use client';

import React from 'react';
import { EnhancedAuditResults, INDUSTRY_BENCHMARKS } from '@/types/enhanced-audit/enhanced-audit';
import { formatCurrency } from '@/lib/utils';

interface ExecutiveSummaryProps {
  results: EnhancedAuditResults;
  currency: string;
}

export default function ExecutiveSummary({ results, currency }: ExecutiveSummaryProps) {
  const { executiveSummary, financialAnalysis, leadData } = results;

  const industryBenchmark = results.industryBenchmark;
  const percentile = Math.min(99, Math.floor(results.overallScore * 0.95));

  const industryKey = leadData.industry?.toLowerCase() || 'saas';
  const benchmarkData = INDUSTRY_BENCHMARKS[industryKey] || INDUSTRY_BENCHMARKS['saas'];
  const topQuartile = benchmarkData?.topQuartile?.retentionRate || 90;

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

  return (
    <div className="space-y-6 print:break-after">
      {/* Header - Premium Dark Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 py-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
              <span className="text-3xl">👔</span>
            </div>
            <div>
              <h2 className="text-4xl font-bold">Executive Summary</h2>
              <p className="text-gray-300 mt-1">Strategic overview of your retention performance</p>
            </div>
          </div>
        </div>

        {/* Overall Score Hero */}
        <div className="px-8 py-10 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Score Circle */}
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl font-bold" style={{ color: '#D1F25E' }}>
                      {executiveSummary.overallScore}
                    </div>
                    <div className="text-gray-300 text-sm font-medium mt-2">
                      Overall Score
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full shadow-lg" style={{ background: '#D1F25E' }}>
                  <span className="font-bold capitalize text-sm text-gray-900">
                    {executiveSummary.maturityLevel}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Industry Benchmark</p>
                  <p className="text-4xl font-bold text-gray-900">{industryBenchmark || 70}</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Your Percentile</p>
                  <p className="text-4xl font-bold text-gray-900">{percentile}th</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Top Quartile</p>
                  <p className="text-4xl font-bold text-gray-900">{topQuartile}</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Gap to Excellence</p>
                  <p className="text-4xl font-bold text-gray-900">{Math.max(0, topQuartile - executiveSummary.overallScore)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Impact - Premium Dark Card */}
      {financialAnalysis && (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10 rounded-2xl shadow-xl">
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="text-4xl">💰</span>
            Financial Impact Analysis
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl" style={{ background: 'rgba(209, 242, 94, 0.1)' }}>
              <p className="text-sm text-gray-400 mb-2">Current Annual Revenue</p>
              <p className="text-4xl font-bold" style={{ color: '#D1F25E' }}>
                {formatCurrency(financialAnalysis.currentAnnualRevenue || 0, currency)}
              </p>
            </div>
            <div className="p-6 rounded-xl" style={{ background: 'rgba(209, 242, 94, 0.1)' }}>
              <p className="text-sm text-gray-400 mb-2">Revenue at Risk</p>
              <p className="text-4xl font-bold text-red-400">
                {formatCurrency(financialAnalysis.revenueAtRisk || 0, currency)}
              </p>
            </div>
            <div className="p-6 rounded-xl" style={{ background: 'rgba(209, 242, 94, 0.1)' }}>
              <p className="text-sm text-gray-400 mb-2">Opportunity Value</p>
              <p className="text-4xl font-bold" style={{ color: '#D1F25E' }}>
                {formatCurrency(financialAnalysis.totalOpportunityValue || 0, currency)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Key Findings */}
      {keyFindings.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <span className="text-3xl">🔍</span>
            Key Findings
          </h3>
          <div className="space-y-4">
            {keyFindings.map((finding, index) => (
              <div key={index} className="p-5 bg-gray-50 rounded-xl border-l-4" style={{ borderColor: '#D1F25E' }}>
                <p className="text-gray-900 font-medium">{finding}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical Issues */}
      {criticalIssues.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            Critical Issues Requiring Attention
          </h3>
          <div className="space-y-3">
            {criticalIssues.map((issue, index) => (
              <div key={index} className="p-5 bg-red-50 rounded-xl border-l-4 border-red-500">
                <p className="text-gray-900 font-medium">{issue}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Wins & Strategic Priorities */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Wins */}
        {quickWins.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              Quick Wins
            </h3>
            <div className="space-y-3">
              {quickWins.map((win, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <p className="text-gray-900 text-sm font-medium">{win}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strategic Priorities */}
        {strategicPriorities.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              Strategic Priorities
            </h3>
            <div className="space-y-3">
              {strategicPriorities.map((priority, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-900 text-sm font-medium">{priority}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Maturity Assessment */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="text-3xl">📈</span>
          Retention Maturity Level: <span style={{ color: '#D1F25E' }}>{executiveSummary.maturityLevel}</span>
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed">
          {executiveSummary.maturityLevel === 'advanced' &&
            'Your organization demonstrates sophisticated retention capabilities with data-driven strategies and strong execution.'}
          {executiveSummary.maturityLevel === 'intermediate' &&
            'You have established retention fundamentals but significant opportunities exist for optimization and growth.'}
          {executiveSummary.maturityLevel === 'beginner' &&
            'Your retention strategy is in early stages. Focus on building foundational capabilities and quick wins.'}
        </p>
      </div>
    </div>
  );
}
