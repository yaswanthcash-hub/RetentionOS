'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EnhancedAuditFormData } from '@/types/enhanced-audit/enhanced-audit';
import { generateComprehensiveAudit } from '@/lib/enhanced-audit/audit-generator';
import EnhancedAuditDashboard from './components/EnhancedAuditDashboard';
import CurrencySelector from '@/components/CurrencySelector';

export default function EnhancedAuditPage() {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [currency, setCurrency] = useState('INR'); // Default to INR

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Build the audit data object
    const auditData: EnhancedAuditFormData = {
      // Company Profile
      company: formData.get('company') as string,
      industry: formData.get('industry') as string,
      subIndustry: formData.get('subIndustry') as string || undefined,
      yearFounded: formData.get('yearFounded') ? Number(formData.get('yearFounded')) : undefined,
      employeeCount: formData.get('employeeCount') as string,
      websiteUrl: formData.get('websiteUrl') as string || undefined,

      // Financial Metrics
      monthlyRevenue: Number(formData.get('monthlyRevenue')),
      annualRevenue: Number(formData.get('annualRevenue')),
      revenueGrowthRate: Number(formData.get('revenueGrowthRate')),
      averageOrderValue: Number(formData.get('averageOrderValue')),
      averageMargin: Number(formData.get('averageMargin')),

      // Customer Base
      totalCustomers: Number(formData.get('totalCustomers')),
      monthlyNewCustomers: Number(formData.get('monthlyNewCustomers')),
      monthlyActiveCustomers: Number(formData.get('monthlyActiveCustomers')),
      averageCustomerLifespan: Number(formData.get('averageCustomerLifespan')),
      customerAcquisitionCost: Number(formData.get('customerAcquisitionCost')),

      // Behavioral Metrics
      repeatPurchaseRate: Number(formData.get('repeatPurchaseRate')),
      purchaseFrequency: Number(formData.get('purchaseFrequency')),
      averageTimeBetweenPurchases: Number(formData.get('averageTimeBetweenPurchases')),
      cartAbandonmentRate: Number(formData.get('cartAbandonmentRate')),
      returnRate: Number(formData.get('returnRate')),

      // Channel Performance
      emailOpenRate: Number(formData.get('emailOpenRate')),
      emailClickRate: Number(formData.get('emailClickRate')),
      emailConversionRate: Number(formData.get('emailConversionRate')),
      smsEngagementRate: formData.get('smsEngagementRate') ? Number(formData.get('smsEngagementRate')) : undefined,
      pushNotificationEngagementRate: formData.get('pushNotificationEngagementRate') ? Number(formData.get('pushNotificationEngagementRate')) : undefined,

      // Lifecycle Stage Scores (1-10)
      acquisition: Number(formData.get('acquisition')),
      activation: Number(formData.get('activation')),
      nurture: Number(formData.get('nurture')),
      retention: Number(formData.get('retention')),
      winback: Number(formData.get('winback')),
      advocacy: Number(formData.get('advocacy')),

      // Technology Stack
      emailPlatform: formData.get('emailPlatform') as string || 'None',
      smsPlatform: formData.get('smsPlatform') as string || 'None',
      pushNotificationPlatform: formData.get('pushNotificationPlatform') as string || 'None',
      reviewsPlatform: formData.get('reviewsPlatform') as string || 'None',
      loyaltyPlatform: formData.get('loyaltyPlatform') as string || 'None',
      cdpPlatform: formData.get('cdpPlatform') as string || 'None',
      analyticsPlatform: formData.get('analyticsPlatform') as string || 'None',
      automationPlatform: formData.get('automationPlatform') as string || 'None',

      // Advanced Capabilities
      activeFlows: Number(formData.get('activeFlows')) || 0,
      segmentCount: Number(formData.get('segmentCount')) || 0,
      personalizationLevel: formData.get('personalizationLevel') as string || 'none',
      predictiveAnalytics: formData.get('predictiveAnalytics') === 'true',
      aiRecommendations: formData.get('aiRecommendations') === 'true',
      crossChannelOrchestration: formData.get('crossChannelOrchestration') === 'true',

      // Data Quality
      dataCollectionQuality: Number(formData.get('dataCollectionQuality')),
      dataIntegrationLevel: Number(formData.get('dataIntegrationLevel')),
      attributionTracking: formData.get('attributionTracking') === 'true',

      // Team & Resources
      marketingTeamSize: Number(formData.get('marketingTeamSize')),
      retentionFocusPercent: Number(formData.get('retentionFocusPercent')),
      monthlyMarketingBudget: Number(formData.get('monthlyMarketingBudget')),

      // Contact Info
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      phone: formData.get('phone') as string || undefined,

      // Goals
      primaryGoal: formData.get('primaryGoal') as string,
      targetRetentionRate: formData.get('targetRetentionRate') ? Number(formData.get('targetRetentionRate')) : undefined,
      timeline: formData.get('timeline') as string || undefined,
    };

    // Generate comprehensive audit with currency
    const auditResults = generateComprehensiveAudit(auditData, currency);
    setResults({ ...auditResults, currency }); // Include currency in results
    setShowResults(true);
  };

  if (showResults && results) {
    return <EnhancedAuditDashboard results={results} />;
  }

  const totalSteps = 8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block">
            ← Back to Tools
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🚀 Enterprise Retention Audit
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get a comprehensive analysis worth $10,000+ in consulting value.
            We'll analyze 150+ data points to uncover opportunities for growth.
          </p>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold text-gray-900">150+ Metrics</div>
            <div className="text-sm text-gray-600">Analyzed in seconds</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">💰</div>
            <div className="font-semibold text-gray-900">Financial Model</div>
            <div className="text-sm text-gray-600">36-month projections</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">🗺️</div>
            <div className="font-semibold text-gray-900">Roadmap</div>
            <div className="text-sm text-gray-600">3-phase action plan</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-semibold text-gray-900">ROI Focus</div>
            <div className="text-sm text-gray-600">Prioritized by impact</div>
          </div>
        </div>

        {/* Enhanced Progress Bar with Brand Colors */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-gray-900">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-semibold" style={{ color: '#D1F25E' }}>
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full transition-all duration-700 ease-out rounded-full"
              style={{
                width: `${(currentStep / totalSteps) * 100}%`,
                background: 'linear-gradient(90deg, #BFE043 0%, #D1F25E 100%)',
                boxShadow: '0 2px 8px rgba(209, 242, 94, 0.4)'
              }}
            />
          </div>

          {/* Step Indicators with Brand Colors */}
          <div className="flex justify-between mt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${s < currentStep ? 'bg-green-500 text-white' :
                  s === currentStep ? 'text-gray-900 shadow-lg scale-110' : 'bg-gray-200 text-gray-500'
                  }`} style={s === currentStep ? { background: 'linear-gradient(to bottom right, #BFE043, #D1F25E)' } : {}}>
                  {s < currentStep ? '✓' : s}
                </div>
                <span className={`text-xs mt-2 font-medium ${s === currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                  {s === 1 ? 'Profile' : s === 2 ? 'Finance' : s === 3 ? 'Metrics' : s === 4 ? 'Channels' : s === 5 ? 'Lifecycle' : s === 6 ? 'Tech' : s === 7 ? 'Contact' : 'Goals'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Step 1: Company Profile */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  👔 Company Profile
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency *
                  </label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Industry</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Electronics">Electronics</option>
                    <option value="B2B SaaS">B2B SaaS</option>
                    <option value="E-learning">E-learning</option>
                    <option value="Subscription Box">Subscription Box</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub-Industry (Optional)
                  </label>
                  <input
                    type="text"
                    name="subIndustry"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Athletic Wear, Skincare"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size *
                  </label>
                  <select
                    name="employeeCount"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year Founded (Optional)
                  </label>
                  <input
                    type="number"
                    name="yearFounded"
                    min="1900"
                    max="2025"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2020"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="websiteUrl"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial Metrics */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-2 border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                💰 Financial Metrics
              </h2>
              <p className="text-gray-600 mb-8">Help us understand your business scale and growth trajectory</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Revenue ({currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '$'}) *
                  </label>
                  <input
                    type="number"
                    name="monthlyRevenue"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="500000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Revenue ({currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '$'}) *
                  </label>
                  <input
                    type="number"
                    name="annualRevenue"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="6000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Revenue Growth Rate (%) *
                  </label>
                  <input
                    type="number"
                    name="revenueGrowthRate"
                    required
                    min="-100"
                    max="1000"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Order Value ({currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '$'}) *
                  </label>
                  <input
                    type="number"
                    name="averageOrderValue"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="75"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Margin (%) *
                  </label>
                  <input
                    type="number"
                    name="averageMargin"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="45"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Customer Base */}
          {currentStep === 3 && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                👥 Customer Base
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Customers *
                  </label>
                  <input
                    type="number"
                    name="totalCustomers"
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly New Customers *
                  </label>
                  <input
                    type="number"
                    name="monthlyNewCustomers"
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Active Customers *
                  </label>
                  <input
                    type="number"
                    name="monthlyActiveCustomers"
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Customer Lifespan (months) *
                  </label>
                  <input
                    type="number"
                    name="averageCustomerLifespan"
                    required
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Acquisition Cost ($) *
                  </label>
                  <input
                    type="number"
                    name="customerAcquisitionCost"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Behavioral Metrics */}
          {currentStep === 4 && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📊 Behavioral Metrics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Repeat Purchase Rate (%) *
                  </label>
                  <input
                    type="number"
                    name="repeatPurchaseRate"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="35"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Frequency (per year) *
                  </label>
                  <input
                    type="number"
                    name="purchaseFrequency"
                    required
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avg Time Between Purchases (days) *
                  </label>
                  <input
                    type="number"
                    name="averageTimeBetweenPurchases"
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cart Abandonment Rate (%) *
                  </label>
                  <input
                    type="number"
                    name="cartAbandonmentRate"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="65"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Rate (%) *
                  </label>
                  <input
                    type="number"
                    name="returnRate"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Channel Performance & Lifecycle Scores */}
          {currentStep === 5 && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📱 Channel Performance
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Open Rate (%) *
                  </label>
                  <input
                    type="number"
                    name="emailOpenRate"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="22"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Click Rate (%) *
                  </label>
                  <input
                    type="number"
                    name="emailClickRate"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Conversion Rate (%) *
                  </label>
                  <input
                    type="number"
                    name="emailConversionRate"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMS Engagement Rate (%) - Optional
                  </label>
                  <input
                    type="number"
                    name="smsEngagementRate"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Push Notification Engagement (%) - Optional
                  </label>
                  <input
                    type="number"
                    name="pushNotificationEngagementRate"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ♻️ Lifecycle Stage Maturity (Rate 1-10)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Rate each lifecycle stage based on your current capabilities and performance
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'acquisition', label: 'Acquisition', desc: 'Getting new customers' },
                  { name: 'activation', label: 'Activation', desc: 'First purchase experience' },
                  { name: 'nurture', label: 'Nurture', desc: 'Engagement programs' },
                  { name: 'retention', label: 'Retention', desc: 'Keeping customers active' },
                  { name: 'winback', label: 'Winback', desc: 'Reactivating churned customers' },
                  { name: 'advocacy', label: 'Advocacy', desc: 'Referrals & reviews' },
                ].map((stage) => (
                  <div key={stage.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {stage.label} *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">{stage.desc}</p>
                    <input
                      type="number"
                      name={stage.name}
                      required
                      min="1"
                      max="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="7"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Technology Stack */}
          {currentStep === 6 && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                ⚙️ Technology Stack
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Platform
                  </label>
                  <input
                    type="text"
                    name="emailPlatform"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Klaviyo, Mailchimp, MoEngage, WebEngage, Netcore, None"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMS Platform
                  </label>
                  <input
                    type="text"
                    name="smsPlatform"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Attentive, Postscript, MSG91, Gupshup, Kaleyra, None"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Push Notification Platform
                  </label>
                  <input
                    type="text"
                    name="pushNotificationPlatform"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., OneSignal, Pushwoosh, MoEngage, CleverTap, None"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reviews Platform
                  </label>
                  <input
                    type="text"
                    name="reviewsPlatform"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Yotpo, Trustpilot, Feefo, Bazaarvoice, None"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loyalty Platform
                  </label>
                  <input
                    type="text"
                    name="loyaltyPlatform"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Smile.io, LoyaltyLion, Capillary, Xoxoday, Zinrelo, None"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CDP Platform
                  </label>
                  <input
                    type="text"
                    name="cdpPlatform"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Segment, mParticle, MoEngage, WebEngage, CleverTap, None"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Analytics Platform
                  </label>
                  <input
                    type="text"
                    name="analyticsPlatform"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Google Analytics, Mixpanel, CleverTap, MoEngage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marketing Automation Platform
                  </label>
                  <input
                    type="text"
                    name="automationPlatform"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., HubSpot, Marketo, WebEngage, MoEngage, Zoho, None"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Advanced Capabilities
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Active Marketing Flows *
                  </label>
                  <input
                    type="number"
                    name="activeFlows"
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Segments *
                  </label>
                  <input
                    type="number"
                    name="segmentCount"
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personalization Level *
                  </label>
                  <select
                    name="personalizationLevel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="none">None</option>
                    <option value="basic">Basic (Name, Location)</option>
                    <option value="moderate">Moderate (Behavioral)</option>
                    <option value="advanced">Advanced (Predictive)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="predictiveAnalytics"
                      value="true"
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Predictive Analytics
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="aiRecommendations"
                      value="true"
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      AI Recommendations
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="crossChannelOrchestration"
                      value="true"
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Cross-Channel Orchestration
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Data Quality & Team */}
          {currentStep === 7 && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📈 Data Quality & Team Resources
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Collection Quality (1-10) *
                  </label>
                  <input
                    type="number"
                    name="dataCollectionQuality"
                    required
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="7"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Integration Level (1-10) *
                  </label>
                  <input
                    type="number"
                    name="dataIntegrationLevel"
                    required
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="6"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="attributionTracking"
                    value="true"
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Attribution Tracking Enabled
                  </label>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Team & Budget
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marketing Team Size *
                  </label>
                  <input
                    type="number"
                    name="marketingTeamSize"
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Retention Focus (%) *
                  </label>
                  <input
                    type="number"
                    name="retentionFocusPercent"
                    required
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Marketing Budget ($) *
                  </label>
                  <input
                    type="number"
                    name="monthlyMarketingBudget"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Contact Info & Goals */}
          {currentStep === 8 && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📋 Contact Information & Goals
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role/Title *
                  </label>
                  <input
                    type="text"
                    name="role"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Marketing Director"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🎯 Your Goals
              </h3>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Goal *
                  </label>
                  <select
                    name="primaryGoal"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your primary goal</option>
                    <option value="increase-retention">Increase Retention Rate</option>
                    <option value="reduce-churn">Reduce Churn</option>
                    <option value="grow-clv">Grow Customer Lifetime Value</option>
                    <option value="improve-engagement">Improve Customer Engagement</option>
                    <option value="optimize-campaigns">Optimize Marketing Campaigns</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Retention Rate (%) - Optional
                    </label>
                    <input
                      type="number"
                      name="targetRetentionRate"
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="80"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target CLV ({currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '$'}) - Optional
                    </label>
                    <input
                      type="number"
                      name="targetCLV"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Premium Navigation Buttons with Brand Colors */}
          <div className="flex justify-between items-center pt-8">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
              >
                ← Previous
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                className="px-8 py-3 rounded-xl font-bold transition-all duration-200 flex items-center gap-2 text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ background: 'linear-gradient(to right, #BFE043, #D1F25E)' }}
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 text-gray-900 shadow-xl hover:shadow-2xl transform hover:scale-105"
                style={{ background: 'linear-gradient(to right, #10B981, #059669)' }}
              >
                <span className="flex items-center gap-2 text-white">
                  🚀 Generate My Comprehensive Report
                </span>
              </button>
            )}
          </div>
        </form>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            🔒 Your data is secure and will never be shared with third parties
          </p>
          <div className="flex justify-center gap-8 text-xs text-gray-400">
            <span>✓ GDPR Compliant</span>
            <span>✓ SOC 2 Type II</span>
            <span>✓ 256-bit Encryption</span>
          </div>
        </div>
      </div >
    </div >
  );
}
