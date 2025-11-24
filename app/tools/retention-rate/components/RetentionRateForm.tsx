'use client';

import { useState } from 'react';

interface RetentionRateFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function RetentionRateForm({ onSubmit, currency, language }: RetentionRateFormProps) {
  const [formData, setFormData] = useState({
    customers_start: "",
    customers_end: "",
    new_customers: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const customers_start = Number(formData.customers_start);
      const customers_end = Number(formData.customers_end);
      const new_customers = Number(formData.new_customers);

      if (customers_start <= 0) {
        alert("Customers at start must be greater than 0");
        return;
      }

      // Calculation logic
      const customers_retained = customers_end - new_customers;
      const retention_rate = (customers_retained / customers_start) * 100;
      const churn_rate = 100 - retention_rate;
      const growth_rate = ((customers_end - customers_start) / customers_start) * 100;

      let health_status, health_color;
      if (retention_rate >= 90) {
        health_status = 'Excellent';
        health_color = 'text-green-600';
      } else if (retention_rate >= 80) {
        health_status = 'Good';
        health_color = 'text-blue-600';
      } else if (retention_rate >= 70) {
        health_status = 'Fair';
        health_color = 'text-yellow-600';
      } else {
        health_status = 'Poor';
        health_color = 'text-red-600';
      }

      const results = {
        retention_rate,
        churn_rate,
        customers_retained,
        growth_rate,
        health_status,
        health_color,
        customers_start,
        customers_end,
        new_customers
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculate Your Retention</h2>
          <p className="text-gray-600">
            Enter your customer counts for the period to see your retention performance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Customers at Start (CS)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.customers_start}
                  onChange={(e) => setFormData({ ...formData, customers_start: e.target.value })}
                  placeholder="e.g. 500"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">👥</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Total customers at the beginning of the period.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Customers at End (CE)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.customers_end}
                  onChange={(e) => setFormData({ ...formData, customers_end: e.target.value })}
                  placeholder="e.g. 550"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🏁</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Total customers at the end of the period.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                New Customers Acquired (CN)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.new_customers}
                  onChange={(e) => setFormData({ ...formData, new_customers: e.target.value })}
                  placeholder="e.g. 80"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">✨</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">New customers gained during this specific period.</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Calculate Retention Rate →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
