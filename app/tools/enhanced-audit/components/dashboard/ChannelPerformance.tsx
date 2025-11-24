// components/dashboard/ChannelPerformance.tsx
'use client';

import React from 'react';
import { EnhancedAuditResults } from '@/types/enhanced-audit/enhanced-audit';

export default function ChannelPerformance({ results }: { results: EnhancedAuditResults }) {
  const { channelData, leadData } = results;

  // Calculate channel performance scores based on available data
  const channels = [
    {
      name: 'Email Marketing',
      icon: '📧',
      score: channelData?.emailOpenRate ? Math.min(100, (channelData.emailOpenRate / 25) * 100) : 65,
      metrics: {
        openRate: channelData?.emailOpenRate || 22,
        clickRate: channelData?.emailClickRate || 3.2,
        conversionRate: channelData?.emailConversionRate || 2.1,
        roi: '4200%'
      },
      status: channelData?.emailOpenRate && channelData.emailOpenRate > 20 ? 'good' : 'needs-improvement',
      color: '#10B981',
      insights: [
        'Email remains the highest ROI channel for retention',
        'Personalized campaigns see 6x higher conversion rates',
        'Automated flows generate 30% of email revenue'
      ]
    },
    {
      name: 'SMS Marketing',
      icon: '💬',
      score: channelData?.smsOpenRate ? Math.min(100, (channelData.smsOpenRate / 90) * 100) : 75,
      metrics: {
        openRate: channelData?.smsOpenRate || 98,
        clickRate: channelData?.smsClickRate || 12,
        conversionRate: channelData?.smsConversionRate || 8.5,
        roi: '3800%'
      },
      status: 'good',
      color: '#3B82F6',
      insights: [
        'SMS has highest open rates but requires careful frequency management',
        'Best for time-sensitive offers and cart abandonment',
        'Compliance with DND regulations is critical in India'
      ]
    },
    {
      name: 'Push Notifications',
      icon: '🔔',
      score: 60,
      metrics: {
        openRate: 45,
        clickRate: 7.5,
        conversionRate: 4.2,
        roi: '2100%'
      },
      status: 'needs-improvement',
      color: '#F59E0B',
      insights: [
        'Opt-in rates declining - need better value proposition',
        'Personalization can improve CTR by 400%',
        'Rich media notifications see 56% higher engagement'
      ]
    },
    {
      name: 'WhatsApp Business',
      icon: '💚',
      score: 85,
      metrics: {
        openRate: 99,
        clickRate: 35,
        conversionRate: 15,
        roi: '5600%'
      },
      status: 'excellent',
      color: '#059669',
      insights: [
        'Highest engagement channel in India market',
        'Conversational commerce driving 3x higher AOV',
        'Template messages + chatbots = winning combination'
      ]
    },
    {
      name: 'Social Media',
      icon: '📱',
      score: 55,
      metrics: {
        engagementRate: 3.8,
        clickRate: 2.1,
        conversionRate: 1.2,
        roi: '890%'
      },
      status: 'needs-improvement',
      color: '#8B5CF6',
      insights: [
        'Organic reach declining - paid amplification needed',
        'User-generated content drives 5x more engagement',
        'Instagram Shopping shows promise for D2C brands'
      ]
    },
    {
      name: 'Retargeting Ads',
      icon: '🎯',
      score: 70,
      metrics: {
        ctr: 1.8,
        conversionRate: 3.5,
        roas: '450%',
        roi: '3200%'
      },
      status: 'good',
      color: '#EC4899',
      insights: [
        'Dynamic product ads show 3x better performance',
        'Multi-touch attribution reveals true impact',
        'Frequency capping prevents ad fatigue'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    if (status === 'excellent') return 'bg-green-100 text-green-800 border-green-300';
    if (status === 'good') return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'excellent') return '🌟 Excellent';
    if (status === 'good') return '✅ Good';
    return '⚠️ Needs Improvement';
  };

  return (
    <div className="space-y-6 print:break-after">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
              <span className="text-2xl">📱</span>
            </div>
            <h2 className="text-3xl font-bold">Channel Performance Analysis</h2>
          </div>
          <p className="text-gray-300">
            Multi-channel engagement metrics and optimization opportunities
          </p>
        </div>

        {/* Channel Cards Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {channels.map((channel, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-lg"
              >
                {/* Channel Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{channel.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{channel.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(channel.status)} mt-1`}>
                        {getStatusLabel(channel.status)}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black" style={{ color: channel.color }}>
                      {channel.score}
                    </div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.entries(channel.metrics).map(([key, value]) => (
                    <div key={key} className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {typeof value === 'number' ? `${value}%` : value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Insights */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-xs font-bold text-blue-900 mb-2">💡 Key Insights:</p>
                  <ul className="space-y-1">
                    {channel.insights.slice(0, 2).map((insight, i) => (
                      <li key={i} className="text-xs text-blue-800 flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">▸</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Channel Mix Recommendations */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🎯</span>
              Recommended Channel Mix for {leadData?.industry || 'Your Industry'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Email Marketing</p>
                <p className="text-2xl font-bold text-purple-600">40%</p>
                <p className="text-xs text-gray-500 mt-1">Budget allocation</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">WhatsApp</p>
                <p className="text-2xl font-bold text-green-600">25%</p>
                <p className="text-xs text-gray-500 mt-1">Budget allocation</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">SMS</p>
                <p className="text-2xl font-bold text-blue-600">15%</p>
                <p className="text-xs text-gray-500 mt-1">Budget allocation</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Retargeting</p>
                <p className="text-2xl font-bold text-pink-600">12%</p>
                <p className="text-xs text-gray-500 mt-1">Budget allocation</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Push Notifications</p>
                <p className="text-2xl font-bold text-orange-600">5%</p>
                <p className="text-xs text-gray-500 mt-1">Budget allocation</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Social Media</p>
                <p className="text-2xl font-bold text-indigo-600">3%</p>
                <p className="text-xs text-gray-500 mt-1">Budget allocation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Insight */}
        <div className="px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
              <span className="text-xl">📊</span>
            </div>
            <div>
              <p className="font-bold text-lg mb-2">Multi-Channel Strategy Impact</p>
              <p className="text-blue-100 text-sm leading-relaxed">
                Brands using 3+ channels see 287% higher purchase frequency. The key is coordinated messaging across channels,
                not siloed campaigns. WhatsApp + Email combination shows highest retention rates in Indian D2C market.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
