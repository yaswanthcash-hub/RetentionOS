'use client';

import { PremiumButton } from "@/components/ui/PremiumButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
export default function BenchmarkingResults({ results, currency, onReset }: any) {
  const { industryScore, yourScore, gap } = results;
  const performanceStatus = yourScore >= industryScore ? 'Above Average' : yourScore >= industryScore * 0.8 ? 'Average' : 'Below Average';
  const performanceColor = yourScore >= industryScore ? 'text-green-600' : yourScore >= industryScore * 0.8 ? 'text-yellow-600' : 'text-red-600';
  const performanceBg = yourScore >= industryScore ? 'bg-green-50' : yourScore >= industryScore * 0.8 ? 'bg-yellow-50' : 'bg-red-50';

  return (
    <div className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Industry Benchmarking</h2>
          <p className="text-gray-500 mt-1">Compare against industry standards</p>
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
          <div className="absolute top-0 right-0 p-4 opacity-20"><span className="text-6xl">📊</span></div>
          <p className="text-gray-400 font-medium mb-2">Your Score</p>
          <div className="flex items-baseline gap-3"><span className="text-6xl font-bold text-[#D1F25E]">{yourScore !== undefined ? yourScore.toFixed(0) : 'N/A'}</span></div>
          <p className="text-sm text-gray-400 mt-2">vs Industry: {industryScore !== undefined ? industryScore.toFixed(0) : 'N/A'}</p>
        </div>

        <div className={`${performanceBg} p-8 rounded-2xl border-2 ${performanceColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10"><span className="text-6xl">⭐</span></div>
          <p className="text-gray-600 font-medium mb-2">Performance</p>
          <div className="flex items-baseline gap-3"><span className={`text-4xl font-bold ${performanceColor}`}>{performanceStatus}</span></div>
          <p className="text-sm text-gray-600 mt-2">{yourScore >= industryScore ? 'Leading the industry' : 'Opportunity for improvement'}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><span className="text-2xl">📊</span> Industry Standards</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm"><p className="font-bold text-gray-900">E-commerce</p><p className="text-gray-600 text-sm mt-1">30% Retention Rate</p></div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm"><p className="font-bold text-gray-900">SaaS</p><p className="text-gray-600 text-sm mt-1">80% Retention Rate</p></div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm"><p className="font-bold text-gray-900">Fintech</p><p className="text-gray-600 text-sm mt-1">75% Retention Rate</p></div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm"><p className="font-bold text-gray-900">Retail</p><p className="text-gray-600 text-sm mt-1">40% Retention Rate</p></div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-12">
        <button onClick={() => window.print()} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">🖨️ Print Report</button>
      </div>
    </div>
  );
}
