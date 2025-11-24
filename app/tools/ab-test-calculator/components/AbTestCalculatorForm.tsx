'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface AbTestCalculatorFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function AbTestCalculatorForm({ onSubmit, currency, language }: AbTestCalculatorFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"control_visitors":"","control_conversions":"","variant_visitors":"","variant_conversions":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { control_visitors, control_conversions, variant_visitors, variant_conversions } = data;

      // Calculation logic
      const control_rate = control_visitors > 0 ? 
        (control_conversions / control_visitors) * 100 : 0;
      const variant_rate = variant_visitors > 0 ? 
        (variant_conversions / variant_visitors) * 100 : 0;
      
      const lift = control_rate > 0 ? 
        ((variant_rate - control_rate) / control_rate) * 100 : 0;
      const absolute_difference = variant_rate - control_rate;
      
      // Simplified z-score calculation
      const p1 = control_conversions / control_visitors;
      const p2 = variant_conversions / variant_visitors;
      const p_pool = (control_conversions + variant_conversions) / (control_visitors + variant_visitors);
      const se = Math.sqrt(p_pool * (1 - p_pool) * (1/control_visitors + 1/variant_visitors));
      const z_score = se > 0 ? (p2 - p1) / se : 0;
      
      // Approximate confidence level
      let confidence_level, is_significant, recommendation;
      if (Math.abs(z_score) >= 2.58) {
        confidence_level = 99;
        is_significant = true;
        recommendation = 'Highly significant! Safe to implement variant';
      } else if (Math.abs(z_score) >= 1.96) {
        confidence_level = 95;
        is_significant = true;
        recommendation = 'Significant at 95% confidence. Implement variant';
      } else if (Math.abs(z_score) >= 1.65) {
        confidence_level = 90;
        is_significant = false;
        recommendation = 'Marginally significant. Consider more data';
      } else {
        confidence_level = 0;
        is_significant = false;
        recommendation = 'Not significant. Continue testing';
      }
      
      const results = {
        control_rate,
        variant_rate,
        lift,
        absolute_difference,
        confidence_level,
        is_significant,
        z_score,
        recommendation
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
          <label className="form-label">Control Visitors</label>
          <input
            type="number"
            value={formData.control_visitors}
            onChange={(e) => setFormData({...formData, control_visitors: e.target.value})}
            placeholder="Control Visitors"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Control Conversions</label>
          <input
            type="number"
            value={formData.control_conversions}
            onChange={(e) => setFormData({...formData, control_conversions: e.target.value})}
            placeholder="Control Conversions"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Variant Visitors</label>
          <input
            type="number"
            value={formData.variant_visitors}
            onChange={(e) => setFormData({...formData, variant_visitors: e.target.value})}
            placeholder="Variant Visitors"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Variant Conversions</label>
          <input
            type="number"
            value={formData.variant_conversions}
            onChange={(e) => setFormData({...formData, variant_conversions: e.target.value})}
            placeholder="Variant Conversions"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
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
