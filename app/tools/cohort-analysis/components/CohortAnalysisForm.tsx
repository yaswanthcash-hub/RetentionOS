'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface CohortAnalysisFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function CohortAnalysisForm({ onSubmit, currency, language }: CohortAnalysisFormProps) {
  const [formData, setFormData] = useState({
    cohort_size: "",
    month_0: "",
    month_1: "",
    month_3: "",
    month_6: "",
    month_12: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const cohort_size = Number(formData.cohort_size);
      const month_0 = Number(formData.month_0);
      const month_1 = Number(formData.month_1);
      const month_3 = Number(formData.month_3);
      const month_6 = Number(formData.month_6);
      const month_12 = Number(formData.month_12);

      if ([cohort_size, month_0, month_1, month_3, month_6, month_12].some(val => val < 0)) {
        alert("Please enter non-negative values.");
        return;
      }

      if (month_0 > cohort_size) {
        alert("Month 0 count cannot be greater than cohort size.");
        return;
      }

      // Calculation logic
      const retention_month_1 = cohort_size > 0 ? (month_1 / cohort_size) * 100 : 0;
      const retention_month_3 = cohort_size > 0 ? (month_3 / cohort_size) * 100 : 0;
      const retention_month_6 = cohort_size > 0 ? (month_6 / cohort_size) * 100 : 0;
      const retention_month_12 = cohort_size > 0 ? (month_12 / cohort_size) * 100 : 0;

      const churn_month_1 = 100 - retention_month_1;
      const churn_month_12 = 100 - retention_month_12;

      let health_status, health_color;
      if (retention_month_12 >= 50) {
        health_status = 'Excellent';
        health_color = 'text-green-600';
      } else if (retention_month_12 >= 30) {
        health_status = 'Good';
        health_color = 'text-blue-600';
      } else if (retention_month_12 >= 15) {
        health_status = 'Fair';
        health_color = 'text-yellow-600';
      } else {
        health_status = 'Needs Improvement';
        health_color = 'text-red-600';
      }

      const results = {
        retention_month_1,
        retention_month_3,
        retention_month_6,
        retention_month_12,
        churn_month_1,
        churn_month_12,
        cohort_size,
        month_0,
        month_1,
        month_3,
        month_6,
        month_12,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cohort Data</h2>
          <p className="text-gray-600">
            Enter the number of active customers at each milestone for a specific cohort.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Initial Cohort Size
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.cohort_size}
                  onChange={(e) => setFormData({ ...formData, cohort_size: e.target.value })}
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
              <p className="text-xs text-gray-500">Total customers acquired in period.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Month 0 (Start)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.month_0}
                  onChange={(e) => setFormData({ ...formData, month_0: e.target.value })}
                  placeholder="e.g. 1000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">#</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Active customers at start.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Month 1
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.month_1}
                  onChange={(e) => setFormData({ ...formData, month_1: e.target.value })}
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
                Month 3
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.month_3}
                  onChange={(e) => setFormData({ ...formData, month_3: e.target.value })}
                  placeholder="e.g. 450"
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
                Month 6
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.month_6}
                  onChange={(e) => setFormData({ ...formData, month_6: e.target.value })}
                  placeholder="e.g. 350"
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
                Month 12
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.month_12}
                  onChange={(e) => setFormData({ ...formData, month_12: e.target.value })}
                  placeholder="e.g. 300"
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
              Analyze Cohort →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
