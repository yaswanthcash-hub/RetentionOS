// components/dashboard/CustomerSegments.tsx
'use client';

import React from 'react';
import { EnhancedAuditResults } from '@/types/enhanced-audit/enhanced-audit';

export default function CustomerSegments({ results }: { results: EnhancedAuditResults }) {
  const { leadData } = results;

  const segments = [
    {
      name: 'VIP Champions',
      icon: '👑',
      size: '8%',
      value: '42%',
      description: 'Highest value customers with frequent purchases and strong brand advocacy',
      characteristics: [
        'AOV: ₹4,500+ (3x average)',
        'Purchase frequency: 8+ times/year',
        'NPS: 9-10 (Promoters)',
        'Engagement: Very High'
      ],
      strategy: [
        'Exclusive early access to new products',
        'Dedicated customer success manager',
        'VIP-only events and experiences',
        'Personalized product recommendations'
      ],
      color: 'from-yellow-500 to-orange-500',
      priority: 'Critical',
      health: 95
    },
    {
      name: 'Loyal Regulars',
      icon: '💚',
      size: '22%',
      value: '35%',
      description: 'Consistent repeat customers with moderate to high purchase frequency',
      characteristics: [
        'AOV: ₹2,200 (1.5x average)',
        'Purchase frequency: 4-7 times/year',
        'NPS: 7-8 (Passives)',
        'Engagement: High'
      ],
      strategy: [
        'Loyalty rewards program',
        'Personalized email campaigns',
        'Birthday/anniversary offers',
        'Referral incentives'
      ],
      color: 'from-green-500 to-emerald-500',
      priority: 'High',
      health: 82
    },
    {
      name: 'Promising Newcomers',
      icon: '🌟',
      size: '18%',
      value: '12%',
      description: 'Recent customers showing high engagement and purchase intent',
      characteristics: [
        'AOV: ₹1,800 (above average)',
        'Purchased in last 30 days',
        'High email engagement',
        'Strong product interest'
      ],
      strategy: [
        'Welcome series automation',
        'Second purchase incentive',
        'Educational content',
        'Product discovery campaigns'
      ],
      color: 'from-blue-500 to-cyan-500',
      priority: 'High',
      health: 75
    },
    {
      name: 'At-Risk Customers',
      icon: '⚠️',
      size: '15%',
      value: '8%',
      description: 'Previously active customers showing declining engagement',
      characteristics: [
        'No purchase in 90-180 days',
        'Decreasing email opens',
        'Was a regular customer',
        'High churn probability'
      ],
      strategy: [
        'Win-back email campaigns',
        'Special comeback offers',
        'Survey to understand issues',
        'Re-engagement automation'
      ],
      color: 'from-orange-500 to-red-500',
      priority: 'Urgent',
      health: 35
    },
    {
      name: 'Hibernating',
      icon: '😴',
      size: '12%',
      value: '2%',
      description: 'Inactive customers who haven\'t purchased in 6+ months',
      characteristics: [
        'No purchase in 180+ days',
        'Minimal engagement',
        'May have churned',
        'Low reactivation probability'
      ],
      strategy: [
        'Last-chance win-back campaign',
        'Deep discount offers',
        'Product updates/news',
        'Sunset if no response'
      ],
      color: 'from-gray-400 to-gray-500',
      priority: 'Low',
      health: 15
    },
    {
      name: 'One-Time Buyers',
      icon: '🎁',
      size: '25%',
      value: '1%',
      description: 'Customers who made single purchase but haven\'t returned',
      characteristics: [
        'Only 1 purchase ever',
        'Purchased 30-90 days ago',
        'Low engagement',
        'Conversion opportunity'
      ],
      strategy: [
        'Post-purchase nurture sequence',
        'Product recommendations',
        'Second purchase discount',
        'Educational content'
      ],
      color: 'from-purple-500 to-pink-500',
      priority: 'Medium',
      health: 45
    }
  ];

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600';
    if (health >= 60) return 'text-blue-600';
    if (health >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === 'Critical') return 'bg-red-100 text-red-800 border-red-300';
    if (priority === 'Urgent') return 'bg-orange-100 text-orange-800 border-orange-300';
    if (priority === 'High') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (priority === 'Medium') return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <div className="space-y-6 print:break-after">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
              <span className="text-2xl">👥</span>
            </div>
            <h2 className="text-3xl font-bold">Customer Segmentation Analysis</h2>
          </div>
          <p className="text-gray-300">
            Strategic segments based on behavior, value, and engagement patterns
          </p>
        </div>

        {/* Segment Overview */}
        <div className="p-8 border-b bg-gradient-to-br from-gray-50 to-white">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Segment Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {segments.map((segment, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border-2 border-gray-200 text-center">
                <span className="text-3xl mb-2 block">{segment.icon}</span>
                <p className="text-sm font-bold text-gray-900 mb-1">{segment.name}</p>
                <p className="text-2xl font-black text-purple-600">{segment.size}</p>
                <p className="text-xs text-gray-500">of customer base</p>
                <p className="text-sm font-semibold text-green-600 mt-2">{segment.value} of revenue</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Segment Cards */}
        <div className="p-8">
          <div className="space-y-6">
            {segments.map((segment, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:shadow-xl transition-all">
                {/* Segment Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${segment.color} flex items-center justify-center text-3xl shadow-lg`}>
                      {segment.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{segment.name}</h3>
                      <p className="text-sm text-gray-600">{segment.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityBadge(segment.priority)}`}>
                          {segment.priority} Priority
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                          {segment.size} of base
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center ml-4">
                    <p className="text-xs text-gray-600 mb-1">Health Score</p>
                    <p className={`text-4xl font-black ${getHealthColor(segment.health)}`}>
                      {segment.health}
                    </p>
                  </div>
                </div>

                {/* Characteristics & Strategy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Characteristics */}
                  <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                    <p className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <span>📊</span>
                      Key Characteristics
                    </p>
                    <ul className="space-y-2">
                      {segment.characteristics.map((char, i) => (
                        <li key={i} className="text-xs text-blue-800 flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">▸</span>
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strategy */}
                  <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                    <p className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2">
                      <span>🎯</span>
                      Engagement Strategy
                    </p>
                    <ul className="space-y-2">
                      {segment.strategy.map((strat, i) => (
                        <li key={i} className="text-xs text-green-800 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">▸</span>
                          <span>{strat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Value Contribution */}
                <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">Revenue Contribution</span>
                    <span className="text-2xl font-black text-purple-600">{segment.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div
                      className={`bg-gradient-to-r ${segment.color} h-3 rounded-full`}
                      style={{ width: segment.value }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Insight */}
        <div className="px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
              <span className="text-xl">💎</span>
            </div>
            <div>
              <p className="font-bold text-lg mb-2">Segmentation Strategy Impact</p>
              <p className="text-purple-100 text-sm leading-relaxed">
                The top 30% of your customers (VIP Champions + Loyal Regulars) drive 77% of revenue. Focus retention efforts here while nurturing Promising Newcomers
                and reactivating At-Risk customers. Personalized strategies for each segment can increase overall retention by 35-50%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
