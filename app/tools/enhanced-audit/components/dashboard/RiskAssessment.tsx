// components/dashboard/RiskAssessment.tsx
'use client';

import React from 'react';
import { EnhancedAuditResults } from '@/types/enhanced-audit/enhanced-audit';

export default function RiskAssessment({ results }: { results: EnhancedAuditResults }) {
  const { categoryScores, leadData, technologyStack } = results;

  // Calculate risk scores based on audit data
  const risks = [
    {
      category: 'Customer Churn Risk',
      icon: '🚨',
      severity: categoryScores.retention < 60 ? 'high' : categoryScores.retention < 75 ? 'medium' : 'low',
      score: Math.max(0, 100 - categoryScores.retention),
      impact: 'Revenue',
      probability: categoryScores.retention < 60 ? 'High' : 'Medium',
      description: 'Risk of losing customers due to poor retention strategies',
      indicators: [
        `Retention score: ${categoryScores.retention}/100`,
        'Low engagement in nurture campaigns',
        'Minimal win-back automation'
      ],
      mitigation: [
        'Implement loyalty program within 30 days',
        'Launch personalized retention campaigns',
        'Set up churn prediction model',
        'Create VIP customer segment with exclusive perks'
      ],
      timeframe: '30-60 days'
    },
    {
      category: 'Technology Stack Gaps',
      icon: '⚙️',
      severity: technologyStack.overallMaturity < 60 ? 'high' : technologyStack.overallMaturity < 75 ? 'medium' : 'low',
      score: Math.max(0, 100 - technologyStack.overallMaturity),
      impact: 'Operational Efficiency',
      probability: 'Medium',
      description: 'Missing critical technology capabilities limiting retention potential',
      indicators: [
        `Tech maturity: ${technologyStack.overallMaturity}/100`,
        `${technologyStack.gaps.length} critical gaps identified`,
        'Limited automation capabilities'
      ],
      mitigation: [
        'Prioritize CDP implementation for unified customer view',
        'Integrate marketing automation platform',
        'Implement advanced segmentation tools',
        'Set up real-time personalization engine'
      ],
      timeframe: '60-90 days'
    },
    {
      category: 'Revenue Concentration',
      icon: '💰',
      severity: 'medium',
      score: 55,
      impact: 'Financial Stability',
      probability: 'Medium',
      description: 'Over-reliance on acquisition vs. retention revenue',
      indicators: [
        'New customer revenue > 70% of total',
        'Repeat purchase rate below industry average',
        'Limited upsell/cross-sell programs'
      ],
      mitigation: [
        'Develop subscription/membership model',
        'Launch product recommendation engine',
        'Create post-purchase nurture sequences',
        'Implement referral program'
      ],
      timeframe: '45-60 days'
    },
    {
      category: 'Data Quality & Privacy',
      icon: '🔒',
      severity: 'medium',
      score: 45,
      impact: 'Compliance & Trust',
      probability: 'Low',
      description: 'Potential compliance issues and data quality concerns',
      indicators: [
        'GDPR/DPDPA compliance gaps',
        'Incomplete customer data profiles',
        'No data governance framework'
      ],
      mitigation: [
        'Conduct privacy audit and update policies',
        'Implement consent management platform',
        'Set up data quality monitoring',
        'Train team on compliance requirements'
      ],
      timeframe: '30-45 days'
    },
    {
      category: 'Competitive Pressure',
      icon: '⚔️',
      severity: categoryScores.acquisition < 70 ? 'high' : 'medium',
      score: 60,
      impact: 'Market Share',
      probability: 'High',
      description: 'Increasing competition affecting customer acquisition and retention',
      indicators: [
        'Rising customer acquisition costs',
        'Competitors launching loyalty programs',
        'Price-based competition intensifying'
      ],
      mitigation: [
        'Differentiate through superior customer experience',
        'Build community and brand advocacy',
        'Focus on customer lifetime value over CAC',
        'Develop unique value propositions'
      ],
      timeframe: 'Ongoing'
    },
    {
      category: 'Seasonal Dependency',
      icon: '📅',
      severity: 'low',
      score: 30,
      impact: 'Cash Flow',
      probability: 'Medium',
      description: 'Revenue fluctuations due to seasonal patterns',
      indicators: [
        'High revenue concentration in Q4',
        'Limited off-season engagement',
        'Inventory management challenges'
      ],
      mitigation: [
        'Develop year-round engagement calendar',
        'Create seasonal product lines',
        'Launch subscription offerings for steady revenue',
        'Build off-season promotional campaigns'
      ],
      timeframe: '90+ days'
    }
  ];

  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return {
      bg: 'from-red-500 to-pink-600',
      badge: 'bg-red-100 text-red-800 border-red-300',
      text: 'text-red-600'
    };
    if (severity === 'medium') return {
      bg: 'from-yellow-500 to-orange-500',
      badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      text: 'text-yellow-600'
    };
    return {
      bg: 'from-green-500 to-emerald-600',
      badge: 'bg-green-100 text-green-800 border-green-300',
      text: 'text-green-600'
    };
  };

  // Calculate overall risk score
  const overallRiskScore = Math.round(risks.reduce((sum, r) => sum + r.score, 0) / risks.length);
  const criticalRisks = risks.filter(r => r.severity === 'high').length;

  return (
    <div className="space-y-6 print:break-after">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-3xl font-bold">Risk Assessment & Mitigation</h2>
          </div>
          <p className="text-gray-300">
            Comprehensive risk analysis with actionable mitigation strategies
          </p>
        </div>

        {/* Overall Risk Summary */}
        <div className="p-8 border-b bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-md text-center">
                <p className="text-sm text-gray-600 mb-2">Overall Risk Score</p>
                <div className={`text-5xl font-black mb-2 ${overallRiskScore > 60 ? 'text-red-600' : overallRiskScore > 40 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {overallRiskScore}
                </div>
                <p className="text-xs text-gray-500">
                  {overallRiskScore > 60 ? 'High Risk' : overallRiskScore > 40 ? 'Moderate Risk' : 'Low Risk'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-red-200 shadow-md text-center">
                <p className="text-sm text-gray-600 mb-2">Critical Risks</p>
                <div className="text-5xl font-black text-red-600 mb-2">
                  {criticalRisks}
                </div>
                <p className="text-xs text-gray-500">Require immediate attention</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-md text-center">
                <p className="text-sm text-gray-600 mb-2">Mitigation Actions</p>
                <div className="text-5xl font-black text-blue-600 mb-2">
                  {risks.reduce((sum, r) => sum + r.mitigation.length, 0)}
                </div>
                <p className="text-xs text-gray-500">Recommended steps</p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Matrix */}
        <div className="p-8 border-b">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Risk Matrix</h3>
          <div className="space-y-4">
            {risks.map((risk, idx) => {
              const colors = getSeverityColor(risk.severity);
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-orange-300 transition-all hover:shadow-lg"
                >
                  {/* Risk Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-4xl">{risk.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900">{risk.category}</h4>
                        <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                      </div>
                    </div>
                    <div className="text-center ml-4">
                      <div className={`text-3xl font-black ${colors.text}`}>
                        {risk.score}
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${colors.badge} mt-1`}>
                        {risk.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Risk Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Impact Area</p>
                      <p className="text-sm font-bold text-gray-900">{risk.impact}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Probability</p>
                      <p className="text-sm font-bold text-gray-900">{risk.probability}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Mitigation Timeframe</p>
                      <p className="text-sm font-bold text-gray-900">{risk.timeframe}</p>
                    </div>
                  </div>

                  {/* Risk Indicators */}
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-4">
                    <p className="text-xs font-bold text-red-900 mb-2">⚠️ Risk Indicators:</p>
                    <ul className="space-y-1">
                      {risk.indicators.map((indicator, i) => (
                        <li key={i} className="text-xs text-red-800 flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">▸</span>
                          <span>{indicator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mitigation Strategies */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-xs font-bold text-green-900 mb-2">✅ Mitigation Strategies:</p>
                    <ul className="space-y-1">
                      {risk.mitigation.map((action, i) => (
                        <li key={i} className="text-xs text-green-800 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">▸</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Insight */}
        <div className="px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
              <span className="text-xl">🛡️</span>
            </div>
            <div>
              <p className="font-bold text-lg mb-2">Proactive Risk Management</p>
              <p className="text-red-100 text-sm leading-relaxed">
                {criticalRisks > 0
                  ? `You have ${criticalRisks} critical risk${criticalRisks > 1 ? 's' : ''} requiring immediate attention. Prioritize mitigation strategies for high-severity risks within the next 30-60 days to protect revenue and customer relationships.`
                  : 'Your risk profile is well-managed. Continue monitoring key indicators and implementing preventive measures to maintain low-risk status.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
