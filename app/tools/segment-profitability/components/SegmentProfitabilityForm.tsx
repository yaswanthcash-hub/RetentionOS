'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface SegmentProfitabilityFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function SegmentProfitabilityForm({ onSubmit, currency, language }: SegmentProfitabilityFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({
    segment_revenue: "",
    segment_costs: "",
    segment_size: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const segment_revenue = Number(formData.segment_revenue);
      const segment_costs = Number(formData.segment_costs);
      const segment_size = Number(formData.segment_size);

      if (segment_revenue < 0 || segment_costs < 0 || segment_size < 0) {
        alert("Please enter non-negative values.");
        return;
      }

      // Calculation logic
      const gross_profit = segment_revenue - segment_costs;
      const profit_margin = segment_revenue > 0 ? (gross_profit / segment_revenue) * 100 : 0;
      const revenue_per_customer = segment_size > 0 ? segment_revenue / segment_size : 0;
      const cost_per_customer = segment_size > 0 ? segment_costs / segment_size : 0;
      const profit_per_customer = segment_size > 0 ? gross_profit / segment_size : 0;
      const roi = segment_costs > 0 ? (gross_profit / segment_costs) * 100 : 0;

      let health_status, health_color;
      if (profit_margin >= 40) {
        health_status = 'Highly Profitable';
        health_color = 'text-green-600';
      } else if (profit_margin >= 25) {
        health_status = 'Profitable';
        health_color = 'text-blue-600';
      } else if (profit_margin >= 10) {
        health_status = 'Marginally Profitable';
        health_color = 'text-yellow-600';
      } else {
        health_status = 'Unprofitable';
        health_color = 'text-red-600';
      }

      const results = {
        gross_profit,
        profit_margin,
        revenue_per_customer,
        cost_per_customer,
        profit_per_customer,
        roi,
        segment_revenue,
        segment_costs,
        segment_size,
        health_status,
        health_color,
        currency: formCurrency
      };

      onSubmit(results);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Segment Financials</h2>
          <p className="text-gray-600">
            Enter revenue and cost data for a specific customer segment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Segment Revenue
              </label>
              <div className="flex rounded-xl shadow-sm">
                <div className="z-10">
                  <InlineCurrencySelector
                    value={formCurrency}
                    onChange={setFormCurrency}
                  />
                </div>
                <input
                  type="number"
                  value={formData.segment_revenue}
                  onChange={(e) => setFormData({ ...formData, segment_revenue: e.target.value })}
                  placeholder="e.g. 50000"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Total revenue from this segment.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Segment Costs
              </label>
              <div className="flex rounded-xl shadow-sm">
                <div className="z-10">
                  <InlineCurrencySelector
                    value={formCurrency}
                    onChange={setFormCurrency}
                  />
                </div>
                <input
                  type="number"
                  value={formData.segment_costs}
                  onChange={(e) => setFormData({ ...formData, segment_costs: e.target.value })}
                  placeholder="e.g. 30000"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Total costs (COGS + Marketing) for this segment.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Number of Customers
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.segment_size}
                  onChange={(e) => setFormData({ ...formData, segment_size: e.target.value })}
                  placeholder="e.g. 500"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">👥</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Total number of customers in this segment.</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Calculate Profitability →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
