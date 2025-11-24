'use client';

import { useState } from 'react';

interface RetentionCurveFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function RetentionCurveForm({ onSubmit, currency, language }: RetentionCurveFormProps) {
  const [formData, setFormData] = useState({
    starting_customers: "",
    month_1: "",
    month_3: "",
    month_6: "",
    month_12: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const starting_customers = Number(formData.starting_customers);
      const month_1 = Number(formData.month_1);
      const month_3 = Number(formData.month_3);
      const month_6 = Number(formData.month_6);
      const month_12 = Number(formData.month_12);

      if ([starting_customers, month_1, month_3, month_6, month_12].some(val => val < 0)) {
        alert("Please enter non-negative values.");
        return;
      }

      if (starting_customers === 0) {
        alert("Starting customers cannot be zero.");
        return;
      }

      // Calculation logic
      const retention_1 = starting_customers > 0 ? (month_1 / starting_customers) * 100 : 0;
      const retention_3 = starting_customers > 0 ? (month_3 / starting_customers) * 100 : 0;
      const retention_6 = starting_customers > 0 ? (month_6 / starting_customers) * 100 : 0;
      const retention_12 = starting_customers > 0 ? (month_12 / starting_customers) * 100 : 0;

      const churn_1 = 100 - retention_1;
      const churn_3 = 100 - retention_3;
      const churn_6 = 100 - retention_6;
      const churn_12 = 100 - retention_12;

      // Calculate decay rate (simplified exponential decay approximation)
      const decay_rate = retention_1 > 0 && retention_12 > 0 ?
        Math.pow(retention_12 / retention_1, 1 / 11) : 0;

      let curve_shape, curve_description, curve_color;
      if (retention_12 >= 80) {
        curve_shape = 'Excellent Retention';
        curve_description = 'Your retention is world-class. Focus on scaling acquisition.';
        curve_color = 'text-green-600';
      } else if (retention_12 >= 40) {
        curve_shape = 'Strong Retention';
        curve_description = 'Solid retention. Look for optimizations in early onboarding.';
        curve_color = 'text-blue-600';
      } else if (retention_1 - retention_3 > 20) {
        curve_shape = 'Steep Early Drop-off';
        curve_description = 'Significant churn in the first 3 months. Improve onboarding immediately.';
        curve_color = 'text-red-600';
      } else {
        curve_shape = 'Gradual Decay';
        curve_description = 'Retention is slowly bleeding. Focus on long-term engagement loops.';
        curve_color = 'text-yellow-600';
      }

      const results = {
        retention_1,
        retention_3,
        retention_6,
        retention_12,
        churn_1,
        churn_3,
        churn_6,
        churn_12,
        decay_rate,
        curve_shape,
        curve_description,
        curve_color,
        starting_customers,
        month_1,
        month_3,
        month_6,
        month_12
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Retention Data</h2>
          <p className="text-gray-600">
            Enter the number of active customers remaining at each time interval.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Starting Customers (Month 0)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.starting_customers}
                  onChange={(e) => setFormData({ ...formData, starting_customers: e.target.value })}
                  placeholder="e.g. 1000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">👥</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Total customers at the start.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Active at Month 1
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.month_1}
                  onChange={(e) => setFormData({ ...formData, month_1: e.target.value })}
                  placeholder="e.g. 800"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">#</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Active at Month 3
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.month_3}
                  onChange={(e) => setFormData({ ...formData, month_3: e.target.value })}
                  placeholder="e.g. 600"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">#</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Active at Month 6
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.month_6}
                  onChange={(e) => setFormData({ ...formData, month_6: e.target.value })}
                  placeholder="e.g. 500"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">#</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Active at Month 12
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.month_12}
                  onChange={(e) => setFormData({ ...formData, month_12: e.target.value })}
                  placeholder="e.g. 400"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">#</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Generate Curve →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
