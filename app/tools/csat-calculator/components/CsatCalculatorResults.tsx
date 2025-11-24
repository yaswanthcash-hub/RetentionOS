'use client';

import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface CsatCalculatorResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function CsatCalculatorResults({ results, currency, onReset }: CsatCalculatorResultsProps) {
  const { csatScore, totalResponses, satisfiedCustomers, dissatisfiedCustomers } = results;

  // Determine health status
  let healthStatus = 'Unknown';
  let healthColor = 'text-gray-600';
  let healthBg = 'bg-gray-100';

  if (csatScore) {
    if (csatScore >= 80) {
      healthStatus = 'Excellent';
      healthColor = 'text-green-600';
      healthBg = 'bg-green-50';
    } else if (csatScore >= 70) {
      healthStatus = 'Good';
      healthColor = 'text-blue-600';
      healthBg = 'bg-blue-50';
    } else if (csatScore >= 60) {
      healthStatus = 'Average';
      healthColor = 'text-yellow-600';
      healthBg = 'bg-yellow-50';
    } else {
      healthStatus = 'Needs Improvement';
      healthColor = 'text-red-600';
      healthBg = 'bg-red-50';
    }
  }

  const satisfactionRate = csatScore || 0;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">CSAT Analysis</h2>
          <p className="text-gray-500 mt-1">Customer Satisfaction Score Results</p>
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
        {/* CSAT Hero Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">😊</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Customer Satisfaction Score</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {satisfactionRate.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Based on {totalResponses || 0} responses
          </p>
        </div>

        {/* Health Status Card */}
        <div className={`${healthBg} p-8 rounded-2xl border-2 ${healthColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">⭐</span>
          </div>
          <p className="text-gray-600 font-medium mb-2">Performance Rating</p>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl font-bold ${healthColor}`}>
              {healthStatus}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {satisfactionRate >= 80 ? 'Outstanding customer satisfaction' :
              satisfactionRate >= 70 ? 'Above average performance' :
                satisfactionRate >= 60 ? 'Meeting baseline expectations' :
                  'Immediate attention required'}
          </p>
        </div>
      </div>

      {/* Response Breakdown */}
      {(satisfiedCustomers !== undefined || dissatisfiedCustomers !== undefined) && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
          <h3 className="font-bold text-gray-900 mb-6 text-xl">Response Breakdown</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm text-green-800 font-bold mb-1">Satisfied</p>
              <p className="text-3xl font-bold text-gray-900">{satisfiedCustomers || 0}</p>
              <div className="mt-3 w-full bg-green-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#D1F25E] h-full rounded-full transition-all duration-500"
                  style={{ width: `${satisfactionRate}%` }}
                />
              </div>
            </div>
            <div className="p-6 bg-red-50 rounded-xl border border-red-100">
              <p className="text-sm text-red-800 font-bold mb-1">Dissatisfied</p>
              <p className="text-3xl font-bold text-gray-900">{dissatisfiedCustomers || 0}</p>
              <div className="mt-3 w-full bg-red-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-red-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${100 - satisfactionRate}%` }}
                />
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-600 font-bold mb-1">Total Responses</p>
              <p className="text-3xl font-bold text-gray-900">{totalResponses || 0}</p>
            </div>
          </div>
        </div>
      )}

      {/* Industry Benchmarks */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span> Industry Benchmarks
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Excellent (&gt;80%)</p>
            <p className="text-gray-600 text-sm mt-1">Top-tier customer satisfaction</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Good (70-80%)</p>
            <p className="text-gray-600 text-sm mt-1">Above average performance</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Average (60-70%)</p>
            <p className="text-gray-600 text-sm mt-1">Meeting baseline expectations</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Poor (&lt;60%)</p>
            <p className="text-gray-600 text-sm mt-1">Immediate improvement needed</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Improvement Strategies
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Follow Up Immediately</h4>
            <p className="text-gray-600 text-sm">Contact dissatisfied customers within 24 hours</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Analyze Feedback</h4>
            <p className="text-gray-600 text-sm">Look for recurring themes and common pain points</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Train Your Team</h4>
            <p className="text-gray-600 text-sm">Focus on empathy and effective problem resolution</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Set Expectations</h4>
            <p className="text-gray-600 text-sm">Clear communication prevents disappointment</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Celebrate Wins</h4>
            <p className="text-gray-600 text-sm">Share positive feedback with your team</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Close the Loop</h4>
            <p className="text-gray-600 text-sm">Let customers know how their feedback drove changes</p>
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
