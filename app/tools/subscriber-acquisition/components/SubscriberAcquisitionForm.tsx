'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface SubscriberAcquisitionFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function SubscriberAcquisitionForm({ onSubmit, currency, language }: SubscriberAcquisitionFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"marketing_spend":"","new_subscribers":"","subscriber_ltv":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { marketing_spend, new_subscribers, subscriber_ltv } = data;

      // Calculation logic
      const cost_per_subscriber = new_subscribers > 0 ? marketing_spend / new_subscribers : 0;
      const roi = subscriber_ltv && marketing_spend > 0 ? 
        ((subscriber_ltv * new_subscribers - marketing_spend) / marketing_spend) * 100 : null;
      const ltv_to_cps_ratio = subscriber_ltv && cost_per_subscriber > 0 ? 
        subscriber_ltv / cost_per_subscriber : null;
      
      let health_status, health_color;
      if (cost_per_subscriber <= 2) {
        health_status = 'Excellent';
        health_color = 'green';
      } else if (cost_per_subscriber <= 5) {
        health_status = 'Good';
        health_color = 'blue';
      } else if (cost_per_subscriber <= 10) {
        health_status = 'Fair';
        health_color = 'yellow';
      } else {
        health_status = 'Too High';
        health_color = 'red';
      }
      
      const results = {
        cost_per_subscriber,
        roi,
        ltv_to_cps_ratio,
        marketing_spend,
        new_subscribers,
        subscriber_ltv,
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
          <label className="form-label">Marketing Spend</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.marketing_spend}
              onChange={(e) => setFormData({...formData, marketing_spend: e.target.value})}
              placeholder="Marketing Spend"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">New Subscribers</label>
          <input
            type="number"
            value={formData.new_subscribers}
            onChange={(e) => setFormData({...formData, new_subscribers: e.target.value})}
            placeholder="New Subscribers"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Subscriber Lifetime Value</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.subscriber_ltv}
              onChange={(e) => setFormData({...formData, subscriber_ltv: e.target.value})}
              placeholder="Subscriber Lifetime Value"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              
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
