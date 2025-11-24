'use client';

import React from 'react';
import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface RetentionCurveResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function RetentionCurveResults({ results, currency, onReset }: RetentionCurveResultsProps) {
  const {
    retention_1,
    retention_3,
    retention_6,
    retention_12,
    churn_1,
    churn_3,
    churn_6,
    churn_12,
    decay_rate,
    curve_shape,
    curve_description,
    curve_color,
    starting_customers,
    month_1,
    month_3,
    month_6,
    month_12
  } = results;

  const dataPoints = [
    { month: 0, rate: 100, count: starting_customers },
    { month: 1, rate: retention_1, count: month_1 },
    { month: 3, rate: retention_3, count: month_3 },
    { month: 6, rate: retention_6, count: month_6 },
    { month: 12, rate: retention_12, count: month_12 },
  ];

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Retention Curve Analysis</h2>
          <p className="text-gray-500 mt-1">Starting Cohort: {starting_customers.toLocaleString()} customers</p>
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
        {/* Curve Shape Card */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">📉</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Curve Shape</p>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-[#D1F25E]">
              {curve_shape}
            </span>
          </div>
          <p className={`text-lg font-bold mt-2 ${curve_color.includes('green') ? 'text-green-400' :
            curve_color.includes('blue') ? 'text-blue-400' :
              curve_color.includes('yellow') ? 'text-yellow-400' :
                'text-red-400'
            }`}>
            {curve_description}
          </p>
        </div>

        {/* Long-term Retention Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">⚓</span>
          </div>
          <p className="text-gray-500 font-medium mb-2">Month 12 Retention</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-gray-900">
              {retention_12.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {month_12.toLocaleString()} active customers remaining
          </p>
        </div>
      </div>

      {/* Visual Curve Representation */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
        <h3 className="font-bold text-gray-900 mb-6">Retention Decay Visualized</h3>
        <div className="relative h-64 flex items-end justify-between gap-2 md:gap-4 pb-8 border-b border-gray-200">
          {dataPoints.map((point, index) => (
            <div key={point.month} className="flex flex-col items-center justify-end h-full w-full group relative">
              <div
                className="w-full max-w-[80px] bg-gradient-to-t from-gray-900 to-gray-700 rounded-t-lg transition-all duration-500 hover:from-[#D1F25E] hover:to-[#b0d142] relative"
                style={{ height: `${point.rate}%` }}
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {point.count.toLocaleString()} Users
                </div>
              </div>
              <div className="absolute -bottom-8 text-center">
                <p className="text-sm font-bold text-gray-900">M{point.month}</p>
                <p className="text-xs text-gray-500">{point.rate.toFixed(0)}%</p>
              </div>
            </div>
          ))}

          {/* Background Grid Lines */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between text-xs text-gray-300">
            <div className="border-t border-dashed border-gray-200 w-full h-0"></div>
            <div className="border-t border-dashed border-gray-200 w-full h-0"></div>
            <div className="border-t border-dashed border-gray-200 w-full h-0"></div>
            <div className="border-t border-dashed border-gray-200 w-full h-0"></div>
            <div className="border-t border-dashed border-gray-200 w-full h-0"></div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Curve Optimization
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Flatten the Curve</h4>
            <p className="text-gray-600 text-sm">The goal is to reach a flat line where retention stabilizes. If it keeps dropping, you haven't found product-market fit yet.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Lift the Curve</h4>
            <p className="text-gray-600 text-sm">Improve the entire curve by enhancing the core product value. A higher starting point at Month 1 lifts everything that follows.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Early Drop-off</h4>
            <p className="text-gray-600 text-sm">High churn in Month 1-3 usually indicates poor onboarding or a mismatch between marketing promises and product reality.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Late Drop-off</h4>
            <p className="text-gray-600 text-sm">Churn after Month 6 suggests a lack of long-term utility. Introduce advanced features or new use cases for power users.</p>
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
