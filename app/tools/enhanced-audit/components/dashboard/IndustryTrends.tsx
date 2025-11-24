// components/dashboard/IndustryTrends.tsx
'use client';

import React from 'react';
import { EnhancedAuditResults } from '@/types/enhanced-audit/enhanced-audit';

export default function IndustryTrends({ results }: { results: EnhancedAuditResults }) {
  const { leadData } = results;
  const industry = leadData?.industry || 'E-commerce';

  const trends = [
    {
      title: 'AI-Powered Personalization',
      icon: '🤖',
      impact: 'High Impact',
      adoption: '68% Adoption',
      description: 'Predictive AI driving 35% increase in conversion rates through hyper-personalized experiences',
      stats: ['35% higher conversion', '2.5x engagement', '₹12L avg. ROI'],
      timeline: '📅 Mainstream by Q2 2025',
    },
    {
      title: 'WhatsApp Commerce in India',
      icon: '💚',
      impact: 'Critical Impact',
      adoption: '82% Adoption',
      description: 'Conversational commerce via WhatsApp becoming primary channel for D2C brands in India',
      stats: ['99% open rate', '15% conversion', '5.6x ROI'],
      timeline: '📅 Already dominant',
    },
    {
      title: 'Zero-Party Data Strategy',
      icon: '🎯',
      impact: 'High Impact',
      adoption: '45% Adoption',
      description: 'Customers willingly sharing preferences in exchange for personalized experiences',
      stats: ['3x data accuracy', '40% better targeting', 'GDPR compliant'],
      timeline: '📅 Growing rapidly',
    },
    {
      title: 'Subscription & Membership Models',
      icon: '🔄',
      impact: 'High Impact',
      adoption: '56% Adoption',
      description: 'Recurring revenue models showing 5x higher customer lifetime value',
      stats: ['5x higher LTV', '90% retention', 'Predictable revenue'],
      timeline: '📅 Accelerating in 2025',
    },
    {
      title: 'Gamification & Loyalty 2.0',
      icon: '🎮',
      impact: 'Medium Impact',
      adoption: '38% Adoption',
      description: 'Interactive loyalty programs driving 3x higher engagement than traditional points',
      stats: ['3x engagement', '45% repeat rate', 'Viral sharing'],
      timeline: '📅 Emerging trend',
    },
    {
      title: 'Sustainability & Purpose-Driven',
      icon: '🌱',
      impact: 'Growing Impact',
      adoption: '52% Adoption',
      description: 'Gen-Z and Millennials preferring brands with strong sustainability commitments',
      stats: ['67% prefer sustainable', '25% price premium', 'Brand loyalty boost'],
      timeline: '📅 Long-term shift',
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#D1F25E' }}>
            <span className="text-3xl">🔮</span>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Industry Trends 2024-2025</h2>
            <p className="text-gray-300 mt-1">Emerging trends shaping retention strategies in {industry}</p>
          </div>
        </div>
      </div>

      {/* Trends Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {trends.map((trend, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
            {/* Card Header */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#D1F25E' }}>
                  <span className="text-3xl">{trend.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{trend.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#D1F25E', color: '#1F2937' }}>
                      {trend.impact}
                    </span>
                    <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-bold text-white">
                      {trend.adoption}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 bg-white">
              <p className="text-gray-800 mb-4 leading-relaxed font-medium">{trend.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {trend.stats.map((stat, idx) => (
                  <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-bold text-gray-900">{stat}</p>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="p-4 rounded-lg bg-gray-100 border border-gray-200">
                <p className="text-sm font-bold text-gray-900">{trend.timeline}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-3">Stay Ahead of the Curve</h3>
          <p className="text-gray-300 text-lg">
            These trends represent significant opportunities for retention optimization.
            Consider which align with your business goals and customer base.
          </p>
        </div>
      </div>
    </div>
  );
}
