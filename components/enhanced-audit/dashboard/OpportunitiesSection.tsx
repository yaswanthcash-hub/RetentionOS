// components/dashboard/OpportunitiesSection.tsx
'use client';

import React from 'react';
import { EnhancedAuditResults } from '@/types/enhanced-audit/enhanced-audit';
import { formatCurrency } from '@/lib/utils';

export default function OpportunitiesSection({ results }: { results: EnhancedAuditResults }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <h2 className="text-3xl font-bold mb-6">🎯 Prioritized Opportunities</h2>
      <div className="space-y-4">
        {results.prioritizedOpportunities.slice(0, 5).map((opp, idx) => (
          <div key={opp.id} className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900">{opp.title}</h3>
              <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">
                {formatCurrency(opp.annualRevenue)}/yr
              </span>
            </div>
            <p className="text-gray-700 mb-4">{opp.description}</p>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">ROI</p>
                <p className="font-bold">{(opp.roi / 100).toFixed(1)}x</p>
              </div>
              <div>
                <p className="text-gray-600">Payback</p>
                <p className="font-bold">{opp.paybackPeriod}mo</p>
              </div>
              <div>
                <p className="text-gray-600">Effort</p>
                <p className="font-bold capitalize">{opp.effort}</p>
              </div>
              <div>
                <p className="text-gray-600">Confidence</p>
                <p className="font-bold">{opp.confidenceLevel}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
