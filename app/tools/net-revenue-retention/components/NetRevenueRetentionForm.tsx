'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface NetRevenueRetentionFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function NetRevenueRetentionForm({ onSubmit, currency, language }: NetRevenueRetentionFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"starting_mrr":"","expansion_mrr":"","contraction_mrr":"","churned_mrr":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { starting_mrr, expansion_mrr, contraction_mrr, churned_mrr } = data;

      // Calculation logic
      const ending_mrr = starting_mrr + expansion_mrr - contraction_mrr - churned_mrr;
      const nrr = starting_mrr > 0 ? (ending_mrr / starting_mrr) * 100 : 0;
      const gross_revenue_retention = starting_mrr > 0 ? 
        ((starting_mrr - contraction_mrr - churned_mrr) / starting_mrr) * 100 : 0;
      const expansion_rate = starting_mrr > 0 ? (expansion_mrr / starting_mrr) * 100 : 0;
      const churn_rate = starting_mrr > 0 ? ((contraction_mrr + churned_mrr) / starting_mrr) * 100 : 0;
      
      let health_status, health_color;
      if (nrr >= 120) {
        health_status = 'World Class';
        health_color = 'green';
      } else if (nrr >= 110) {
        health_status = 'Excellent';
        health_color = 'green';
      } else if (nrr >= 100) {
        health_status = 'Good';
        health_color = 'blue';
      } else if (nrr >= 90) {
        health_status = 'Fair';
        health_color = 'yellow';
      } else {
        health_status = 'Needs Improvement';
        health_color = 'red';
      }
      
      const results = {
        nrr,
        gross_revenue_retention,
        expansion_rate,
        churn_rate,
        ending_mrr,
        starting_mrr,
        expansion_mrr,
        contraction_mrr,
        churned_mrr,
        health_status,
        health_color
      };

      onSubmit(results);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Calculation error:', error);
      alert('An error occurred while calculating. Please check your inputs and try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="card">
        <h2 className="text-2xl font-bold mb-6">Enter Your Data</h2>
        
        
        <div className="mb-6">
          <label className="form-label">Starting MRR</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.starting_mrr}
              onChange={(e) => setFormData({...formData, starting_mrr: e.target.value})}
              placeholder="Starting MRR"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Expansion MRR (Upsells)</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.expansion_mrr}
              onChange={(e) => setFormData({...formData, expansion_mrr: e.target.value})}
              placeholder="Expansion MRR (Upsells)"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Contraction MRR (Downgrades)</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.contraction_mrr}
              onChange={(e) => setFormData({...formData, contraction_mrr: e.target.value})}
              placeholder="Contraction MRR (Downgrades)"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Churned MRR</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.churned_mrr}
              onChange={(e) => setFormData({...formData, churned_mrr: e.target.value})}
              placeholder="Churned MRR"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Calculate →
          </button>
        </div>
      </form>
    </div>
  );
}
