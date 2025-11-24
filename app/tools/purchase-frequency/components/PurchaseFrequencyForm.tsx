'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface PurchaseFrequencyFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function PurchaseFrequencyForm({ onSubmit, currency, language }: PurchaseFrequencyFormProps) {
  const [formData, setFormData] = useState({
    total_purchases: "",
    total_customers: "",
    time_period_days: "365"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const total_purchases = Number(formData.total_purchases);
      const total_customers = Number(formData.total_customers);
      const time_period_days = Number(formData.time_period_days);

      if (total_purchases < 0 || total_customers < 0 || time_period_days <= 0) {
        alert("Please enter valid non-negative values.");
        return;
      }

      if (total_customers > total_purchases) {
        alert("Total customers cannot be greater than total purchases.");
        return;
      }

      // Calculation logic
      const purchase_frequency = total_customers > 0 ? total_purchases / total_customers : 0;
      const purchases_per_month = (purchase_frequency / time_period_days) * 30;
      const purchases_per_year = (purchase_frequency / time_period_days) * 365;
      const days_between_purchases = purchase_frequency > 0 ? time_period_days / purchase_frequency : 0;
      const repeat_customers = total_purchases - total_customers; // Simplified estimation
      const repeat_rate = total_customers > 0 ? (repeat_customers / total_customers) * 100 : 0;

      let health_status, health_color;
      if (purchase_frequency >= 4) {
        health_status = 'Excellent';
        health_color = 'text-green-600';
      } else if (purchase_frequency >= 2.5) {
        health_status = 'Good';
        health_color = 'text-blue-600';
      } else if (purchase_frequency >= 1.5) {
        health_status = 'Fair';
        health_color = 'text-yellow-600';
      } else {
        health_status = 'Needs Improvement';
        health_color = 'text-red-600';
      }

      const results = {
        purchase_frequency,
        purchases_per_month,
        purchases_per_year,
        days_between_purchases,
        repeat_rate,
        total_purchases,
        total_customers,
        time_period_days,
        health_status,
        health_color
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Transaction Data</h2>
          <p className="text-gray-600">
            Enter your sales data for a specific time period (e.g., last 12 months).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Total Number of Purchases
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.total_purchases}
                  onChange={(e) => setFormData({ ...formData, total_purchases: e.target.value })}
                  placeholder="e.g. 12500"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🛒</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">All orders in the period.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Total Unique Customers
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
              <p className="text-xs text-gray-500">Unique buyers in the period.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Time Period (Days)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.time_period_days}
                  onChange={(e) => setFormData({ ...formData, time_period_days: e.target.value })}
                  placeholder="e.g. 365"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📅</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Duration of the data set (e.g. 365 for a year).</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Calculate Frequency →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
