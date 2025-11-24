'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface BenchmarkingFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function BenchmarkingForm({ onSubmit, currency, language }: BenchmarkingFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({
    industry: '',
    monthly_revenue: '',
    total_customers: '',
    active_customers: '',
    churn_rate: '',
    cac: '',
    ltv: '',
    nps: '',
    cart_abandonment_rate: '',
    conversion_rate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert string inputs to numbers
    const monthly_revenue = parseFloat(formData.monthly_revenue) || 0;
    const total_customers = parseFloat(formData.total_customers) || 0;
    const active_customers = parseFloat(formData.active_customers) || 0;
    const churn_rate = parseFloat(formData.churn_rate) || 0;
    const cac = parseFloat(formData.cac) || 0;
    const ltv = parseFloat(formData.ltv) || 0;
    const nps = parseFloat(formData.nps) || 0;
    const cart_abandonment_rate = parseFloat(formData.cart_abandonment_rate) || 0;
    const conversion_rate = parseFloat(formData.conversion_rate) || 0;

    // Calculate derived metrics
    const arpu = total_customers > 0 ? monthly_revenue / total_customers : 0;
    const ltv_cac_ratio = cac > 0 ? ltv / cac : 0;
    const retention_rate = 100 - churn_rate;

    // Define industry benchmarks
    const benchmarks = {
      'ecommerce': {
        india: {
          arpu: 5000,
          churn_rate: 25,
          nps: 40,
          cart_abandonment: 70,
          conversion_rate: 2.5,
          ltv_cac_ratio: 3.5
        },
        global: {
          arpu: 8000,
          churn_rate: 20,
          nps: 50,
          cart_abandonment: 69,
          conversion_rate: 3.0,
          ltv_cac_ratio: 4.0
        }
      },
      'saas': {
        india: {
          arpu: 2000,
          churn_rate: 7,
          nps: 45,
          cart_abandonment: 50,
          conversion_rate: 5.0,
          ltv_cac_ratio: 4.0
        },
        global: {
          arpu: 15000,
          churn_rate: 5,
          nps: 55,
          cart_abandonment: 45,
          conversion_rate: 7.0,
          ltv_cac_ratio: 5.0
        }
      },
      'fintech': {
        india: {
          arpu: 800,
          churn_rate: 15,
          nps: 50,
          cart_abandonment: 60,
          conversion_rate: 4.0,
          ltv_cac_ratio: 3.0
        },
        global: {
          arpu: 5000,
          churn_rate: 12,
          nps: 55,
          cart_abandonment: 55,
          conversion_rate: 5.5,
          ltv_cac_ratio: 3.5
        }
      },
      'edtech': {
        india: {
          arpu: 10000,
          churn_rate: 30,
          nps: 48,
          cart_abandonment: 65,
          conversion_rate: 3.5,
          ltv_cac_ratio: 2.8
        },
        global: {
          arpu: 18000,
          churn_rate: 25,
          nps: 52,
          cart_abandonment: 60,
          conversion_rate: 4.5,
          ltv_cac_ratio: 3.2
        }
      }
    };

    const selectedBenchmark = benchmarks[formData.industry as keyof typeof benchmarks] || benchmarks['ecommerce'];

    // Calculate performance scores
    const scores = {
      arpu_score: (arpu / selectedBenchmark.india.arpu) * 100,
      churn_score: ((selectedBenchmark.india.churn_rate - churn_rate) / selectedBenchmark.india.churn_rate) * 100,
      nps_score: (nps / selectedBenchmark.india.nps) * 100,
      cart_score: ((selectedBenchmark.india.cart_abandonment - cart_abandonment_rate) / selectedBenchmark.india.cart_abandonment) * 100,
      conversion_score: (conversion_rate / selectedBenchmark.india.conversion_rate) * 100,
      ltv_cac_score: (ltv_cac_ratio / selectedBenchmark.india.ltv_cac_ratio) * 100
    };

    const overall_score = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;

    const results = {
      industry: formData.industry,
      monthly_revenue,
      total_customers,
      active_customers,
      churn_rate,
      cac,
      ltv,
      nps,
      cart_abandonment_rate,
      conversion_rate,
      arpu,
      ltv_cac_ratio,
      retention_rate,
      benchmarks: selectedBenchmark,
      scores,
      overall_score,
      health_status: overall_score >= 100 ? 'Excellent' : overall_score >= 80 ? 'Good' : overall_score >= 60 ? 'Fair' : 'Needs Improvement'
    };

    onSubmit(results);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="card">
        <h2 className="text-2xl font-bold mb-6">Enter Your Business Metrics</h2>

        <div className="space-y-6">
          <div>
            <label className="form-label">Industry</label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="form-input"
              required
            >
              <option value="">Select your industry</option>
              <option value="ecommerce">E-commerce</option>
              <option value="saas">SaaS</option>
              <option value="fintech">Fintech</option>
              <option value="edtech">Edtech</option>
            </select>
          </div>

          <div>
            <label className="form-label">Monthly Revenue</label>
            <div className="flex">
              <InlineCurrencySelector
                value={formCurrency}
                onChange={setFormCurrency}
              />
              <input
                type="number"
                value={formData.monthly_revenue}
                onChange={(e) => setFormData({ ...formData, monthly_revenue: e.target.value })}
                placeholder="e.g., 1000000"
                className="form-input rounded-l-none flex-1"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Total Customers</label>
              <input
                type="number"
                value={formData.total_customers}
                onChange={(e) => setFormData({ ...formData, total_customers: e.target.value })}
                placeholder="e.g., 5000"
                className="form-input"
                min="0"
                required
              />
            </div>

            <div>
              <label className="form-label">Active Customers</label>
              <input
                type="number"
                value={formData.active_customers}
                onChange={(e) => setFormData({ ...formData, active_customers: e.target.value })}
                placeholder="e.g., 3500"
                className="form-input"
                min="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Monthly Churn Rate (%)</label>
              <input
                type="number"
                value={formData.churn_rate}
                onChange={(e) => setFormData({ ...formData, churn_rate: e.target.value })}
                placeholder="e.g., 5"
                className="form-input"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>

            <div>
              <label className="form-label">Net Promoter Score (NPS)</label>
              <input
                type="number"
                value={formData.nps}
                onChange={(e) => setFormData({ ...formData, nps: e.target.value })}
                placeholder="e.g., 40"
                className="form-input"
                min="-100"
                max="100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Customer Acquisition Cost (CAC)</label>
              <div className="flex">
                <InlineCurrencySelector
                  value={formCurrency}
                  onChange={setFormCurrency}
                />
                <input
                  type="number"
                  value={formData.cac}
                  onChange={(e) => setFormData({ ...formData, cac: e.target.value })}
                  placeholder="e.g., 500"
                  className="form-input rounded-l-none flex-1"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Customer Lifetime Value (LTV)</label>
              <div className="flex">
                <InlineCurrencySelector
                  value={formCurrency}
                  onChange={setFormCurrency}
                />
                <input
                  type="number"
                  value={formData.ltv}
                  onChange={(e) => setFormData({ ...formData, ltv: e.target.value })}
                  placeholder="e.g., 2000"
                  className="form-input rounded-l-none flex-1"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Cart Abandonment Rate (%)</label>
              <input
                type="number"
                value={formData.cart_abandonment_rate}
                onChange={(e) => setFormData({ ...formData, cart_abandonment_rate: e.target.value })}
                placeholder="e.g., 70"
                className="form-input"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>

            <div>
              <label className="form-label">Conversion Rate (%)</label>
              <input
                type="number"
                value={formData.conversion_rate}
                onChange={(e) => setFormData({ ...formData, conversion_rate: e.target.value })}
                placeholder="e.g., 2.5"
                className="form-input"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Generate Benchmark Report →
          </button>
        </div>
      </form>
    </div>
  );
}
