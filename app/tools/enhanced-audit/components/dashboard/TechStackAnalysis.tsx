// components/dashboard/TechStackAnalysis.tsx
'use client';

import React from 'react';
import { EnhancedAuditResults } from '@/types/enhanced-audit/enhanced-audit';

interface TechStackAnalysisProps {
  results: EnhancedAuditResults;
}

export default function TechStackAnalysis({ results }: TechStackAnalysisProps) {
  const { technologyStack, leadData } = results;

  // India-based platforms for recognition
  const indiaPlatforms = {
    email: ['moengage', 'webengage', 'netcore', 'juvlon', 'sendgun', 'mailcot'],
    sms: ['msg91', 'gupshup', 'kaleyra', 'valueFirst', 'route mobile'],
    cdp: ['moengage', 'webengage', 'capillary', 'clevertap'],
    loyalty: ['capillary', 'xoxoday', 'easyrewardz', 'zinrelo', 'poshvine', 'hashtag loyalty'],
    analytics: ['clevertap', 'moengage', 'webengage'],
    automation: ['webengage', 'moengage', 'mailcot', 'zoho'],
  };

  const isIndiaPlatform = (platform: string, category: keyof typeof indiaPlatforms): boolean => {
    if (!platform || platform.toLowerCase() === 'none') return false;
    const platformLower = platform.toLowerCase();
    return indiaPlatforms[category].some(p => platformLower.includes(p));
  };

  const getMaturityColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-500 text-green-900';
    if (score >= 60) return 'bg-blue-100 border-blue-500 text-blue-900';
    if (score >= 40) return 'bg-yellow-100 border-yellow-500 text-yellow-900';
    return 'bg-red-100 border-red-500 text-red-900';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'implemented') return 'bg-green-100 text-green-800';
    if (status === 'partial') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 print:break-after">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
              <span className="text-2xl">⚙️</span>
            </div>
            <h2 className="text-3xl font-bold">Technology Stack Analysis</h2>
          </div>
          <p className="text-gray-300">
            Platform capabilities, gaps, and strategic recommendations
          </p>
        </div>

        {/* Overall Maturity Score */}
        <div className="p-8 border-b bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Overall Tech Maturity</h3>
                <p className="text-gray-600 mt-1">Based on platform coverage and utilization</p>
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${getMaturityColor(technologyStack.overallMaturity)}`}>
                  <span className="text-3xl font-bold">{technologyStack.overallMaturity}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {technologyStack.overallMaturity >= 80 ? 'Advanced' :
                    technologyStack.overallMaturity >= 60 ? 'Intermediate' :
                      technologyStack.overallMaturity >= 40 ? 'Basic' : 'Nascent'}
                </p>
              </div>
            </div>

            {/* Integration Score */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-medium">Data Integration Score</span>
                <span className="text-2xl font-bold text-blue-600">{technologyStack.integrationScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${technologyStack.integrationScore}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {technologyStack.integrationScore >= 70 ? 'Strong data connectivity across platforms' :
                  technologyStack.integrationScore >= 50 ? 'Moderate integration, room for improvement' :
                    'Significant integration gaps detected'}
              </p>
            </div>
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="p-8 border-b">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Platform-by-Platform Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technologyStack.platforms.map((platform, idx) => {
              const isIndian = isIndiaPlatform(platform.platform,
                platform.category.toLowerCase().includes('email') ? 'email' :
                  platform.category.toLowerCase().includes('sms') ? 'sms' :
                    platform.category.toLowerCase().includes('cdp') || platform.category.toLowerCase().includes('data') ? 'cdp' :
                      platform.category.toLowerCase().includes('loyalty') ? 'loyalty' :
                        platform.category.toLowerCase().includes('analytics') ? 'analytics' : 'automation'
              );

              return (
                <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{platform.category}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {platform.platform !== 'none' ? platform.platform : 'Not Implemented'}
                        {isIndian && <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded-full">🇮🇳 India</span>}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(platform.status)}`}>
                      {platform.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Maturity</span>
                        <span className="font-bold text-gray-900">{platform.maturityScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${platform.maturityScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Utilization</span>
                        <span className="font-bold text-gray-900">{platform.utilizationScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${platform.utilizationScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {platform.recommendations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Top Recommendation:</p>
                      <p className="text-xs text-gray-600">{platform.recommendations[0]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Gaps */}
        {technologyStack.gaps.length > 0 && (
          <div className="p-8 border-b bg-red-50">
            <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <span>⚠️</span>
              Critical Technology Gaps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technologyStack.gaps.map((gap, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border-2 border-red-200">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{gap}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Missing capability limiting retention effectiveness
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* India vs Global Comparison */}
        <div className="p-8 border-b bg-gradient-to-br from-orange-50 to-yellow-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🇮🇳 India vs Global Platform Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-3">India-Based Platforms</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-gray-700">Better local market understanding</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-gray-700">INR pricing, no forex fluctuations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-gray-700">Local support teams & faster response</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-gray-700">Compliance with Indian data laws</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-3">Global Platforms</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm text-gray-700">Mature feature sets & integrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm text-gray-700">Global best practices & benchmarks</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm text-gray-700">Extensive partner ecosystems</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm text-gray-700">Advanced AI/ML capabilities</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg border-2 border-orange-200">
            <p className="text-sm text-gray-700">
              <strong>💡 Recommendation:</strong> Consider a hybrid approach - use India-based platforms for core engagement (email, SMS, loyalty)
              to benefit from local expertise and pricing, while leveraging global platforms for advanced capabilities like predictive analytics.
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Strategic Recommendations</h3>
          <div className="space-y-3">
            {technologyStack.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <p className="text-gray-800 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Insight */}
        <div className="px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <p className="font-bold text-lg mb-2">Technology Investment Priority</p>
              <p className="text-purple-100 text-sm leading-relaxed">
                Your technology stack maturity score of {technologyStack.overallMaturity}/100 indicates {
                  technologyStack.overallMaturity >= 70 ? 'strong foundational capabilities with opportunities for advanced optimization' :
                    technologyStack.overallMaturity >= 50 ? 'solid basics but significant gaps in advanced capabilities' :
                      'critical need for technology investment to enable effective retention programs'
                }. Focus on closing the {technologyStack.gaps.length} identified gaps to unlock retention potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
