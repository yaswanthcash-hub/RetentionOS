'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface CohortAnalysisResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function CohortAnalysisResults({ results, currency, onReset }: CohortAnalysisResultsProps) {
  const {
    retention_month_1,
    retention_month_3,
    retention_month_6,
    retention_month_12,
    churn_month_1,
    churn_month_12,
    cohort_size,
    month_0,
    month_1,
    month_3,
    month_6,
    month_12,
    health_status,
    health_color
  } = results;

  const retentionData = [
    { month: 0, rate: 100, count: month_0 },
    { month: 1, rate: retention_month_1, count: month_1 },
    { month: 3, rate: retention_month_3, count: month_3 },
    { month: 6, rate: retention_month_6, count: month_6 },
    { month: 12, rate: retention_month_12, count: month_12 },
  ];

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Retention Analysis</h2>
          <p className="text-gray-500 mt-1">Cohort Size: {cohort_size.toLocaleString()} customers</p>
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
        {/* Long-term Retention Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">📅</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Month 12 Retention</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {retention_month_12.toFixed(1)}%
            </span>
          </div>
          <p className={`text-lg font-bold mt-2 ${health_color.includes('green') ? 'text-green-400' :
            health_color.includes('blue') ? 'text-blue-400' :
              health_color.includes('yellow') ? 'text-yellow-400' :
                'text-red-400'
            }`}>
            {health_status}
          </p>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${health_color.includes('green') ? 'bg-green-400' :
                health_color.includes('blue') ? 'bg-blue-400' :
                  health_color.includes('yellow') ? 'bg-yellow-400' :
                    'bg-red-400'
                }`}
              style={{ width: `${Math.min(Math.max(retention_month_12, 0), 100)}%` }}
            />
          </div>
        </div>

        {/* Early Churn Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">📉</span>
          </div>
          <p className="text-gray-500 font-medium mb-2">Month 1 Churn</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-red-500">
              {churn_month_1.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Lost {cohort_size - month_1} customers in the first month
          </p>
        </div>
      </div>

      {/* Retention Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-10">
        <div className="p-8 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Retention Curve Data</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Milestone</th>
                <th className="px-6 py-4">Active Customers</th>
                <th className="px-6 py-4">Retention Rate</th>
                <th className="px-6 py-4">Drop-off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {retentionData.map((data, index) => {
                const prevCount = index > 0 ? retentionData[index - 1].count : data.count;
                const dropOff = prevCount - data.count;
                return (
                  <tr key={data.month} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">Month {data.month}</td>
                    <td className="px-6 py-4 text-gray-600">{data.count.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${data.rate >= 80 ? 'bg-green-100 text-green-800' :
                        data.rate >= 50 ? 'bg-blue-100 text-blue-800' :
                          data.rate >= 30 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {data.rate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-red-500">
                      {index > 0 ? `-${dropOff.toLocaleString()}` : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Retention Strategies
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Fix the "Leaky Bucket"</h4>
            <p className="text-gray-600 text-sm">If Month 1 drop-off is high ({churn_month_1.toFixed(1)}%), focus on onboarding. Ensure users find value in the first 30 days.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Engagement Loops</h4>
            <p className="text-gray-600 text-sm">Build habits. Use push notifications, emails, or in-app messages to bring users back during Month 1-3.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Long-term Value</h4>
            <p className="text-gray-600 text-sm">For Month 6+ retention, focus on product depth. Introduce advanced features or new use cases to keep veterans engaged.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Resurrection</h4>
            <p className="text-gray-600 text-sm">Target users who dropped off between Month 3 and 6 with "We miss you" campaigns and product updates.</p>
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
