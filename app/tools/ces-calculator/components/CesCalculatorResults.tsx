'use client';

import { PremiumCard } from '@/components/ui/PremiumCard';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { PremiumHeroCard } from '@/components/ui/PremiumHeroCard';

interface CesCalculatorResultsProps {
  results: any;
  currency: string;
  onReset: () => void;
}

export default function CesCalculatorResults({ results, onReset }: CesCalculatorResultsProps) {
  const {
    ces_score,
    average_score,
    low_effort,
    high_effort,
    high_effort_rate,
    total_responses,
    health_status,
    health_color,
    touchpoint,
    benchmark_target,
    benchmark_gap,
    distribution
  } = results;

  const touchpointLabel = {
    support: 'Customer Support',
    onboarding: 'Onboarding Process',
    checkout: 'Checkout Flow',
    product_usage: 'Product Usage',
    general: 'General Experience'
  }[touchpoint as string] || 'General Experience';

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Effort Analysis</h2>
          <p className="text-gray-500 mt-1">Analyzing {touchpointLabel} ({total_responses} responses)</p>
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
        {/* CES Score Card */}
        <PremiumHeroCard
          title="Customer Effort Score"
          value={`${ces_score.toFixed(1)}%`}
          subtext="Customers reporting Low Effort (5-7)"
          icon="😌"
          trend={benchmark_gap > 0 ? 'Above Benchmark' : 'Below Benchmark'}
          trendDirection={benchmark_gap > 0 ? 'up' : 'down'}
        />

        {/* Average Effort Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">📊</span>
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-2">Average Effort (1-7)</p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-gray-900">
                {average_score.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400">/ 7.0</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-500">Target: {benchmark_target.toFixed(1)}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${health_color.replace('text-', 'bg-').replace('600', '100')} ${health_color}`}>
                {health_status}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${average_score >= 6 ? 'bg-green-500' :
                    average_score >= 5 ? 'bg-blue-500' :
                      average_score >= 4 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                style={{ width: `${(average_score / 7) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right">Higher is better (Easier)</p>
          </div>
        </div>
      </div>

      {/* Effort Distribution Chart */}
      <PremiumCard title="Effort Distribution" className="mb-10">
        <div className="space-y-3">
          {[
            { score: 7, label: 'Very Easy', count: distribution.score_7, color: 'bg-green-600' },
            { score: 6, label: 'Easy', count: distribution.score_6, color: 'bg-green-500' },
            { score: 5, label: 'Somewhat Easy', count: distribution.score_5, color: 'bg-green-400' },
            { score: 4, label: 'Neutral', count: distribution.score_4, color: 'bg-gray-400' },
            { score: 3, label: 'Somewhat Difficult', count: distribution.score_3, color: 'bg-red-400' },
            { score: 2, label: 'Difficult', count: distribution.score_2, color: 'bg-red-500' },
            { score: 1, label: 'Very Difficult', count: distribution.score_1, color: 'bg-red-600' },
          ].map((item) => {
            const percentage = total_responses > 0 ? (item.count / total_responses) * 100 : 0;
            return (
              <div key={item.score} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-600">{item.label} ({item.score})</div>
                <div className="flex-1 h-8 bg-gray-50 rounded-lg overflow-hidden flex items-center relative">
                  <div
                    className={`h-full ${item.color} opacity-90`}
                    style={{ width: `${percentage}%` }}
                  />
                  <span className="absolute left-2 text-xs font-bold text-gray-700">
                    {item.count > 0 ? `${item.count} (${percentage.toFixed(1)}%)` : ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </PremiumCard>

      {/* Recommendations Section */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span> Recommendations for {touchpointLabel}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {average_score < benchmark_target ? (
            <>
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-red-600 mb-2">Reduce Friction Immediately</h4>
                <p className="text-gray-600 text-sm">Your score is below benchmark. Audit the {touchpointLabel} process step-by-step and remove at least 2 unnecessary fields or clicks.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Implement Self-Service</h4>
                <p className="text-gray-600 text-sm">High effort often comes from waiting. Add a knowledge base or chatbot to solve common issues instantly.</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-green-600 mb-2">Maintain Simplicity</h4>
                <p className="text-gray-600 text-sm">You are performing well. Monitor for any spikes in effort after product updates.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Shift to Delight</h4>
                <p className="text-gray-600 text-sm">Since effort is low, focus on adding "delight" moments to turn satisfied customers into promoters.</p>
              </div>
            </>
          )}

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Analyze "High Effort" Drivers</h4>
            <p className="text-gray-600 text-sm">Look at the {high_effort} responses rating 1-3. These are your churn risks. Follow up with them personally.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Benchmark Goal</h4>
            <p className="text-gray-600 text-sm">Aim for a CES of 80%+ (Low Effort) and an average score of {benchmark_target}+ for this touchpoint.</p>
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
