'use client';

// app/tools/retention-audit/components/ResultsDashboard.tsx
import { AuditResults } from '@/types/audit';
import { formatCurrency } from '@/lib/utils';

interface ResultsDashboardProps {
  results: AuditResults;
}

export default function ResultsDashboard({ results }: ResultsDashboardProps) {
  const {
    overallScore,
    industryBenchmark,
    percentile,
    lifecycleScores,
    topOpportunities,
    totalMonthlyOpportunity,
    totalAnnualOpportunity,
    currency = 'INR',
    leadData,
  } = results;

  const scoreStatus = overallScore >= (industryBenchmark || 70) ? 'above' : 'below';

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
      {/* Header - Premium Dark Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Your Retention Health Report</h1>
          {leadData && (
            <p className="text-xl text-gray-300">
              {leadData.company} • {leadData.industry}
            </p>
          )}
        </div>
      </div>

      {/* Overall Score Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 mb-6">
            <div className="text-center">
              <div className="text-7xl font-bold" style={{ color: '#D1F25E' }}>{overallScore}</div>
              <div className="text-gray-300 text-sm mt-2">Overall Score</div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Retention Health Score</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-2">Your Score</p>
            <p className="text-4xl font-bold text-gray-900">{overallScore}</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-2">Industry Benchmark</p>
            <p className="text-4xl font-bold text-gray-900">{industryBenchmark || 70}</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-2">Your Percentile</p>
            <p className="text-4xl font-bold text-gray-900">{percentile || 50}th</p>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${scoreStatus === 'above' ? 'bg-green-50 border-2 border-green-200' : 'bg-amber-50 border-2 border-amber-200'}`}>
          <p className="text-lg font-semibold mb-2 text-gray-900">
            {scoreStatus === 'above' ? '🎉 Great job! You\'re above industry average' : '📈 Room for growth - you\'re below industry average'}
          </p>
          <p className="text-gray-700">
            {scoreStatus === 'above'
              ? 'While you\'re performing well, there are still opportunities to optimize and grow.'
              : 'The good news: fixing retention gaps typically generates the highest ROI of any marketing initiative.'}
          </p>
        </div>
      </div>

      {/* Revenue Opportunity - Premium Dark Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <p className="text-xl mb-3 text-gray-300">Untapped Revenue Opportunity</p>
          <h2 className="text-7xl font-bold mb-4" style={{ color: '#D1F25E' }}>
            {formatCurrency(totalMonthlyOpportunity || 0, currency)}
          </h2>
          <p className="text-2xl text-gray-300 mb-2">per month</p>
          <p className="text-xl text-gray-400">
            {formatCurrency(totalAnnualOpportunity || 0, currency)} annually
          </p>
        </div>

        <div className="mt-8 p-6 rounded-xl" style={{ background: 'rgba(209, 242, 94, 0.1)' }}>
          <p className="text-lg text-white">
            💡 <strong>What this means:</strong> By optimizing your retention strategy,
            you could add {formatCurrency(totalMonthlyOpportunity || 0, currency)} to your monthly revenue
            without acquiring a single new customer.
          </p>
        </div>
      </div>

      {/* Lifecycle Stage Breakdown */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Lifecycle Stage Breakdown</h2>

        <div className="space-y-6">
          {(lifecycleScores || []).map((stage, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">{stage.stage}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Benchmark: {stage.benchmark.toFixed(0)}
                  </span>
                  <span
                    className="px-4 py-2 rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: stage.status === 'excellent' ? '#D1F25E' : stage.status === 'good' ? '#3B82F6' : '#EF4444',
                      color: stage.status === 'excellent' ? '#1F2937' : 'white'
                    }}
                  >
                    {stage.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(stage.score, 100)}%`,
                    backgroundColor: stage.status === 'excellent' ? '#D1F25E' : stage.status === 'good' ? '#3B82F6' : '#EF4444'
                  }}
                />
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-2xl font-bold text-gray-900">{stage.score.toFixed(0)}</span>
                {stage.gap > 0 && (
                  <p className="text-sm text-gray-600">
                    Gap: {stage.gap.toFixed(0)} points below benchmark
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Opportunities */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">🎯 Top 3 Priority Opportunities</h2>
        <p className="text-gray-600 mb-8">
          Based on your audit, here are the highest-impact areas to focus on:
        </p>

        <div className="space-y-6">
          {(topOpportunities || []).map((opportunity, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D1F25E' }}>
                  <span className="text-2xl font-bold text-gray-900">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">{opportunity.title}</h3>
                  <p className="text-gray-300 mb-4">{opportunity.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg" style={{ background: 'rgba(209, 242, 94, 0.1)' }}>
                      <p className="text-sm text-gray-400 mb-1">Monthly Potential</p>
                      <p className="text-2xl font-bold" style={{ color: '#D1F25E' }}>
                        {formatCurrency(opportunity.monthlyRevenue || 0, currency)}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ background: 'rgba(209, 242, 94, 0.1)' }}>
                      <p className="text-sm text-gray-400 mb-1">Annual Potential</p>
                      <p className="text-2xl font-bold" style={{ color: '#D1F25E' }}>
                        {formatCurrency(opportunity.annualRevenue || 0, currency)}
                      </p>
                    </div>
                  </div>

                  {opportunity.actions && opportunity.actions.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-bold mb-2 text-gray-300">Key Actions:</p>
                      <ul className="space-y-2">
                        {opportunity.actions.slice(0, 3).map((action: string, idx: number) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span style={{ color: '#D1F25E' }}>▸</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-center">
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
