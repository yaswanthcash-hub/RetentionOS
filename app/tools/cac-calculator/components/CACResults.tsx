'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumCard } from '@/components/ui/PremiumCard';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { PremiumHeroCard } from '@/components/ui/PremiumHeroCard';

interface CACResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function CACResults({ results, onReset }: CACResultsProps) {
  const {
    cac,
    totalMarketingSpend,
    newCustomersAcquired,
    marketingSpendPerChannel,
    averageOrderValue,
    ltv,
    ltvCacRatio,
    paybackMonths,
    profitMargin,
    currency: resultCurrency
  } = results;

  // Determine health status based on LTV:CAC ratio
  let healthStatus = 'Unknown';
  let healthColor = 'text-gray-600';

  if (ltvCacRatio) {
    if (ltvCacRatio >= 4) {
      healthStatus = 'Excellent';
      healthColor = 'text-green-600';
    } else if (ltvCacRatio >= 3) {
      healthStatus = 'Good';
      healthColor = 'text-blue-600';
    } else if (ltvCacRatio >= 1.5) {
      healthStatus = 'Fair';
      healthColor = 'text-yellow-600';
    } else {
      healthStatus = 'Needs Improvement';
      healthColor = 'text-red-600';
    }
  }

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">CAC Analysis</h2>
          <p className="text-gray-500 mt-1">Based on {newCustomersAcquired.toLocaleString()} new customers</p>
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
        {/* CAC Card */}
        <PremiumHeroCard
          title="Customer Acquisition Cost"
          value={formatCurrency(cac, resultCurrency)}
          subtext="Per customer"
          icon="💵"
        />

        {/* LTV:CAC Ratio Card (if available) */}
        {ltvCacRatio ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="text-6xl">⚖️</span>
            </div>
            <div>
              <p className="text-gray-500 font-medium mb-2">LTV:CAC Ratio</p>
              <h3 className="text-5xl font-bold text-gray-900 mb-2">
                {ltvCacRatio.toFixed(1)}:1
              </h3>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className={`text-lg font-bold ${healthColor}`}>
                {healthStatus}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-2">LTV:CAC Ratio</p>
              <p className="text-gray-500 text-sm">Add AOV and frequency to calculate</p>
            </div>
          </div>
        )}
      </div>

      {/* Marketing Spend Breakdown */}
      <PremiumCard title="Marketing Spend by Channel" className="mb-10">
        <div className="space-y-4">
          {marketingSpendPerChannel.map((channel: any, index: number) => {
            const percentage = (channel.amount / totalMarketingSpend) * 100;
            return (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-900">{channel.channel}</span>
                  <span className="font-bold text-gray-900">{formatCurrency(channel.amount, resultCurrency)}</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#D1F25E] h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of total spend</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="font-bold text-gray-900">Total Marketing Spend</span>
            <span className="font-bold text-gray-900">{formatCurrency(totalMarketingSpend, resultCurrency)}</span>
          </div>
        </div>
      </PremiumCard>

      {/* Advanced Metrics (if available) */}
      {(ltv || paybackMonths) && (
        <PremiumCard title="Advanced Metrics" className="mb-10">
          <div className="grid md:grid-cols-3 gap-6">
            {ltv && (
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800 font-bold mb-1">Customer Lifetime Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(ltv, resultCurrency)}</p>
              </div>
            )}
            {paybackMonths && (
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
                <p className="text-sm text-purple-800 font-bold mb-1">Payback Period</p>
                <p className="text-2xl font-bold text-gray-900">{paybackMonths.toFixed(1)} months</p>
              </div>
            )}
            {averageOrderValue && (
              <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-green-800 font-bold mb-1">Average Order Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageOrderValue, resultCurrency)}</p>
              </div>
            )}
          </div>
        </PremiumCard>
      )}

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Optimization Strategies
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Channel Optimization</h4>
            <p className="text-gray-600 text-sm">Identify your most cost-effective channels and reallocate budget from underperforming ones.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Conversion Rate Improvement</h4>
            <p className="text-gray-600 text-sm">Improving your conversion rate by 10% can reduce CAC by the same percentage without changing spend.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Organic Growth</h4>
            <p className="text-gray-600 text-sm">Invest in SEO, content marketing, and referral programs to acquire customers at lower cost over time.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Target Ratio</h4>
            <p className="text-gray-600 text-sm">Aim for an LTV:CAC ratio of at least 3:1 (ideally 4:1+) and a payback period under 12 months.</p>
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
