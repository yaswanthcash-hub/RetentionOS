'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface RepeatPurchaseRateFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function RepeatPurchaseRateForm({ onSubmit, currency, language }: RepeatPurchaseRateFormProps) {
  const [formData, setFormData] = useState({
    repeat_customers: "",
    total_customers: "",
    time_period: "Annual"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const repeat_customers = Number(formData.repeat_customers);
      const total_customers = Number(formData.total_customers);
      const { time_period } = formData;

      if (repeat_customers < 0 || total_customers < 0) {
        alert("Please enter non-negative values.");
        return;
      }

      if (repeat_customers > total_customers) {
        alert("Repeat customers cannot be greater than total customers.");
        return;
      }

      // Calculation logic
      const repeat_rate = total_customers > 0 ?
        (repeat_customers / total_customers) * 100 : 0;
      const one_time_customers = total_customers - repeat_customers;
      const one_time_rate = 100 - repeat_rate;

      let health_status, health_color;
      if (repeat_rate >= 40) {
        health_status = 'Excellent';
        health_color = 'text-green-600';
      } else if (repeat_rate >= 25) {
        health_status = 'Good';
        health_color = 'text-blue-600';
      } else if (repeat_rate >= 15) {
        health_status = 'Fair';
        health_color = 'text-yellow-600';
      } else {
        health_status = 'Needs Improvement';
        health_color = 'text-red-600';
      }

      const results = {
        repeat_rate,
        repeat_customers,
        one_time_customers,
        one_time_rate,
        total_customers,
        health_status,
        health_color,
        time_period
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Data</h2>
          <p className="text-gray-600">
            Enter your customer counts for a specific time period.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Total Customers
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.total_customers}
                  onChange={(e) => setFormData({ ...formData, total_customers: e.target.value })}
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">👥</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Total unique customers in period.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Repeat Customers
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.repeat_customers}
                  onChange={(e) => setFormData({ ...formData, repeat_customers: e.target.value })}
                  placeholder="e.g. 1500"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔁</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Customers who bought 2+ times.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Time Period
              </label>
              <div className="relative">
                <select
                  value={formData.time_period}
                  onChange={(e) => setFormData({ ...formData, time_period: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none appearance-none bg-white"
                  required
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annual">Annual</option>
                  <option value="All Time">All Time</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📅</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Calculate Repeat Rate →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
