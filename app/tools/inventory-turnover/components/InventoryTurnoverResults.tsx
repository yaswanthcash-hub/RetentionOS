'use client';

import { PremiumButton } from "@/components/ui/PremiumButton";
import { PremiumCard } from "@/components/ui/PremiumCard";

export default function InventoryTurnoverResults({ results, currency, onReset }: any) {
  const { turnoverRatio, daysInventory, cogs, avgInventory } = results;
  const efficiencyStatus = turnoverRatio >= 8 ? 'Excellent' : turnoverRatio >= 5 ? 'Good' : turnoverRatio >= 3 ? 'Average' : 'Needs Improvement';
  const efficiencyColor = turnoverRatio >= 8 ? 'text-green-600' : turnoverRatio >= 5 ? 'text-blue-600' : turnoverRatio >= 3 ? 'text-yellow-600' : 'text-red-600';
  const efficiencyBg = turnoverRatio >= 8 ? 'bg-green-50' : turnoverRatio >= 5 ? 'bg-blue-50' : turnoverRatio >= 3 ? 'bg-yellow-50' : 'bg-red-50';

  return (
    <div className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Inventory Turnover Analysis</h2>
          <p className="text-gray-500 mt-1">Inventory efficiency metrics</p>
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
          <div className="absolute top-0 right-0 p-4 opacity-20"><span className="text-6xl">📦</span></div>
          <p className="text-gray-400 font-medium mb-2">Turnover Ratio</p>
          <div className="flex items-baseline gap-3"><span className="text-6xl font-bold text-[#D1F25E]">{turnoverRatio !== undefined ? turnoverRatio.toFixed(1) : 'N/A'}</span></div>
          <p className="text-sm text-gray-400 mt-2">Times per year</p>
        </div>

        <div className={`${efficiencyBg} p-8 rounded-2xl border-2 ${efficiencyColor.replace('text-', 'border-')} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10"><span className="text-6xl">⚡</span></div>
          <p className="text-gray-600 font-medium mb-2">Efficiency Rating</p>
          <div className="flex items-baseline gap-3"><span className={`text-4xl font-bold ${efficiencyColor}`}>{efficiencyStatus}</span></div>
          <p className="text-sm text-gray-600 mt-2">{turnoverRatio >= 8 ? 'Optimal inventory management' : 'Room for improvement'}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-10">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><span className="text-2xl">📊</span> Industry Benchmarks</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm"><p className="font-bold text-gray-900">E-commerce</p><p className="text-gray-600 text-sm mt-1">4-6 times per year</p></div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm"><p className="font-bold text-gray-900">Retail (Apparel)</p><p className="text-gray-600 text-sm mt-1">2-4 times per year</p></div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm"><p className="font-bold text-gray-900">Grocery</p><p className="text-gray-600 text-sm mt-1">10-14 times per year</p></div>
          <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm"><p className="font-bold text-gray-900">Electronics</p><p className="text-gray-600 text-sm mt-1">5-8 times per year</p></div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-12">
        <button onClick={() => window.print()} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">🖨️ Print Report</button>
      </div>
    </div>
  );
}
