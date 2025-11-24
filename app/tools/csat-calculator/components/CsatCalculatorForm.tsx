'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface CsatCalculatorFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function CsatCalculatorForm({ onSubmit, currency, language }: CsatCalculatorFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"score_5":"","score_4":"","score_3":"","score_2":"","score_1":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { score_5, score_4, score_3, score_2, score_1 } = data;

      // Calculation logic
      const total_responses = score_5 + score_4 + score_3 + score_2 + score_1;
      const satisfied_responses = score_5 + score_4;
      const csat_score = total_responses > 0 ? (satisfied_responses / total_responses) * 100 : 0;
      const average_score = total_responses > 0 ? 
        (score_5 * 5 + score_4 * 4 + score_3 * 3 + score_2 * 2 + score_1 * 1) / total_responses : 0;
      const dissatisfied_responses = score_2 + score_1;
      const dissatisfied_rate = total_responses > 0 ? (dissatisfied_responses / total_responses) * 100 : 0;
      
      let health_status, health_color;
      if (csat_score >= 80) {
        health_status = 'Excellent';
        health_color = 'green';
      } else if (csat_score >= 70) {
        health_status = 'Good';
        health_color = 'blue';
      } else if (csat_score >= 60) {
        health_status = 'Fair';
        health_color = 'yellow';
      } else {
        health_status = 'Needs Improvement';
        health_color = 'red';
      }
      
      const results = {
        csat_score,
        average_score,
        satisfied_responses,
        dissatisfied_responses,
        dissatisfied_rate,
        total_responses,
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
          <label className="form-label">Very Satisfied (5)</label>
          <input
            type="number"
            value={formData.score_5}
            onChange={(e) => setFormData({...formData, score_5: e.target.value})}
            placeholder="Very Satisfied (5)"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Satisfied (4)</label>
          <input
            type="number"
            value={formData.score_4}
            onChange={(e) => setFormData({...formData, score_4: e.target.value})}
            placeholder="Satisfied (4)"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Neutral (3)</label>
          <input
            type="number"
            value={formData.score_3}
            onChange={(e) => setFormData({...formData, score_3: e.target.value})}
            placeholder="Neutral (3)"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Dissatisfied (2)</label>
          <input
            type="number"
            value={formData.score_2}
            onChange={(e) => setFormData({...formData, score_2: e.target.value})}
            placeholder="Dissatisfied (2)"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Very Dissatisfied (1)</label>
          <input
            type="number"
            value={formData.score_1}
            onChange={(e) => setFormData({...formData, score_1: e.target.value})}
            placeholder="Very Dissatisfied (1)"
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
