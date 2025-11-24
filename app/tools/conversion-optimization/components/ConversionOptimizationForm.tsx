'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface ConversionOptimizationFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function ConversionOptimizationForm({ onSubmit, currency, language }: ConversionOptimizationFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"visitors":"","conversions":"","average_order_value":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { visitors, conversions, average_order_value } = data;

      // Calculation logic
      const conversion_rate = visitors > 0 ? (conversions / visitors) * 100 : 0;
      const revenue = conversions * average_order_value;
      const revenue_per_visitor = visitors > 0 ? revenue / visitors : 0;
      
      // Optimization scenarios
      const improvement_10 = conversion_rate * 1.1;
      const improvement_25 = conversion_rate * 1.25;
      const improvement_50 = conversion_rate * 1.5;
      
      const additional_conversions_10 = visitors * (improvement_10 / 100) - conversions;
      const additional_conversions_25 = visitors * (improvement_25 / 100) - conversions;
      const additional_conversions_50 = visitors * (improvement_50 / 100) - conversions;
      
      const additional_revenue_10 = additional_conversions_10 * average_order_value;
      const additional_revenue_25 = additional_conversions_25 * average_order_value;
      const additional_revenue_50 = additional_conversions_50 * average_order_value;
      
      let health_status, health_color;
      if (conversion_rate >= 5) {
        health_status = 'Excellent';
        health_color = 'green';
      } else if (conversion_rate >= 3) {
        health_status = 'Good';
        health_color = 'blue';
      } else if (conversion_rate >= 1.5) {
        health_status = 'Fair';
        health_color = 'yellow';
      } else {
        health_status = 'Needs Improvement';
        health_color = 'red';
      }
      
      const results = {
        conversion_rate,
        revenue,
        revenue_per_visitor,
        improvement_10,
        improvement_25,
        improvement_50,
        additional_revenue_10,
        additional_revenue_25,
        additional_revenue_50,
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
          <label className="form-label">Total Visitors</label>
          <input
            type="number"
            value={formData.visitors}
            onChange={(e) => setFormData({...formData, visitors: e.target.value})}
            placeholder="Total Visitors"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Total Conversions</label>
          <input
            type="number"
            value={formData.conversions}
            onChange={(e) => setFormData({...formData, conversions: e.target.value})}
            placeholder="Total Conversions"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Average Order Value</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.average_order_value}
              onChange={(e) => setFormData({...formData, average_order_value: e.target.value})}
              placeholder="Average Order Value"
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
