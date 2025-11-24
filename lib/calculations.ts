/**
 * Core calculation functions for RetentionOS
 * All business logic and metric calculations
 */

import { safeDivide, safePercentage } from './utils';

// ==================== Customer Lifetime Value (CLV) ====================

export const calculateCLV = (
  averageOrderValue: number,
  purchaseFrequency: number,
  customerLifespan: number,
  profitMargin: number = 0
): number => {
  const annualValue = averageOrderValue * purchaseFrequency;
  const grossCLV = annualValue * customerLifespan;
  
  if (profitMargin > 0) {
    return grossCLV * (profitMargin / 100);
  }
  
  return grossCLV;
};

export const calculateSimpleCLV = (
  averageOrderValue: number,
  purchaseFrequency: number,
  customerLifespan: number
): number => {
  return averageOrderValue * purchaseFrequency * customerLifespan;
};

// ==================== Customer Acquisition Cost (CAC) ====================

export const calculateCAC = (
  marketingSpend: number,
  salesSpend: number,
  newCustomers: number
): number => {
  return safeDivide(marketingSpend + salesSpend, newCustomers);
};

// ==================== LTV:CAC Ratio ====================

export const calculateLTVCACRatio = (
  ltv: number,
  cac: number
): number => {
  return safeDivide(ltv, cac);
};

export const getLTVCACHealthStatus = (ratio: number): string => {
  if (ratio >= 3) return 'Excellent';
  if (ratio >= 2) return 'Good';
  if (ratio >= 1) return 'Marginal';
  return 'Unhealthy';
};

// ==================== Retention Rate ====================

export const calculateRetentionRate = (
  customersAtStart: number,
  customersAtEnd: number,
  newCustomers: number
): number => {
  const retained = customersAtEnd - newCustomers;
  return safePercentage(retained, customersAtStart);
};

// ==================== Churn Rate ====================

export const calculateChurnRate = (
  customersLost: number,
  totalCustomers: number
): number => {
  return safePercentage(customersLost, totalCustomers);
};

export const calculateRevenueChurn = (
  revenueLost: number,
  totalRevenue: number
): number => {
  return safePercentage(revenueLost, totalRevenue);
};

// ==================== Net Revenue Retention (NRR) ====================

export const calculateNRR = (
  startingMRR: number,
  expansionMRR: number,
  contractionMRR: number,
  churnedMRR: number
): number => {
  const endingMRR = startingMRR + expansionMRR - contractionMRR - churnedMRR;
  return safePercentage(endingMRR, startingMRR);
};

// ==================== Average Order Value (AOV) ====================

export const calculateAOV = (
  totalRevenue: number,
  numberOfOrders: number
): number => {
  return safeDivide(totalRevenue, numberOfOrders);
};

// ==================== Repeat Purchase Rate (RPR) ====================

export const calculateRepeatPurchaseRate = (
  repeatCustomers: number,
  totalCustomers: number
): number => {
  return safePercentage(repeatCustomers, totalCustomers);
};

// ==================== Purchase Frequency ====================

export const calculatePurchaseFrequency = (
  totalOrders: number,
  uniqueCustomers: number
): number => {
  return safeDivide(totalOrders, uniqueCustomers);
};

// ==================== Customer Lifespan ====================

export const calculateCustomerLifespan = (
  retentionRate: number
): number => {
  if (retentionRate === 0 || retentionRate === 100) return 0;
  return safeDivide(1, (1 - retentionRate / 100));
};

// ==================== Payback Period ====================

export const calculatePaybackPeriod = (
  cac: number,
  averageMonthlyRevenuePerCustomer: number,
  grossMargin: number
): number => {
  const monthlyProfit = averageMonthlyRevenuePerCustomer * (grossMargin / 100);
  return safeDivide(cac, monthlyProfit);
};

// ==================== Cart Abandonment ====================

export const calculateCartAbandonmentRate = (
  cartsAbandoned: number,
  cartsCreated: number
): number => {
  return safePercentage(cartsAbandoned, cartsCreated);
};

export const calculateRecoveredRevenue = (
  abandonmentRate: number,
  averageCartValue: number,
  totalCarts: number,
  recoveryRate: number
): number => {
  const abandonedCarts = (totalCarts * abandonmentRate) / 100;
  return abandonedCarts * averageCartValue * (recoveryRate / 100);
};

// ==================== NPS Calculator ====================

export const calculateNPS = (
  promoters: number,
  passives: number,
  detractors: number
): number => {
  const total = promoters + passives + detractors;
  if (total === 0) return 0;
  
  const promoterPercentage = (promoters / total) * 100;
  const detractorPercentage = (detractors / total) * 100;
  
  return promoterPercentage - detractorPercentage;
};

export const getNPSCategory = (nps: number): string => {
  if (nps >= 70) return 'Excellent';
  if (nps >= 50) return 'Great';
  if (nps >= 30) return 'Good';
  if (nps >= 0) return 'Needs Improvement';
  return 'Critical';
};

// ==================== CSAT Calculator ====================

export const calculateCSAT = (
  satisfiedResponses: number,
  totalResponses: number
): number => {
  return safePercentage(satisfiedResponses, totalResponses);
};

// ==================== CES Calculator ====================

export const calculateCES = (
  totalScore: number,
  numberOfResponses: number,
  maxScore: number = 7
): number => {
  return safeDivide(totalScore, numberOfResponses);
};

// ==================== ROI Calculator ====================

export const calculateROI = (
  gain: number,
  cost: number
): number => {
  return safePercentage(gain - cost, cost);
};

// ==================== MRR Growth ====================

export const calculateMRRGrowth = (
  currentMRR: number,
  previousMRR: number
): number => {
  return safePercentage(currentMRR - previousMRR, previousMRR);
};

// ==================== Cohort Retention ====================

export const calculateCohortRetention = (
  activeUsersInPeriod: number,
  cohortSize: number
): number => {
  return safePercentage(activeUsersInPeriod, cohortSize);
};

// ==================== Engagement Score ====================

export const calculateEngagementScore = (
  metrics: {
    loginFrequency: number;
    featureUsage: number;
    sessionDuration: number;
    actionsPerSession: number;
  },
  weights: {
    loginFrequency: number;
    featureUsage: number;
    sessionDuration: number;
    actionsPerSession: number;
  }
): number => {
  const weightedSum =
    metrics.loginFrequency * weights.loginFrequency +
    metrics.featureUsage * weights.featureUsage +
    metrics.sessionDuration * weights.sessionDuration +
    metrics.actionsPerSession * weights.actionsPerSession;
  
  const totalWeight =
    weights.loginFrequency +
    weights.featureUsage +
    weights.sessionDuration +
    weights.actionsPerSession;
  
  return safeDivide(weightedSum, totalWeight);
};

// ==================== Viral Coefficient (K-Factor) ====================

export const calculateViralCoefficient = (
  invitesSent: number,
  users: number,
  conversionRate: number
): number => {
  const invitesPerUser = safeDivide(invitesSent, users);
  return invitesPerUser * (conversionRate / 100);
};

// ==================== Win-Back Rate ====================

export const calculateWinBackRate = (
  reactivatedCustomers: number,
  lapsedCustomers: number
): number => {
  return safePercentage(reactivatedCustomers, lapsedCustomers);
};

// ==================== Email ROI ====================

export const calculateEmailROI = (
  revenue: number,
  cost: number
): number => {
  return safeDivide(revenue - cost, cost) * 100;
};

// ==================== SMS ROI ====================

export const calculateSMSROI = (
  revenue: number,
  cost: number
): number => {
  return safeDivide(revenue - cost, cost) * 100;
};

// ==================== Content ROI ====================

export const calculateContentROI = (
  conversions: number,
  conversionValue: number,
  contentCost: number
): number => {
  const totalRevenue = conversions * conversionValue;
  return safeDivide(totalRevenue - contentCost, contentCost) * 100;
};

// ==================== Referral Program Metrics ====================

export const calculateReferralRate = (
  referrals: number,
  totalCustomers: number
): number => {
  return safePercentage(referrals, totalCustomers);
};

export const calculateReferralCAC = (
  programCost: number,
  newCustomersFromReferrals: number
): number => {
  return safeDivide(programCost, newCustomersFromReferrals);
};

// ==================== Customer Health Score ====================

export const calculateCustomerHealthScore = (
  productUsage: number,
  npsScore: number,
  supportTickets: number,
  paymentStatus: number,
  engagementScore: number
): number => {
  // Weighted average of different health indicators
  const weights = {
    productUsage: 0.3,
    npsScore: 0.25,
    supportTickets: 0.15,
    paymentStatus: 0.2,
    engagementScore: 0.1,
  };
  
  return (
    productUsage * weights.productUsage +
    npsScore * weights.npsScore +
    supportTickets * weights.supportTickets +
    paymentStatus * weights.paymentStatus +
    engagementScore * weights.engagementScore
  );
};

// ==================== A/B Test Statistics ====================

export const calculateConversionRate = (
  conversions: number,
  visitors: number
): number => {
  return safePercentage(conversions, visitors);
};

export const calculateStatisticalSignificance = (
  controlRate: number,
  variantRate: number,
  controlSize: number,
  variantSize: number
): { significant: boolean; confidence: number; zScore: number } => {
  // Simplified z-test calculation
  const p1 = controlRate / 100;
  const p2 = variantRate / 100;
  const pooledP = (p1 * controlSize + p2 * variantSize) / (controlSize + variantSize);
  
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / controlSize + 1 / variantSize));
  const z = Math.abs((p2 - p1) / se);
  
  // Approximate confidence level
  let confidence = 0;
  if (z >= 1.96) confidence = 95;
  else if (z >= 1.65) confidence = 90;
  else if (z >= 1.28) confidence = 80;
  
  return {
    significant: z >= 1.96,
    confidence,
    zScore: z,
  };
};

// ==================== Inventory Turnover ====================

export const calculateInventoryTurnover = (
  costOfGoodsSold: number,
  averageInventory: number
): number => {
  return safeDivide(costOfGoodsSold, averageInventory);
};

export const calculateDaysInventoryOutstanding = (
  inventoryTurnover: number
): number => {
  return safeDivide(365, inventoryTurnover);
};

// ==================== Segment Profitability ====================

export const calculateSegmentProfitability = (
  revenue: number,
  cost: number
): number => {
  return revenue - cost;
};

export const calculateSegmentMargin = (
  revenue: number,
  cost: number
): number => {
  return safePercentage(revenue - cost, revenue);
};

// ==================== Channel Attribution ====================

export const calculateChannelROI = (
  revenue: number,
  spend: number
): number => {
  return safeDivide(revenue - spend, spend) * 100;
};

export const calculateChannelConversionRate = (
  conversions: number,
  clicks: number
): number => {
  return safePercentage(conversions, clicks);
};

// ==================== Conversion Optimization ====================

export const calculateConversionLift = (
  newRate: number,
  oldRate: number
): number => {
  return safePercentage(newRate - oldRate, oldRate);
};

export const calculatePotentialRevenue = (
  currentRevenue: number,
  conversionLift: number
): number => {
  return currentRevenue * (1 + conversionLift / 100);
};

// ==================== Predictive Churn ====================

export const calculateChurnRisk = (
  factors: {
    lastPurchaseDays: number;
    purchaseFrequency: number;
    engagementScore: number;
    supportTickets: number;
  }
): number => {
  // Simple weighted risk score (0-100)
  let risk = 0;
  
  // Days since last purchase (higher = more risk)
  if (factors.lastPurchaseDays > 90) risk += 30;
  else if (factors.lastPurchaseDays > 60) risk += 20;
  else if (factors.lastPurchaseDays > 30) risk += 10;
  
  // Purchase frequency (lower = more risk)
  if (factors.purchaseFrequency < 1) risk += 25;
  else if (factors.purchaseFrequency < 2) risk += 15;
  else if (factors.purchaseFrequency < 4) risk += 5;
  
  // Engagement score (lower = more risk)
  if (factors.engagementScore < 30) risk += 25;
  else if (factors.engagementScore < 50) risk += 15;
  else if (factors.engagementScore < 70) risk += 5;
  
  // Support tickets (higher = more risk)
  if (factors.supportTickets > 5) risk += 20;
  else if (factors.supportTickets > 3) risk += 10;
  else if (factors.supportTickets > 1) risk += 5;
  
  return Math.min(risk, 100);
};

// ==================== RFM Segmentation ====================

export const calculateRFMScore = (
  recency: number,
  frequency: number,
  monetary: number
): { total: number; segment: string } => {
  const total = recency + frequency + monetary;
  
  let segment = 'Unknown';
  if (total >= 12) segment = 'Champions';
  else if (total >= 10) segment = 'Loyal';
  else if (total >= 8) segment = 'Potential';
  else if (total >= 6) segment = 'At Risk';
  else segment = 'Lost';
  
  return { total, segment };
};

// ==================== Subscription Metrics ====================

export const calculateSubscriberAcquisitionCost = (
  marketingSpend: number,
  newSubscribers: number
): number => {
  return safeDivide(marketingSpend, newSubscribers);
};

export const calculateSubscriberLifetimeValue = (
  monthlyRevenue: number,
  averageLifespanMonths: number,
  margin: number
): number => {
  return monthlyRevenue * averageLifespanMonths * (margin / 100);
};

// ==================== Influencer ROI ====================

export const calculateInfluencerROI = (
  revenue: number,
  influencerFee: number,
  productCosts: number
): number => {
  const totalCost = influencerFee + productCosts;
  return safeDivide(revenue - totalCost, totalCost) * 100;
};

// ==================== Benchmarking ====================

export const calculatePerformanceGap = (
  yourMetric: number,
  industryAverage: number
): number => {
  return yourMetric - industryAverage;
};

export const calculatePerformanceIndex = (
  yourMetric: number,
  industryAverage: number
): number => {
  return safeDivide(yourMetric, industryAverage) * 100;
};

// ==================== Retention Curve ====================

export const calculateRetentionCurvePoint = (
  initialCohort: number,
  retainedUsers: number,
  period: number
): { retentionRate: number; churnRate: number } => {
  const retentionRate = safePercentage(retainedUsers, initialCohort);
  const churnRate = 100 - retentionRate;
  
  return { retentionRate, churnRate };
};

// ==================== Advanced CLV ====================

export const calculateDiscountedCLV = (
  averageOrderValue: number,
  purchaseFrequency: number,
  customerLifespan: number,
  discountRate: number,
  margin: number
): number => {
  let clv = 0;
  const annualMargin = averageOrderValue * purchaseFrequency * (margin / 100);
  
  for (let year = 1; year <= customerLifespan; year++) {
    clv += annualMargin / Math.pow(1 + discountRate / 100, year);
  }
  
  return clv;
};

// ==================== Quality Indicators ====================

export const getQualityScore = (value: number, min: number, max: number): number => {
  if (value >= max) return 100;
  if (value <= min) return 0;
  return ((value - min) / (max - min)) * 100;
};

export const getHealthColor = (score: number): string => {
  if (score >= 80) return 'green';
  if (score >= 60) return 'yellow';
  if (score >= 40) return 'orange';
  return 'red';
};
