// components/dashboard/LifecycleAnalysis.tsx
'use client';

import React from 'react';
import { EnhancedAuditResults } from '@/types/enhanced-audit/enhanced-audit';

export default function LifecycleAnalysis({ results }: { results: EnhancedAuditResults }) {
  const scores = results.categoryScores;

  const stages = [
    { key: 'acquisition', label: 'Acquisition', icon: '🎯', color: '#3B82F6' },
    { key: 'activation', label: 'Activation', icon: '⚡', color: '#10B981' },
    { key: 'nurture', label: 'Nurture', icon: '🌱', color: '#8B5CF6' },
    { key: 'retention', label: 'Retention', icon: '🔒', color: '#F59E0B' },
    { key: 'winback', label: 'Winback', icon: '🔄', color: '#EF4444' },
    { key: 'advocacy', label: 'Advocacy', icon: '📣', color: '#EC4899' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <h2 className="text-3xl font-bold mb-6">♻️ Lifecycle Stage Analysis</h2>
      <div className="space-y-6">
        {stages.map((stage) => {
          const score = scores[stage.key as keyof typeof scores];
          const benchmark = 70; // Default benchmark
          const gap = benchmark - score;

          return (
            <div key={stage.key} className="border-l-4 pl-4" style={{ borderColor: stage.color }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{stage.icon}</span>
                <h3 className="text-xl font-bold">{stage.label}</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Your Score</p>
                  <p className="text-2xl font-bold">{score}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Benchmark</p>
                  <p className="text-2xl font-bold">{benchmark}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gap</p>
                  <p className={`text-2xl font-bold ${gap > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {gap > 0 ? '+' : ''}{gap.toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
