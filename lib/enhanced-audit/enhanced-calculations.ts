/**
 * Enhanced Calculations for Retention Audit
 * Advanced metrics and analysis functions
 */

import { EnhancedAuditFormData, CategoryScores, FinancialMetrics, MaturityLevel } from '@/types/enhanced-audit/enhanced-audit';
import { calculateCLV, calculateChurnRate } from '@/lib/calculations';
import { safeDivide, safePercentage } from '@/lib/utils';

// ==================== Score Calculations ====================

export const calculateOverallScore = (data: EnhancedAuditFormData): number => {
  const categoryScores = calculateCategoryScores(data);
  const weights = {
    acquisition: 0.15,
    activation: 0.15,
    nurture: 0.15,
    retention: 0.25,
    winback: 0.15,
    advocacy: 0.15,
  };

  const weightedScore =
    categoryScores.acquisition * weights.acquisition +
    categoryScores.activation * weights.activation +
    categoryScores.nurture * weights.nurture +
    categoryScores.retention * weights.retention +
    categoryScores.winback * weights.winback +
    categoryScores.advocacy * weights.advocacy;

  return Math.round(weightedScore);
};

export const calculateCategoryScores = (data: EnhancedAuditFormData): CategoryScores => {
  return {
    acquisition: calculateAcquisitionScore(data),
    activation: calculateActivationScore(data),
    nurture: calculateNurtureScore(data),
    retention: calculateRetentionScore(data),
    winback: calculateWinbackScore(data),
    advocacy: calculateAdvocacyScore(data),
  };
};

// ==================== Individual Category Scores ====================

export const calculateAcquisitionScore = (data: EnhancedAuditFormData): number => {
  let score = data.acquisition * 10; // Base score from user input (1-10 scale)

  // Adjust based on CAC efficiency
  const cacToAovRatio = safeDivide(data.customerAcquisitionCost, data.averageOrderValue) * 100;
  if (cacToAovRatio < 20) score += 5;
  else if (cacToAovRatio > 50) score -= 5;

  // Adjust based on growth rate
  if (data.revenueGrowthRate > 50) score += 5;
  else if (data.revenueGrowthRate < 10) score -= 5;

  return Math.max(0, Math.min(100, score));
};

export const calculateActivationScore = (data: EnhancedAuditFormData): number => {
  let score = data.activation * 10;

  // Adjust based on repeat purchase rate
  if (data.repeatPurchaseRate > 30) score += 5;
  else if (data.repeatPurchaseRate < 15) score -= 5;

  // Adjust based on email engagement
  if (data.emailOpenRate > 25 && data.emailClickRate > 3) score += 5;
  else if (data.emailOpenRate < 15) score -= 5;

  return Math.max(0, Math.min(100, score));
};

export const calculateNurtureScore = (data: EnhancedAuditFormData): number => {
  let score = data.nurture * 10;

  // Adjust based on automation capabilities
  if (data.activeFlows > 10) score += 5;
  else if (data.activeFlows < 3) score -= 5;

  // Adjust based on segmentation
  if (data.segmentCount > 5) score += 5;
  else if (data.segmentCount < 2) score -= 5;

  // Adjust based on personalization
  if (data.personalizationLevel === 'advanced') score += 5;
  else if (data.personalizationLevel === 'basic') score -= 5;

  return Math.max(0, Math.min(100, score));
};

export const calculateRetentionScore = (data: EnhancedAuditFormData): number => {
  let score = data.retention * 10;

  // Calculate implied retention rate
  const impliedRetentionRate = calculateImpliedRetentionRate(data);
  if (impliedRetentionRate > 60) score += 10;
  else if (impliedRetentionRate < 30) score -= 10;

  // Adjust based on purchase frequency
  if (data.purchaseFrequency > 4) score += 5;
  else if (data.purchaseFrequency < 2) score -= 5;

  // Adjust based on cart abandonment
  if (data.cartAbandonmentRate < 50) score += 5;
  else if (data.cartAbandonmentRate > 75) score -= 5;

  return Math.max(0, Math.min(100, score));
};

export const calculateWinbackScore = (data: EnhancedAuditFormData): number => {
  let score = data.winback * 10;

  // Adjust based on automation
  if (data.activeFlows > 5) score += 5;

  // Adjust based on data quality
  if (data.dataCollectionQuality > 7) score += 5;
  else if (data.dataCollectionQuality < 5) score -= 5;

  return Math.max(0, Math.min(100, score));
};

export const calculateAdvocacyScore = (data: EnhancedAuditFormData): number => {
  let score = data.advocacy * 10;

  // Adjust based on repeat purchase rate
  if (data.repeatPurchaseRate > 40) score += 10;
  else if (data.repeatPurchaseRate < 20) score -= 10;

  // Adjust based on platforms
  if (data.reviewsPlatform !== 'none') score += 5;
  if (data.loyaltyPlatform !== 'none') score += 5;

  return Math.max(0, Math.min(100, score));
};

// ==================== Financial Calculations ====================

export const calculateFinancialMetrics = (data: EnhancedAuditFormData): FinancialMetrics => {
  const currentCLV = calculateCLV(
    data.averageOrderValue,
    data.purchaseFrequency,
    data.averageCustomerLifespan,
    data.averageMargin
  );

  // Calculate potential CLV with improvements
  const potentialPurchaseFrequency = data.purchaseFrequency * 1.3; // 30% improvement
  const potentialLifespan = data.averageCustomerLifespan * 1.25; // 25% improvement

  const potentialCLV = calculateCLV(
    data.averageOrderValue,
    potentialPurchaseFrequency,
    potentialLifespan,
    data.averageMargin
  );

  const clvOpportunity = potentialCLV - currentCLV;

  // Calculate LTV:CAC ratios
  const ltvCacRatio = safeDivide(currentCLV, data.customerAcquisitionCost);
  const targetLtvCacRatio = 3.0;
  const targetCAC = safeDivide(currentCLV, targetLtvCacRatio);

  // Calculate revenue opportunities
  const impliedChurnRate = 100 - calculateImpliedRetentionRate(data);
  const annualChurnedCustomers = data.totalCustomers * (impliedChurnRate / 100);
  const annualRevenueAtRisk = annualChurnedCustomers * currentCLV;

  // If retention improves by 5%, how much additional revenue?
  const retentionImprovement = 0.05;
  const additionalRetainedCustomers = data.totalCustomers * retentionImprovement;
  const retentionRevenueOpportunity = additionalRetainedCustomers * currentCLV;

  const monthlyRecurringRevenue = data.monthlyRevenue;
  const projectedAnnualRevenue = data.annualRevenue * (1 + data.revenueGrowthRate / 100);

  return {
    currentCLV,
    potentialCLV,
    clvOpportunity,
    currentCAC: data.customerAcquisitionCost,
    targetCAC,
    ltvCacRatio,
    targetLtvCacRatio,
    annualRevenueAtRisk,
    retentionRevenueOpportunity,
    monthlyRecurringRevenue,
    projectedAnnualRevenue,
  };
};

// ==================== Maturity Assessment ====================

export const calculateMaturityLevel = (overallScore: number): MaturityLevel => {
  if (overallScore >= 81) return 'optimized';
  if (overallScore >= 61) return 'managed';
  if (overallScore >= 41) return 'defined';
  if (overallScore >= 21) return 'developing';
  return 'nascent';
};

// ==================== Benchmarking ====================

export const getIndustryBenchmark = (industry: string): number => {
  const benchmarks: Record<string, number> = {
    'ecommerce': 30,
    'saas': 80,
    'subscription': 60,
    'retail': 40,
    'b2b': 75,
    'marketplace': 45,
  };

  if (!industry) {
    return 60; // Default benchmark if no industry provided
  }

  return benchmarks[industry.toLowerCase()] || 60;
};

// ==================== Helper Calculations ====================

export const calculateImpliedRetentionRate = (data: EnhancedAuditFormData): number => {
  // Calculate retention rate from customer data
  const activeRate = safePercentage(data.monthlyActiveCustomers, data.totalCustomers);
  const repeatRate = data.repeatPurchaseRate;

  // Weighted average
  return (activeRate * 0.6 + repeatRate * 0.4);
};

export const calculateChurnRateFromData = (data: EnhancedAuditFormData): number => {
  const retentionRate = calculateImpliedRetentionRate(data);
  return 100 - retentionRate;
};

export const calculateCustomerHealth = (data: EnhancedAuditFormData): {
  healthy: number;
  atRisk: number;
  churned: number;
} => {
  const retentionRate = calculateImpliedRetentionRate(data);
  const churnRate = 100 - retentionRate;

  // Estimate distribution based on engagement metrics
  const healthy = Math.round(data.totalCustomers * (retentionRate / 100) * 0.7);
  const atRisk = Math.round(data.totalCustomers * (retentionRate / 100) * 0.3);
  const churned = Math.round(data.totalCustomers * (churnRate / 100));

  return { healthy, atRisk, churned };
};

// ==================== Technology Stack Scoring ====================

export const calculateTechnologyScore = (data: EnhancedAuditFormData): number => {
  let score = 0;
  const platforms = [
    data.emailPlatform,
    data.smsPlatform,
    data.pushNotificationPlatform,
    data.reviewsPlatform,
    data.loyaltyPlatform,
    data.cdpPlatform,
    data.analyticsPlatform,
    data.automationPlatform,
  ];

  // Count implemented platforms (not 'none')
  const implementedCount = platforms.filter(p => p !== 'none' && p !== '').length;
  score += (implementedCount / platforms.length) * 40;

  // Advanced capabilities bonus
  if (data.predictiveAnalytics) score += 15;
  if (data.aiRecommendations) score += 15;
  if (data.crossChannelOrchestration) score += 15;

  // Integration and data quality
  score += data.dataIntegrationLevel * 1.5;

  return Math.min(100, Math.round(score));
};

// ==================== Channel Performance Calculations ====================

export const calculateChannelScore = (
  openRate: number,
  clickRate: number,
  conversionRate: number
): number => {
  // Weighted score for email channel
  const openScore = Math.min(100, (openRate / 30) * 100); // 30% is excellent
  const clickScore = Math.min(100, (clickRate / 5) * 100); // 5% is excellent
  const conversionScore = Math.min(100, (conversionRate / 3) * 100); // 3% is excellent

  return Math.round(openScore * 0.3 + clickScore * 0.3 + conversionScore * 0.4);
};

// ==================== Risk Scoring ====================

export const calculateRiskScore = (data: EnhancedAuditFormData): {
  churnRisk: number;
  revenueRisk: number;
  competitiveRisk: number;
  technologyRisk: number;
} => {
  const retentionRate = calculateImpliedRetentionRate(data);
  const ltvCacRatio = safeDivide(
    calculateCLV(data.averageOrderValue, data.purchaseFrequency, data.averageCustomerLifespan, data.averageMargin),
    data.customerAcquisitionCost
  );

  return {
    churnRisk: retentionRate < 40 ? 80 : retentionRate < 60 ? 50 : 20,
    revenueRisk: ltvCacRatio < 2 ? 70 : ltvCacRatio < 3 ? 40 : 15,
    competitiveRisk: data.revenueGrowthRate < 20 ? 60 : data.revenueGrowthRate < 40 ? 35 : 15,
    technologyRisk: calculateTechnologyScore(data) < 40 ? 75 : calculateTechnologyScore(data) < 60 ? 45 : 20,
  };
};

// ==================== Opportunity Sizing ====================

export const calculateOpportunityValue = (
  data: EnhancedAuditFormData,
  improvementType: 'retention' | 'frequency' | 'aov' | 'margin',
  improvementPercent: number
): number => {
  const currentCLV = calculateCLV(
    data.averageOrderValue,
    data.purchaseFrequency,
    data.averageCustomerLifespan,
    data.averageMargin
  );

  let newCLV = currentCLV;

  switch (improvementType) {
    case 'retention':
      newCLV = calculateCLV(
        data.averageOrderValue,
        data.purchaseFrequency,
        data.averageCustomerLifespan * (1 + improvementPercent / 100),
        data.averageMargin
      );
      break;
    case 'frequency':
      newCLV = calculateCLV(
        data.averageOrderValue,
        data.purchaseFrequency * (1 + improvementPercent / 100),
        data.averageCustomerLifespan,
        data.averageMargin
      );
      break;
    case 'aov':
      newCLV = calculateCLV(
        data.averageOrderValue * (1 + improvementPercent / 100),
        data.purchaseFrequency,
        data.averageCustomerLifespan,
        data.averageMargin
      );
      break;
    case 'margin':
      newCLV = calculateCLV(
        data.averageOrderValue,
        data.purchaseFrequency,
        data.averageCustomerLifespan,
        data.averageMargin * (1 + improvementPercent / 100)
      );
      break;
  }

  const clvIncrease = newCLV - currentCLV;
  return clvIncrease * data.totalCustomers;
};

// ==================== Segmentation Analysis ====================

export const calculateSegmentDistribution = (data: EnhancedAuditFormData) => {
  const retentionRate = calculateImpliedRetentionRate(data);

  return {
    champions: Math.round(data.totalCustomers * 0.15),
    loyalCustomers: Math.round(data.totalCustomers * 0.25),
    potentialLoyalists: Math.round(data.totalCustomers * 0.20),
    atRisk: Math.round(data.totalCustomers * 0.20),
    needsAttention: Math.round(data.totalCustomers * 0.15),
    lost: Math.round(data.totalCustomers * 0.05),
  };
};

// ==================== ROI Projections ====================

export const projectImplementationROI = (
  investmentCost: number,
  expectedRevenueLift: number,
  timelineMonths: number
): {
  roi: number;
  paybackMonths: number;
  breakEvenMonth: number;
} => {
  const monthlyLift = expectedRevenueLift / 12;
  const paybackMonths = safeDivide(investmentCost, monthlyLift);
  const roi = safeDivide(expectedRevenueLift - investmentCost, investmentCost) * 100;
  const breakEvenMonth = Math.ceil(paybackMonths);

  return {
    roi: Math.round(roi),
    paybackMonths: Math.round(paybackMonths * 10) / 10,
    breakEvenMonth,
  };
};
