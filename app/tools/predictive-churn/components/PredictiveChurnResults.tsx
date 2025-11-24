'use client';

import { formatCurrency } from '@/components/CurrencySelector';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface PredictiveChurnResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function PredictiveChurnResults({ results, currency, onReset }: PredictiveChurnResultsProps) {
  const { churnProbability, riskLevel, customersAtRisk, potentialRevenueLoss, churnScore } = results;

  // Determine risk status
  let riskStatus = 'Unknown';
  let riskColor = 'text-gray-600';
  let riskBg = 'bg-gray-100';

  if (churnProbability !== undefined) {
    if (churnProbability >= 50) {
      riskStatus = 'High Risk';
      riskColor = 'text-red-600';
      riskBg = 'bg-red-50';
    } else if (churnProbability >= 20) {
      riskStatus = 'Medium Risk';
      riskColor = 'text-yellow-600';
      riskBg = 'bg-yellow-50';
    } else {
      riskStatus = 'Low Risk';
      riskColor = 'text-green-600';
      riskBg = 'bg-green-50';
    }
  }

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Predictive Churn Analysis</h2>
          <p className="text-gray-500 mt-1">Customer retention risk assessment</p>
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
        {/* Churn Probability Hero Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="text-6xl">⚠️</span>
          </div>
          <p className="text-gray-400 font-medium mb-2">Churn Probability</p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold text-[#D1F25E]">
              {churnProbability !== undefined ? `${churnProbability.toFixed(1)}%` : 'N/A'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Likelihood of customer churn
          </p>
        </div>

        {/* Risk Level Card */}
        <div className={`${riskBg} p-8 rounded-2xl border-2 ${riskColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">🎯</span>
          </div>
          <p className="text-gray-600 font-medium mb-2">Risk Assessment</p>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl font-bold ${riskColor}`}>
              {riskStatus}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {churnProbability >= 50 ? 'Immediate intervention required' :
              churnProbability >= 20 ? 'Monitor and engage proactively' :
                'Healthy retention outlook'}
          </p>
        </div>
      </div>

      {/* Impact Metrics */}
      {(customersAtRisk !== undefined || potentialRevenueLoss !== undefined) && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
          <h3 className="font-bold text-gray-900 mb-6 text-xl">Churn Impact</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {customersAtRisk !== undefined && (
              <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                <p className="text-sm text-red-800 font-bold mb-1">Customers at Risk</p>
                <p className="text-4xl font-bold text-gray-900">{customersAtRisk}</p>
                <div className="mt-3 w-full bg-red-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(churnProbability || 0, 100)}%` }}
                  />
                </div>
              </div>
            )}
            {potentialRevenueLoss !== undefined && (
              <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
                <p className="text-sm text-orange-800 font-bold mb-1">Potential Revenue Loss</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(potentialRevenueLoss, currency)}</p>
                <p className="text-xs text-gray-600 mt-2">If churn occurs</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Churn Score Breakdown */}
      {churnScore && typeof churnScore === 'object' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
          <h3 className="font-bold text-gray-900 mb-6 text-xl">Risk Factors</h3>
          <div className="space-y-4">
            {Object.entries(churnScore).map(([factor, score]: [string, any]) => (
              <div key={factor}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-900 capitalize">{factor.replace(/_/g, ' ')}</span>
                  <span className="font-bold text-gray-900">{typeof score === 'number' ? score.toFixed(0) : score}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${typeof score === 'number' && score >= 70 ? 'bg-red-500' :
                      typeof score === 'number' && score >= 40 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                    style={{ width: `${typeof score === 'number' ? Math.min(score, 100) : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Industry Benchmarks */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">📊</span> Risk Thresholds
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-red-100 shadow-sm">
            <p className="font-bold text-red-600">High Risk (&gt;50%)</p>
            <p className="text-gray-600 text-sm mt-1">Immediate retention action needed</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-yellow-100 shadow-sm">
            <p className="font-bold text-yellow-600">Medium Risk (20-50%)</p>
            <p className="text-gray-600 text-sm mt-1">Proactive engagement required</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-green-100 shadow-sm">
            <p className="font-bold text-green-600">Low Risk (&lt;20%)</p>
            <p className="text-gray-600 text-sm mt-1">Healthy retention status</p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
            <p className="font-bold text-gray-900">Model Accuracy</p>
            <p className="text-gray-600 text-sm mt-1">Target &gt;80% prediction accuracy</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Retention Strategies
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Early Intervention</h4>
            <p className="text-gray-600 text-sm">Contact high-risk customers proactively</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Identify Root Causes</h4>
            <p className="text-gray-600 text-sm">Analyze key churn drivers (features, support, pricing)</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Personalized Offers</h4>
            <p className="text-gray-600 text-sm">Tailor retention campaigns by risk level</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Monitor Trends</h4>
            <p className="text-gray-600 text-sm">Track risk score changes over time</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Validate Predictions</h4>
            <p className="text-gray-600 text-sm">Compare predictions with actual churn</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Success Metrics</h4>
            <p className="text-gray-600 text-sm">Measure intervention effectiveness</p>
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
