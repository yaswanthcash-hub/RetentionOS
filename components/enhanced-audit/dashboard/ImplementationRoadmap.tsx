// components/dashboard/ImplementationRoadmap.tsx
'use client';

import React from 'react';
import { EnhancedAuditResults } from '@/types/enhanced-audit/enhanced-audit';
import { formatCurrency } from '@/lib/utils';

export default function ImplementationRoadmap({ results }: { results: EnhancedAuditResults }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <h2 className="text-3xl font-bold mb-6">🗺️ Implementation Roadmap</h2>
      <div className="space-y-8">
        {results.implementationRoadmap.map((phase) => (
          <div key={phase.phase} className="border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                {phase.phase}
              </div>
              <div>
                <h3 className="text-xl font-bold">{phase.name}</h3>
                <p className="text-sm text-gray-600">{phase.duration}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Expected Revenue</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(phase.expectedRevenue)}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Investment Required</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(phase.requiredInvestment)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900">Key Initiatives:</h4>
              {phase.initiatives.map((init, idx) => (
                <p key={idx} className="text-sm text-gray-700 pl-4">• {init.title}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
