'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface AovCalculatorFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function AovCalculatorForm({ onSubmit, currency, language }: AovCalculatorFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({
    total_revenue: "",
    number_of_orders: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const total_revenue = Number(formData.total_revenue);
      const number_of_orders = Number(formData.number_of_orders);

      if (total_revenue < 0 || number_of_orders < 0) {
        alert("Please enter non-negative values.");
        return;
      }

      // Calculation logic
      const aov = number_of_orders > 0 ? total_revenue / number_of_orders : 0;
      const increase_10 = aov * 1.1 * number_of_orders;
      const increase_20 = aov * 1.2 * number_of_orders;
      const increase_30 = aov * 1.3 * number_of_orders;

      const results = {
        aov,
        total_revenue,
        number_of_orders,
        potential_revenue_10: increase_10,
        potential_revenue_20: increase_20,
        potential_revenue_30: increase_30,
        additional_revenue_10: increase_10 - total_revenue,
        additional_revenue_20: increase_20 - total_revenue,
        additional_revenue_30: increase_30 - total_revenue,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sales Data</h2>
          <p className="text-gray-600">
            Enter your total revenue and order count for a specific period.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Total Revenue
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
                  value={formData.total_revenue}
                  onChange={(e) => setFormData({ ...formData, total_revenue: e.target.value })}
                  placeholder="e.g. 50000"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Gross sales before expenses.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Number of Orders
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.number_of_orders}
                  onChange={(e) => setFormData({ ...formData, number_of_orders: e.target.value })}
                  placeholder="e.g. 450"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📦</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Total count of transactions.</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Calculate AOV →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
