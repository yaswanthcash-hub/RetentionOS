'use client';

// components/tools/OpportunityCard.tsx
import { formatCurrency } from '../../lib/utils';

interface OpportunityCardProps {
  opportunity: any;
  index: number;
  currency?: string;
}

export default function OpportunityCard({ opportunity, index, currency = 'INR' }: OpportunityCardProps) {
  const getImpactColor = (impact: string) => {
    const impactLower = impact?.toLowerCase() || 'low';
    if (impactLower === 'high') return {
      bg: 'from-gray-900 to-gray-800',
      badge: 'bg-green-50 text-gray-900 border-green-200',
      icon: '🚀',
      textColor: '#D1F25E'
    };
    if (impactLower === 'medium') return {
      bg: 'from-blue-500 to-cyan-600',
      badge: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: '⚡',
      textColor: 'white'
    };
    return {
      bg: 'from-gray-400 to-gray-500',
      badge: 'bg-gray-100 text-gray-700 border-gray-300',
      icon: '📌',
      textColor: 'white'
    };
  };

  const getEffortBadge = (effort: string) => {
    const effortLower = effort?.toLowerCase() || 'low';
    if (effortLower === 'high') return { label: '🏗️ Complex', color: 'bg-red-100 text-red-800 border-red-300' };
    if (effortLower === 'medium') return { label: '🎯 Moderate', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    return { label: '⚡ Quick Win', color: 'bg-green-100 text-green-800 border-green-300' };
  };

  const colors = getImpactColor(opportunity.impact);
  const effortBadge = getEffortBadge(opportunity.effort);
  const monthlyRevenue = opportunity.monthlyRevenue || 0;
  const annualRevenue = opportunity.annualRevenue || 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-1">
      {/* Priority Badge - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg`}>
          <span className="text-2xl font-black" style={{ color: colors.textColor }}>{index + 1}</span>
        </div>
      </div>

      {/* Header Section */}
      <div className="pt-6 pb-4 px-6 bg-gradient-to-br from-gray-50 to-white border-b-2 border-gray-100">
        <div className="pl-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
            {opportunity.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {opportunity.description}
          </p>
        </div>
      </div>

      {/* Badges Section */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex flex-wrap gap-3">
          <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${colors.badge} flex items-center gap-2`}>
            <span>{colors.icon}</span>
            {opportunity.impact?.toUpperCase() || 'LOW'} IMPACT
          </span>
          <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${effortBadge.color}`}>
            {effortBadge.label}
          </span>
        </div>
      </div>

      {/* Revenue Section */}
      <div className="p-6 bg-gradient-to-br from-white to-gray-50">
        <div className="grid grid-cols-2 gap-6">
          {/* Monthly Potential */}
          <div className="bg-white rounded-xl p-5 border-2 border-green-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📅</span>
              <p className="text-sm font-semibold text-gray-600">Monthly Potential</p>
            </div>
            <p className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {formatCurrency(monthlyRevenue, currency)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Revenue increase per month</p>
          </div>

          {/* Annual Potential */}
          <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📊</span>
              <p className="text-sm font-semibold text-gray-600">Annual Potential</p>
            </div>
            <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {formatCurrency(annualRevenue, currency)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total yearly impact</p>
          </div>
        </div>

        {/* ROI Indicator */}
        {monthlyRevenue > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-sm font-bold text-gray-900">High ROI Opportunity</p>
                <p className="text-xs text-gray-600">
                  Implementing this could generate {formatCurrency(monthlyRevenue, currency)}/month in additional revenue
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Items (if available) */}
      {opportunity.actions && opportunity.actions.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>✅</span>
            Key Actions:
          </p>
          <ul className="space-y-2">
            {opportunity.actions.slice(0, 3).map((action: string, idx: number) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">▸</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-2xl pointer-events-none transition-colors duration-300"></div>
    </div>
  );
}
