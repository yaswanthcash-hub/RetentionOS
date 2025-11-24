'use client';

import { useState } from 'react';

interface CustomerLifespanFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function CustomerLifespanForm({ onSubmit, currency, language }: CustomerLifespanFormProps) {
  const [formData, setFormData] = useState({
    total_active_months: "",
    total_customers: "",
    monthly_churn_rate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const total_active_months = Number(formData.total_active_months);
      const total_customers = Number(formData.total_customers);
      const monthly_churn_rate = Number(formData.monthly_churn_rate);

      if (total_active_months < 0 || total_customers < 0 || monthly_churn_rate < 0) {
        alert("Please enter non-negative values.");
        return;
      }

      // Calculation logic
      const average_lifespan_months = total_customers > 0 ?
        total_active_months / total_customers : 0;
      const average_lifespan_years = average_lifespan_months / 12;

      // Alternative calculation using churn rate
      const lifespan_from_churn = monthly_churn_rate > 0 ?
        1 / (monthly_churn_rate / 100) : null;
      const lifespan_years_from_churn = lifespan_from_churn ? lifespan_from_churn / 12 : null;

      let health_status, health_color;
      if (average_lifespan_years >= 3) {
        health_status = 'Excellent';
        health_color = 'text-green-600';
      } else if (average_lifespan_years >= 2) {
        health_status = 'Good';
        health_color = 'text-blue-600';
      } else if (average_lifespan_years >= 1) {
        health_status = 'Fair';
        health_color = 'text-yellow-600';
      } else {
        health_status = 'Needs Improvement';
        health_color = 'text-red-600';
      }

      const results = {
        average_lifespan_months,
        average_lifespan_years,
        lifespan_from_churn,
        lifespan_years_from_churn,
        total_active_months,
        total_customers,
        monthly_churn_rate,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lifespan Data</h2>
          <p className="text-gray-600">
            Enter your customer data to calculate average lifespan. You can use either historical data or churn rate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Total Active Customer Months
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.total_active_months}
                  onChange={(e) => setFormData({ ...formData, total_active_months: e.target.value })}
                  placeholder="e.g. 12000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📅</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Sum of all months your customers have been active.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Total Customers Analyzed
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.total_customers}
                  onChange={(e) => setFormData({ ...formData, total_customers: e.target.value })}
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
              <p className="text-xs text-gray-500">Number of customers included in the calculation.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Monthly Churn Rate (%) <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.monthly_churn_rate}
                  onChange={(e) => setFormData({ ...formData, monthly_churn_rate: e.target.value })}
                  placeholder="e.g. 5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">If provided, we'll calculate projected lifespan based on churn (1 / Churn Rate).</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Calculate Lifespan →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
