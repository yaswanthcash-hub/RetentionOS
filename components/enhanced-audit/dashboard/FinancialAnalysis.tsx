// components/dashboard/FinancialAnalysis.tsx
'use client';

import React, { useState } from 'react';
import { EnhancedAuditResults } from '@/types/enhanced-audit/enhanced-audit';
import { formatCurrency } from '@/lib/utils';

interface FinancialAnalysisProps {
  results: EnhancedAuditResults;
}

export default function FinancialAnalysis({ results }: FinancialAnalysisProps) {
  const { financialAnalysis, leadData } = results;
  const [selectedTimeframe, setSelectedTimeframe] = useState<12 | 24 | 36>(12);

  const projection = financialAnalysis.revenueProjection.slice(0, selectedTimeframe);

  return (
    <div className="space-y-6 print:break-after">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-white">
          <h2 className="text-3xl font-bold mb-2">💰 Financial Analysis</h2>
          <p className="text-green-100">
            Revenue opportunity analysis and projected financial impact
          </p>
        </div>

        {/* Current vs Target Metrics */}
        <div className="p-8 border-b bg-gradient-to-br from-gray-50 to-white">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Current Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              label="Customer Lifetime Value"
              current={financialAnalysis.currentMetrics.currentCLV}
              target={financialAnalysis.currentMetrics.targetCLV}
              format="currency"
              icon="💎"
            />
            <MetricCard
              label="CAC Ratio"
              current={financialAnalysis.currentMetrics.cacRatio}
              target={financialAnalysis.currentMetrics.cacRatio * 1.3}
              format="ratio"
              icon="📊"
            />
            <MetricCard
              label="Retention Rate"
              current={financialAnalysis.currentMetrics.retentionRate}
              target={Math.min(85, financialAnalysis.currentMetrics.retentionRate + 15)}
              format="percentage"
              icon="🔒"
            />
          </div>
        </div>

        {/* Opportunity Summary */}
        <div className="p-8 border-b bg-green-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Total Revenue Opportunity
              </h3>
              <p className="text-gray-600">
                Based on comprehensive analysis of {results.opportunities.length} identified opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                <p className="text-sm font-medium text-gray-600 mb-2">Monthly Impact</p>
                <p className="text-4xl font-bold text-green-600 mb-1">
                  {formatCurrency(financialAnalysis.opportunityAnalysis.totalMonthlyOpportunity)}
                </p>
                <p className="text-sm text-gray-500">
                  +{((financialAnalysis.opportunityAnalysis.totalMonthlyOpportunity / leadData.monthlyRevenue) * 100).toFixed(1)}% lift
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                <p className="text-sm font-medium text-gray-600 mb-2">Annual Impact</p>
                <p className="text-4xl font-bold text-green-600 mb-1">
                  {formatCurrency(financialAnalysis.opportunityAnalysis.totalAnnualOpportunity)}
                </p>
                <p className="text-sm text-gray-500">
                  Year 1 revenue increase
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                <p className="text-sm font-medium text-gray-600 mb-2">3-Year Value</p>
                <p className="text-4xl font-bold text-blue-600 mb-1">
                  {formatCurrency(financialAnalysis.opportunityAnalysis.totalThreeYearValue)}
                </p>
                <p className="text-sm text-gray-500">
                  Cumulative impact
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Analysis */}
        <div className="p-8 border-b">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Investment & ROI Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">Required Investment</p>
              <p className="text-3xl font-bold text-blue-900">
                {formatCurrency(financialAnalysis.opportunityAnalysis.requiredInvestment)}
              </p>
              <p className="text-xs text-blue-700 mt-2">
                Implementation costs
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <p className="text-sm font-medium text-purple-900 mb-2">Net ROI</p>
              <p className="text-3xl font-bold text-purple-900">
                {financialAnalysis.opportunityAnalysis.netROI.toFixed(0)}%
              </p>
              <p className="text-xs text-purple-700 mt-2">
                First year return
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <p className="text-sm font-medium text-green-900 mb-2">Break-Even</p>
              <p className="text-3xl font-bold text-green-900">
                {financialAnalysis.opportunityAnalysis.breakEvenMonths}mo
              </p>
              <p className="text-xs text-green-700 mt-2">
                Payback period
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
              <p className="text-sm font-medium text-yellow-900 mb-2">Monthly Gain</p>
              <p className="text-3xl font-bold text-yellow-900">
                {formatCurrency(financialAnalysis.opportunityAnalysis.totalMonthlyOpportunity)}
              </p>
              <p className="text-xs text-yellow-700 mt-2">
                After implementation
              </p>
            </div>
          </div>
        </div>

        {/* Revenue Projection Chart */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Revenue Projection</h3>
            <div className="flex gap-2">
              {([12, 24, 36] as const).map((months) => (
                <button
                  key={months}
                  onClick={() => setSelectedTimeframe(months)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTimeframe === months
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {months} Months
                </button>
              ))}
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-3">
            {projection.filter((_, i) => i % (selectedTimeframe === 36 ? 3 : 1) === 0).map((month) => {
              const maxRevenue = Math.max(...projection.map(m => m.optimized));
              const baselineWidth = (month.baseline / maxRevenue) * 100;
              const optimizedWidth = (month.optimized / maxRevenue) * 100;

              return (
                <div key={month.month} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">Month {month.month}</span>
                    <span className="text-gray-600">
                      +{formatCurrency(month.incremental)} ({((month.incremental / month.baseline) * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-blue-200 flex items-center justify-end pr-2"
                      style={{ width: `${baselineWidth}%` }}
                    >
                      <span className="text-xs font-medium text-blue-800">
                        {formatCurrency(month.baseline)}
                      </span>
                    </div>
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-end pr-2"
                      style={{ width: `${optimizedWidth}%` }}
                    >
                      <span className="text-xs font-bold text-white">
                        {formatCurrency(month.optimized)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200 rounded"></div>
              <span className="text-sm text-gray-600">Current Baseline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Optimized Revenue</span>
            </div>
          </div>
        </div>

        {/* Bottom Insight */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💡</span>
            <div>
              <p className="font-bold text-lg mb-2">CFO Perspective</p>
              <p className="text-blue-100 text-sm leading-relaxed">
                This analysis represents a conservative estimate based on industry benchmarks and your current
                performance. Actual results may exceed projections with proper execution. The {formatCurrency(financialAnalysis.opportunityAnalysis.requiredInvestment)} investment
                delivers a {financialAnalysis.opportunityAnalysis.netROI.toFixed(0)}% first-year return, significantly outperforming
                alternative marketing investments which typically yield 150-250% ROI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  current: number;
  target: number;
  format: 'currency' | 'percentage' | 'ratio';
  icon: string;
}

function MetricCard({ label, current, target, format, icon }: MetricCardProps) {
  const formatValue = (value: number) => {
    if (format === 'currency') return formatCurrency(value);
    if (format === 'percentage') return `${value.toFixed(1)}%`;
    return `${value.toFixed(1)}:1`;
  };

  const improvement = ((target - current) / current) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 mb-1">Current</p>
          <p className="text-2xl font-bold text-gray-900">{formatValue(current)}</p>
        </div>

        <div className="pt-3 border-t">
          <p className="text-xs text-gray-500 mb-1">Target</p>
          <p className="text-2xl font-bold text-green-600">{formatValue(target)}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Potential Lift</span>
          <span className="font-bold text-green-600">+{improvement.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}
