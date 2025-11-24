'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface WinbackCalculatorFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function WinbackCalculatorForm({ onSubmit, currency, language }: WinbackCalculatorFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"campaign_cost":"","customers_targeted":"","customers_returned":"","average_order_value":"","expected_purchases":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { campaign_cost, customers_targeted, customers_returned, average_order_value, expected_purchases } = data;

      // Calculation logic
      const win_back_rate = customers_targeted > 0 ? 
        (customers_returned / customers_targeted) * 100 : 0;
      const cost_per_return = customers_returned > 0 ? 
        campaign_cost / customers_returned : 0;
      const purchases = expected_purchases || 2;
      const revenue_per_customer = average_order_value * purchases;
      const total_revenue = customers_returned * revenue_per_customer;
      const roi = campaign_cost > 0 ? 
        ((total_revenue - campaign_cost) / campaign_cost) * 100 : 0;
      
      let health_status, health_color;
      if (win_back_rate >= 15) {
        health_status = 'Excellent';
        health_color = 'green';
      } else if (win_back_rate >= 10) {
        health_status = 'Good';
        health_color = 'blue';
      } else if (win_back_rate >= 5) {
        health_status = 'Fair';
        health_color = 'yellow';
      } else {
        health_status = 'Poor';
        health_color = 'red';
      }
      
      const results = {
        win_back_rate,
        cost_per_return,
        roi,
        total_revenue,
        revenue_per_customer,
        campaign_cost,
        customers_targeted,
        customers_returned,
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
          <label className="form-label">Campaign Cost</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.campaign_cost}
              onChange={(e) => setFormData({...formData, campaign_cost: e.target.value})}
              placeholder="Campaign Cost"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Lapsed Customers Targeted</label>
          <input
            type="number"
            value={formData.customers_targeted}
            onChange={(e) => setFormData({...formData, customers_targeted: e.target.value})}
            placeholder="Lapsed Customers Targeted"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Customers Won Back</label>
          <input
            type="number"
            value={formData.customers_returned}
            onChange={(e) => setFormData({...formData, customers_returned: e.target.value})}
            placeholder="Customers Won Back"
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

        <div className="mb-6">
          <label className="form-label">Expected Purchases (12 Months)</label>
          <input
            type="number"
            value={formData.expected_purchases}
            onChange={(e) => setFormData({...formData, expected_purchases: e.target.value})}
            placeholder="Expected Purchases (12 Months)"
            className="form-input"
            min="0"
            step="0.1"
            
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
