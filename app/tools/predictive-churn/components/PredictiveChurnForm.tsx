'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface PredictiveChurnFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function PredictiveChurnForm({ onSubmit, currency, language }: PredictiveChurnFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"engagement_score":"","payment_failures":"","support_tickets":"","last_purchase_days":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { engagement_score, payment_failures, support_tickets, last_purchase_days } = data;

      // Calculation logic
      // Risk scoring algorithm
      let risk_score = 0;
      
      // Engagement (0-40 points)
      risk_score += Math.max(0, 40 - (engagement_score * 0.4));
      
      // Payment failures (0-25 points)
      risk_score += Math.min(payment_failures * 10, 25);
      
      // Support tickets (0-15 points)
      risk_score += Math.min(support_tickets * 5, 15);
      
      // Recency (0-20 points)
      if (last_purchase_days > 90) risk_score += 20;
      else if (last_purchase_days > 60) risk_score += 15;
      else if (last_purchase_days > 30) risk_score += 10;
      else risk_score += 5;
      
      const churn_probability = Math.min(risk_score, 100);
      
      let risk_level, health_color, action;
      if (churn_probability >= 70) {
        risk_level = 'Critical';
        health_color = 'red';
        action = 'Immediate intervention required - personal outreach';
      } else if (churn_probability >= 50) {
        risk_level = 'High Risk';
        health_color = 'orange';
        action = 'Urgent win-back campaign needed';
      } else if (churn_probability >= 30) {
        risk_level = 'Medium Risk';
        health_color = 'yellow';
        action = 'Monitor closely, send engagement campaigns';
      } else {
        risk_level = 'Low Risk';
        health_color = 'green';
        action = 'Maintain current engagement strategy';
      }
      
      const results = {
        churn_probability,
        risk_level,
        risk_score,
        action,
        engagement_score,
        payment_failures,
        support_tickets,
        last_purchase_days,
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
          <label className="form-label">Engagement Score (0-100)</label>
          <input
            type="number"
            value={formData.engagement_score}
            onChange={(e) => setFormData({...formData, engagement_score: e.target.value})}
            placeholder="Engagement Score (0-100)"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Recent Payment Failures</label>
          <input
            type="number"
            value={formData.payment_failures}
            onChange={(e) => setFormData({...formData, payment_failures: e.target.value})}
            placeholder="Recent Payment Failures"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Support Tickets (Last 30 Days)</label>
          <input
            type="number"
            value={formData.support_tickets}
            onChange={(e) => setFormData({...formData, support_tickets: e.target.value})}
            placeholder="Support Tickets (Last 30 Days)"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Days Since Last Purchase</label>
          <input
            type="number"
            value={formData.last_purchase_days}
            onChange={(e) => setFormData({...formData, last_purchase_days: e.target.value})}
            placeholder="Days Since Last Purchase"
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
