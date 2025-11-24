'use client';

import React from 'react';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface RetentionRateResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function RetentionRateResults({ results, currency, onReset }: RetentionRateResultsProps) {
  const {
    retention_rate,
    churn_rate,
    customers_retained,
    growth_rate,
    health_status,
    health_color,
    customers_start,
    customers_end,
    new_customers
  } = results;

  // Generate simulated cohort data based on the calculated retention rate
  // We'll simulate 6 cohorts over 6 months
  const cohorts = Array.from({ length: 6 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - i);
    const monthName = month.toLocaleString('default', { month: 'short' });

    // Simulate decay: Month 0 = 100%, Month 1 = Retention Rate, then slight decay
    const decay = [100];
    let currentRate = 100;
    for (let j = 1; j < 6; j++) {
      // Apply the calculated retention rate, but add some realistic "curve" (retention usually stabilizes)
      // If retention is 90%, it means 10% churn. 
      // Month 1: 100% * 90% = 90%
      // Month 2: 90% * 92% (churn slows down) = 82.8%
      const periodChurn = (100 - retention_rate) / 100;
      // Reduce churn by 10% each month to simulate stabilization
      const adjustedChurn = periodChurn * Math.pow(0.9, j - 1);
      currentRate = currentRate * (1 - adjustedChurn);
      decay.push(Math.max(currentRate, 0));
    }
    return { name: monthName, values: decay };
  });

  const getHeatmapColor = (value: number) => {
    if (value >= 90) return 'bg-[#1F2937] text-white'; // Charcoal (Brand)
    if (value >= 75) return 'bg-[#374151] text-white';
    if (value >= 50) return 'bg-[#4B5563] text-white';
    if (value >= 25) return 'bg-[#9CA3AF] text-gray-900';
    return 'bg-[#E5E7EB] text-gray-500';
  };

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Retention Analysis</h2>
          <p className="text-gray-500 mt-1">Performance snapshot for this period</p>
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
        {/* Retention Rate Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">🔄</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Customer Retention Rate</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-[#D1F25E]">
              {retention_rate.toFixed(1)}%
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gray-800 text-white border border-gray-700`}>
              {health_status}
            </span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-[#D1F25E] h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(retention_rate, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-4">
            You retained {customers_retained.toLocaleString()} out of {customers_start.toLocaleString()} original customers.
          </p>
        </div>

        {/* Churn & Growth Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm grid grid-rows-2 gap-6">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium mb-1">Churn Rate</p>
                <p className="text-3xl font-bold text-gray-900">{churn_rate.toFixed(1)}%</p>
              </div>
              <span className="text-2xl">📉</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Inverse of retention rate</p>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium mb-1">Net Growth Rate</p>
                <p className={`text-3xl font-bold ${growth_rate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {growth_rate > 0 ? '+' : ''}{growth_rate.toFixed(1)}%
                </p>
              </div>
              <span className="text-2xl">📈</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Total customer base change</p>
          </div>
        </div>
      </div>

      {/* Cohort Heatmap Visualization */}
      <div className="mb-12 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">🔥</span> Projected Cohort Performance
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Based on your {retention_rate.toFixed(1)}% retention rate, here is how your cohorts likely decay over 6 months.
            </p>
          </div>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded-full">Simulated</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium">Cohort</th>
                <th className="px-4 py-3 text-center">Month 0</th>
                <th className="px-4 py-3 text-center">Month 1</th>
                <th className="px-4 py-3 text-center">Month 2</th>
                <th className="px-4 py-3 text-center">Month 3</th>
                <th className="px-4 py-3 text-center">Month 4</th>
                <th className="px-4 py-3 text-center">Month 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cohorts.map((cohort, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                    {cohort.name}
                  </td>
                  {cohort.values.map((val, j) => (
                    <td key={j} className="px-2 py-2 text-center">
                      <div className={`w-12 h-8 mx-auto flex items-center justify-center rounded-md text-xs font-bold ${getHeatmapColor(val)}`}>
                        {val.toFixed(0)}%
                      </div>
                    </td>
                  ))}
                  {/* Fill remaining cells if cohort is younger than 6 months (simulated as full for now for visual density) */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Benchmarks Section */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Industry Benchmarks (Annual)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <p className="text-blue-900 font-bold text-lg">~90%</p>
            <p className="text-blue-600 text-sm">Enterprise SaaS</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
            <p className="text-indigo-900 font-bold text-lg">~60%</p>
            <p className="text-indigo-600 text-sm">SMB SaaS</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-center">
            <p className="text-purple-900 font-bold text-lg">~30%</p>
            <p className="text-purple-600 text-sm">E-commerce</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-xl border border-pink-100 text-center">
            <p className="text-pink-900 font-bold text-lg">~20%</p>
            <p className="text-pink-600 text-sm">Mobile Apps</p>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> How to Improve Retention
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-900 mb-2">Optimize Onboarding</h4>
            <p className="text-gray-600 text-sm">Ensure new customers reach their "Aha!" moment quickly. The first 30 days are critical for long-term retention.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-900 mb-2">Proactive Support</h4>
            <p className="text-gray-600 text-sm">Don't wait for complaints. Reach out to customers who show signs of disengagement or declining usage.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-900 mb-2">Feedback Loops</h4>
            <p className="text-gray-600 text-sm">Regularly collect NPS and CSAT scores. Act on negative feedback immediately to prevent churn.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-900 mb-2">Loyalty Programs</h4>
            <p className="text-gray-600 text-sm">Reward long-term customers. A simple "thank you" or exclusive perk can significantly boost loyalty.</p>
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
