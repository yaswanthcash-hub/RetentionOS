'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface CartAbandonmentFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function CartAbandonmentForm({ onSubmit, currency, language }: CartAbandonmentFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({
    carts_created: '',
    completed_purchases: '',
    average_cart_value: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const carts_created = parseFloat(formData.carts_created) || 0;
    const completed_purchases = parseFloat(formData.completed_purchases) || 0;
    const average_cart_value = parseFloat(formData.average_cart_value) || 0;

    if (carts_created < 0 || completed_purchases < 0 || average_cart_value < 0) {
      alert("Please enter non-negative values.");
      return;
    }

    if (completed_purchases > carts_created) {
      alert("Completed purchases cannot exceed carts created.");
      return;
    }

    // Calculate cart abandonment metrics
    const cart_abandonment_rate = carts_created > 0 ? ((carts_created - completed_purchases) / carts_created) * 100 : 0;
    const abandoned_carts = carts_created - completed_purchases;
    const lost_revenue = abandoned_carts * average_cart_value;
    const conversion_rate = carts_created > 0 ? (completed_purchases / carts_created) * 100 : 0;

    // Recovery potential scenarios
    const recovery_10 = lost_revenue * 0.10;
    const recovery_20 = lost_revenue * 0.20;
    const recovery_30 = lost_revenue * 0.30;

    const results = {
      cart_abandonment_rate,
      abandoned_carts,
      lost_revenue,
      conversion_rate,
      completed_purchases,
      carts_created,
      average_cart_value,
      recovery_potential_10: recovery_10,
      recovery_potential_20: recovery_20,
      recovery_potential_30: recovery_30,
      currency: formCurrency,
      health_status: cart_abandonment_rate < 60 ? 'Excellent' : cart_abandonment_rate < 75 ? 'Good' : 'Needs Improvement',
      health_color: cart_abandonment_rate < 60 ? 'text-green-600' : cart_abandonment_rate < 75 ? 'text-blue-600' : 'text-red-600'
    };

    onSubmit(results);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Checkout Data</h2>
          <p className="text-gray-600">
            Enter your cart and purchase data to calculate abandonment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Carts Created
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.carts_created}
                  onChange={(e) => setFormData({ ...formData, carts_created: e.target.value })}
                  placeholder="e.g. 1000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🛒</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Total shopping sessions initiated.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Completed Purchases
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.completed_purchases}
                  onChange={(e) => setFormData({ ...formData, completed_purchases: e.target.value })}
                  placeholder="e.g. 300"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">✅</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Successful checkouts.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Average Cart Value
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
                  value={formData.average_cart_value}
                  onChange={(e) => setFormData({ ...formData, average_cart_value: e.target.value })}
                  placeholder="e.g. 85"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Average value of items in a cart.</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Calculate Abandonment →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
