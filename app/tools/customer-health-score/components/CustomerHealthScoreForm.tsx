'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface CustomerHealthScoreFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function CustomerHealthScoreForm({ onSubmit, currency, language }: CustomerHealthScoreFormProps) {
  const [formData, setFormData] = useState({
    product_usage: "",
    support_tickets: "",
    payment_status: "",
    engagement_score: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const product_usage = Number(formData.product_usage);
      const support_tickets = Number(formData.support_tickets);
      const engagement_score = Number(formData.engagement_score);
      const { payment_status } = formData;

      if (product_usage < 0 || support_tickets < 0 || engagement_score < 0) {
        alert("Please enter non-negative values.");
        return;
      }

      // Calculation logic
      let health_score = 0;

      // Product usage (0-40 points)
      // Assuming 100% usage vs baseline is ideal (40 points)
      health_score += Math.min(product_usage * 0.4, 40);

      // Support tickets (0-20 points, inverse)
      if (support_tickets === 0) health_score += 20;
      else if (support_tickets <= 2) health_score += 15;
      else if (support_tickets <= 4) health_score += 10;
      else health_score += 5;

      // Payment status (0-20 points)
      if (payment_status === 'Current') health_score += 20;
      else if (payment_status === 'Late') health_score += 10;
      else health_score += 0;

      // Engagement (0-20 points)
      // Assuming engagement score is out of 100
      health_score += Math.min(engagement_score * 0.2, 20);

      let health_level, health_color, action;
      if (health_score >= 80) {
        health_level = 'Healthy';
        health_color = 'text-green-600';
        action = 'Customer is thriving - focus on expansion';
      } else if (health_score >= 60) {
        health_level = 'Stable';
        health_color = 'text-blue-600';
        action = 'Monitor and maintain current service';
      } else if (health_score >= 40) {
        health_level = 'At Risk';
        health_color = 'text-yellow-600';
        action = 'Proactive outreach needed';
      } else {
        health_level = 'Critical';
        health_color = 'text-red-600';
        action = 'Immediate intervention required';
      }

      const results = {
        health_score,
        health_level,
        action,
        product_usage,
        support_tickets,
        payment_status,
        engagement_score,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Indicators</h2>
          <p className="text-gray-600">
            Rate your customer across these four key dimensions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Product Usage vs Baseline (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.product_usage}
                  onChange={(e) => setFormData({ ...formData, product_usage: e.target.value })}
                  placeholder="e.g. 85"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">How much they use the product compared to expected.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Support Tickets (Last 30 Days)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.support_tickets}
                  onChange={(e) => setFormData({ ...formData, support_tickets: e.target.value })}
                  placeholder="e.g. 2"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🎫</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Number of support requests.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Payment Status
              </label>
              <div className="relative">
                <select
                  value={formData.payment_status}
                  onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none appearance-none bg-white"
                  required
                >
                  <option value="">Select Status...</option>
                  <option value="Current">Current (Paid on time)</option>
                  <option value="Late">Late (Overdue)</option>
                  <option value="Failed">Failed (Payment error)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">💳</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Current billing standing.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Engagement Score (0-100)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.engagement_score}
                  onChange={(e) => setFormData({ ...formData, engagement_score: e.target.value })}
                  placeholder="e.g. 75"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  max="100"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📊</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Marketing/Community engagement level.</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Calculate Health Score →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
