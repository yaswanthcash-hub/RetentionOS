'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface LtvCacRatioFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function LtvCacRatioForm({ onSubmit, currency, language }: LtvCacRatioFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({
    customer_lifetime_value: "",
    customer_acquisition_cost: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const customer_lifetime_value = Number(formData.customer_lifetime_value);
      const customer_acquisition_cost = Number(formData.customer_acquisition_cost);

      if (customer_acquisition_cost <= 0) {
        alert("CAC must be greater than 0");
        return;
      }

      // Calculation logic
      const ratio = customer_lifetime_value / customer_acquisition_cost;

      let health_status, health_color, recommendation;
      if (ratio >= 5) {
        health_status = 'High Potential';
        health_color = 'text-blue-600';
        recommendation = 'Your ratio is very high (>5:1). You might be under-spending on growth. Consider increasing your CAC to acquire more customers faster.';
      } else if (ratio >= 3) {
        health_status = 'Healthy';
        health_color = 'text-green-600';
        recommendation = 'Excellent! A 3:1 ratio is the industry gold standard. You have a sustainable and profitable business model.';
      } else if (ratio >= 1) {
        health_status = 'At Risk';
        health_color = 'text-yellow-600';
        recommendation = 'Your margins are tight. Focus on increasing LTV through retention or decreasing CAC through organic channels.';
      } else {
        health_status = 'Unprofitable';
        health_color = 'text-red-600';
        recommendation = 'Critical warning: You are losing money on every customer. Pause paid acquisition immediately and fix unit economics.';
      }

      const results = {
        ratio,
        health_status,
        health_color,
        recommendation,
        customer_lifetime_value,
        customer_acquisition_cost,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Input Your Unit Economics</h2>
          <p className="text-gray-600">
            Enter your Customer Lifetime Value (LTV) and Customer Acquisition Cost (CAC) to see your ratio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Customer Lifetime Value (LTV)
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
                  value={formData.customer_lifetime_value}
                  onChange={(e) => setFormData({ ...formData, customer_lifetime_value: e.target.value })}
                  placeholder="e.g. 3000"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Average revenue a customer generates over their entire relationship.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Customer Acquisition Cost (CAC)
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
                  value={formData.customer_acquisition_cost}
                  onChange={(e) => setFormData({ ...formData, customer_acquisition_cost: e.target.value })}
                  placeholder="e.g. 1000"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Total cost to acquire a single paying customer.</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Calculate LTV:CAC Ratio →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
