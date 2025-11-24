'use client';

import { useState } from 'react';
import { PremiumInput } from '@/components/ui/PremiumInput';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { PremiumHeader } from '@/components/ui/PremiumHeader';
import { PremiumCard } from '@/components/ui/PremiumCard';

interface CesCalculatorFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

type Touchpoint = 'support' | 'onboarding' | 'checkout' | 'product_usage' | 'general';

export default function CesCalculatorForm({ onSubmit, currency, language }: CesCalculatorFormProps) {
  const [touchpoint, setTouchpoint] = useState<Touchpoint>('support');
  const [formData, setFormData] = useState({
    score_7: "", // Very Easy
    score_6: "", // Easy
    score_5: "", // Somewhat Easy
    score_4: "", // Neutral
    score_3: "", // Somewhat Difficult
    score_2: "", // Difficult
    score_1: ""  // Very Difficult
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
        acc[key] = value === '' ? 0 : parseFloat(value as string);
        return acc;
      }, {} as Record<string, number>);

      const { score_7, score_6, score_5, score_4, score_3, score_2, score_1 } = data;

      // Calculation logic
      const total_responses = score_7 + score_6 + score_5 + score_4 + score_3 + score_2 + score_1;

      if (total_responses === 0) {
        alert("Please enter at least one response.");
        return;
      }

      const low_effort = score_7 + score_6 + score_5; // 5-7
      const high_effort = score_3 + score_2 + score_1; // 1-3

      // CES Score (Percentage of Low Effort)
      const ces_score = (low_effort / total_responses) * 100;

      // Average Score (1-7 scale)
      const average_score = (score_7 * 7 + score_6 * 6 + score_5 * 5 + score_4 * 4 + score_3 * 3 + score_2 * 2 + score_1 * 1) / total_responses;

      const high_effort_rate = (high_effort / total_responses) * 100;

      // Benchmarking based on Touchpoint
      let benchmark_status = 'Unknown';
      let benchmark_target = 0;
      let benchmark_gap = 0;

      switch (touchpoint) {
        case 'support':
          benchmark_target = 6.0; // Support should be very easy
          break;
        case 'onboarding':
          benchmark_target = 5.5; // Onboarding can be complex
          break;
        case 'checkout':
          benchmark_target = 6.5; // Checkout must be frictionless
          break;
        case 'product_usage':
          benchmark_target = 5.8;
          break;
        default:
          benchmark_target = 5.0;
      }

      benchmark_gap = average_score - benchmark_target;

      let health_status, health_color;
      if (average_score >= benchmark_target) {
        health_status = 'Excellent';
        health_color = 'text-green-600';
      } else if (average_score >= benchmark_target - 0.5) {
        health_status = 'Good';
        health_color = 'text-blue-600';
      } else if (average_score >= benchmark_target - 1.0) {
        health_status = 'Fair';
        health_color = 'text-yellow-600';
      } else {
        health_status = 'Needs Improvement';
        health_color = 'text-red-600';
      }

      const results = {
        ces_score,
        average_score,
        low_effort,
        high_effort,
        high_effort_rate,
        total_responses,
        health_status,
        health_color,
        touchpoint,
        benchmark_target,
        benchmark_gap,
        distribution: { score_7, score_6, score_5, score_4, score_3, score_2, score_1 }
      };

      onSubmit(results);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Calculation error:', error);
      alert('An error occurred while calculating. Please check your inputs and try again.');
    }
  };

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <PremiumHeader
          title="Customer Effort Score (CES)"
          description="Measure how easy it is for customers to interact with your business. Select a touchpoint for tailored benchmarks."
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Touchpoint Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-xl flex flex-wrap justify-center gap-1">
              {[
                { id: 'support', label: '🎧 Support' },
                { id: 'onboarding', label: '🚀 Onboarding' },
                { id: 'checkout', label: '🛒 Checkout' },
                { id: 'product_usage', label: '📱 Product' },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setTouchpoint(type.id as Touchpoint)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${touchpoint === type.id ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <PremiumCard title="Response Distribution" icon="📊">
            <p className="text-sm text-gray-600 mb-6">
              Enter the number of responses for each score on the 1-7 scale (1 = Very Difficult, 7 = Very Easy).
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-green-700 border-b border-green-100 pb-2">Low Effort (Good)</h4>
                <PremiumInput
                  label="7 - Very Easy"
                  type="number"
                  value={formData.score_7}
                  onChange={(e) => setFormData({ ...formData, score_7: e.target.value })}
                  placeholder="Count"
                  min="0"
                />
                <PremiumInput
                  label="6 - Easy"
                  type="number"
                  value={formData.score_6}
                  onChange={(e) => setFormData({ ...formData, score_6: e.target.value })}
                  placeholder="Count"
                  min="0"
                />
                <PremiumInput
                  label="5 - Somewhat Easy"
                  type="number"
                  value={formData.score_5}
                  onChange={(e) => setFormData({ ...formData, score_5: e.target.value })}
                  placeholder="Count"
                  min="0"
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-red-700 border-b border-red-100 pb-2">High Effort (Bad)</h4>
                <PremiumInput
                  label="3 - Somewhat Difficult"
                  type="number"
                  value={formData.score_3}
                  onChange={(e) => setFormData({ ...formData, score_3: e.target.value })}
                  placeholder="Count"
                  min="0"
                />
                <PremiumInput
                  label="2 - Difficult"
                  type="number"
                  value={formData.score_2}
                  onChange={(e) => setFormData({ ...formData, score_2: e.target.value })}
                  placeholder="Count"
                  min="0"
                />
                <PremiumInput
                  label="1 - Very Difficult"
                  type="number"
                  value={formData.score_1}
                  onChange={(e) => setFormData({ ...formData, score_1: e.target.value })}
                  placeholder="Count"
                  min="0"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <PremiumInput
                label="4 - Neutral"
                type="number"
                value={formData.score_4}
                onChange={(e) => setFormData({ ...formData, score_4: e.target.value })}
                placeholder="Count"
                min="0"
                className="max-w-xs mx-auto"
              />
            </div>
          </PremiumCard>

          <div className="pt-6">
            <PremiumButton
              type="submit"
              size="lg"
              fullWidth
              icon="→"
            >
              Analyze Effort Score
            </PremiumButton>
          </div>
        </form>
      </div>
    </div>
  );
}
