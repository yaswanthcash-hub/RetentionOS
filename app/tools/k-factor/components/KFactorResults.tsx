'use client';

import { PremiumButton } from "@/components/ui/PremiumButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
export default function KFactorResults({ results, currency, onReset }: any) {
  const { kFactor, invitesPerUser, conversionRate } = results;
  const viralityStatus = kFactor >= 1.0 ? 'Viral Growth' : kFactor >= 0.5 ? 'Strong Growth' : kFactor >= 0.2 ? 'Steady Growth' : 'Low Virality';
  const viralityColor = kFactor >= 1.0 ? 'text-green-600' : kFactor >= 0.5 ? 'text-blue-600' : kFactor >= 0.2 ? 'text-yellow-600' : 'text-red-600';
  const viralityBg = kFactor >= 1.0 ? 'bg-green-50' : kFactor >= 0.5 ? 'bg-blue-50' : kFactor >= 0.2 ? 'bg-yellow-50' : 'bg-red-50';

  return (
    <div className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">K-Factor Analysis</h2>
          <p className="text-gray-500 mt-1">Viral growth coefficient</p>
        </div>
        <PremiumButton
          onClick={onReset}
          variant="outline"
          size="md"
          icon="←"
        >
          Calculate Again
        </PremiumButton>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20"><span className="text-6xl">🚀</span></div>
          <p className="text-gray-400 font-medium mb-2">K-Factor</p>
          <div className="flex items-baseline gap-3"><span className="text-6xl font-bold text-[#D1F25E]">{kFactor !== undefined ? kFactor.toFixed(2) : 'N/A'}</span></div>
          <p className="text-sm text-gray-400 mt-2">{kFactor >= 1.0 ? 'Exponential growth' : 'Linear growth'}</p>
        </div>

        <div className={`${viralityBg} p-8 rounded-2xl border-2 ${viralityColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10"><span className="text-6xl">📈</span></div>
          <p className="text-gray-600 font-medium mb-2">Growth Type</p>
          <div className="flex items-baseline gap-3"><span className={`text-4xl font-bold ${viralityColor}`}>{viralityStatus}</span></div>
          <p className="text-sm text-gray-600 mt-2">{kFactor >= 1.0 ? 'Self-sustaining viral loop' : 'Needs optimization'}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><span className="text-2xl">📊</span> K-Factor Benchmarks</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-green-100 shadow-sm"><p className="font-bold text-green-600">Viral Growth (K &gt; 1.0)</p><p className="text-gray-600 text-sm mt-1">Exponential growth</p></div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm"><p className="font-bold text-blue-600">Strong Growth (K 0.5-1.0)</p><p className="text-gray-600 text-sm mt-1">Linear growth</p></div>
          <div className="p-5 bg-white rounded-xl border border-yellow-100 shadow-sm"><p className="font-bold text-yellow-600">Steady Growth (K 0.2-0.5)</p><p className="text-gray-600 text-sm mt-1">Moderate virality</p></div>
          <div className="p-5 bg-white rounded-xl border border-red-100 shadow-sm"><p className="font-bold text-red-600">Low Virality (K &lt; 0.2)</p><p className="text-gray-600 text-sm mt-1">Needs improvement</p></div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-12">
        <button onClick={() => window.print()} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">🖨️ Print Report</button>
      </div>
    </div>
  );
}
