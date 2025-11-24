/**
 * Enhanced Audit Generator
 * Generates comprehensive retention audit reports
 */

import {
  EnhancedAuditFormData,
  EnhancedAuditResults,
  Risk,
  Opportunity,
  CompetitorAnalysis,
  RoadmapPhase,
  ChannelPerformance,
  CustomerMetrics,
  SegmentHealth,
  TechnologyStackAnalysis,
  PlatformAnalysis,
  Recommendation,
  FinancialAnalysisData,
  FinancialMetrics,
} from '@/types/enhanced-audit/enhanced-audit';

import {
  calculateOverallScore,
  calculateCategoryScores,
  calculateFinancialMetrics,
  calculateMaturityLevel,
  getIndustryBenchmark,
  calculateImpliedRetentionRate,
  calculateChurnRateFromData,
  calculateCustomerHealth,
  calculateTechnologyScore,
  calculateChannelScore,
  calculateRiskScore,
  calculateOpportunityValue,
  calculateSegmentDistribution,
  projectImplementationROI,
} from './enhanced-calculations';

import { formatCurrency, formatPercentage } from '@/lib/utils';
import { applySafeDefaults } from './safe-defaults';

// ==================== Main Audit Generator ====================

export function generateComprehensiveAudit(
  inputData: EnhancedAuditFormData,
  currency: string = 'INR'
): EnhancedAuditResults {
  // Apply safe defaults to prevent $0 and NaN errors
  const data = applySafeDefaults(inputData);

  const overallScore = calculateOverallScore(data);
  const industryBenchmark = getIndustryBenchmark(data.industry);
  const maturityLevel = calculateMaturityLevel(overallScore);
  const categoryScores = calculateCategoryScores(data);
  const financialMetrics = calculateFinancialMetrics(data);

  return {
    overallScore,
    industryBenchmark,
    maturityLevel,
    categoryScores,
    financialMetrics,
    financialAnalysis: generateFinancialAnalysis(financialMetrics, overallScore, currency),
    customerMetrics: generateCustomerMetrics(data, currency),
    channelPerformance: generateChannelPerformance(data),
    technologyStack: generateTechnologyStackAnalysis(data),
    risks: generateRisks(data, overallScore),
    opportunities: generateOpportunities(data, overallScore, currency),
    prioritizedOpportunities: generateOpportunities(data, overallScore, currency),
    competitorAnalysis: generateCompetitorAnalysis(data, industryBenchmark),
    implementationRoadmap: generateImplementationRoadmap(data, overallScore, currency),
    keyInsights: generateKeyInsights(data, overallScore, financialMetrics),
    recommendations: generateRecommendations(data, overallScore),

    // Metadata
    reportId: `audit-${Date.now()}`,
    reportVersion: '1.0',
    generatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    leadData: data,
    currency, // Add currency to results

    // Executive Summary
    executiveSummary: {
      overallScore,
      maturityLevel,
      keyInsights: generateKeyInsights(data, overallScore, financialMetrics),
      topRisks: generateRisks(data, overallScore).slice(0, 3),
      topOpportunities: generateOpportunities(data, overallScore, currency).slice(0, 3),
    },
  };
}

function generateFinancialAnalysis(metrics: any, score: number, currency: string = 'INR'): FinancialAnalysisData {
  const projection = [];
  const monthlyBase = metrics.monthlyRecurringRevenue;
  const growthRate = 0.05 + (score / 1000); // Base 5% + score factor

  for (let i = 1; i <= 36; i++) {
    projection.push({
      month: i,
      baseline: monthlyBase * Math.pow(1.02, i), // 2% baseline growth
      optimized: monthlyBase * Math.pow(1 + growthRate, i),
      incremental: (monthlyBase * Math.pow(1 + growthRate, i)) - (monthlyBase * Math.pow(1.02, i)),
    });
  }

  return {
    revenueProjection: projection,
    currentMetrics: {
      currentCLV: metrics.currentCLV,
      targetCLV: metrics.potentialCLV,
      cacRatio: metrics.ltvCacRatio,
      retentionRate: metrics.retentionRevenueOpportunity > 0 ? 60 : 80, // Approximate
    },
    opportunityAnalysis: {
      totalMonthlyOpportunity: metrics.retentionRevenueOpportunity / 12,
      totalAnnualOpportunity: metrics.retentionRevenueOpportunity,
      totalThreeYearValue: metrics.retentionRevenueOpportunity * 3 * 1.5, // Compound effect
      requiredInvestment: metrics.retentionRevenueOpportunity * 0.15, // Est 15% investment
      netROI: 550, // Benchmark
      breakEvenMonths: 4,
    },
  };
}

// ==================== Customer Metrics ====================

function generateCustomerMetrics(data: EnhancedAuditFormData, currency: string = 'INR'): CustomerMetrics {
  const financialMetrics = calculateFinancialMetrics(data);
  const retentionRate = calculateImpliedRetentionRate(data);
  const churnRate = calculateChurnRateFromData(data);
  const activeCustomerRate = (data.monthlyActiveCustomers / data.totalCustomers) * 100;
  const customerHealth = calculateCustomerHealth(data);
  const segmentDist = calculateSegmentDistribution(data);

  const segmentHealth: SegmentHealth[] = [
    {
      name: 'Champions',
      size: segmentDist.champions,
      percentage: (segmentDist.champions / data.totalCustomers) * 100,
      clv: financialMetrics.currentCLV * 1.5,
      riskLevel: 'low',
      recommendations: ['VIP treatment', 'Exclusive offers', 'Early access programs'],
    },
    {
      name: 'Loyal Customers',
      size: segmentDist.loyalCustomers,
      percentage: (segmentDist.loyalCustomers / data.totalCustomers) * 100,
      clv: financialMetrics.currentCLV * 1.2,
      riskLevel: 'low',
      recommendations: ['Loyalty rewards', 'Referral incentives', 'Cross-sell opportunities'],
    },
    {
      name: 'At Risk',
      size: segmentDist.atRisk,
      percentage: (segmentDist.atRisk / data.totalCustomers) * 100,
      clv: financialMetrics.currentCLV * 0.8,
      riskLevel: 'high',
      recommendations: ['Win-back campaigns', 'Special offers', 'Personalized outreach'],
    },
  ];



  return {
    totalCustomers: data.totalCustomers,
    activeCustomerRate,
    churnRate,
    retentionRate,
    repeatPurchaseRate: data.repeatPurchaseRate,
    averageLifespan: data.averageCustomerLifespan,
    segmentHealth,
  };
}

// ==================== Channel Performance ====================

function generateChannelPerformance(data: EnhancedAuditFormData): ChannelPerformance[] {
  const channels: ChannelPerformance[] = [];

  // Email Channel
  const emailScore = calculateChannelScore(data.emailOpenRate, data.emailClickRate, data.emailConversionRate);
  channels.push({
    channel: 'Email',
    status: emailScore >= 75 ? 'excellent' : emailScore >= 60 ? 'good' : emailScore >= 40 ? 'needs_improvement' : 'critical',
    score: emailScore,
    metrics: {
      engagement: data.emailOpenRate,
      conversion: data.emailConversionRate,
      roi: emailScore * 2,
    },
    strengths: data.emailOpenRate > 20 ? ['Good open rates'] : [],
    weaknesses: data.emailConversionRate < 2 ? ['Low conversion rate'] : [],
    recommendations: [
      emailScore < 60 ? 'Implement A/B testing for subject lines' : 'Continue optimizing',
      'Add personalization based on behavior',
      'Segment campaigns by engagement level',
    ],
  });

  // SMS Channel (if implemented)
  if (data.smsPlatform !== 'none' && data.smsEngagementRate) {
    channels.push({
      channel: 'SMS',
      status: data.smsEngagementRate >= 20 ? 'excellent' : data.smsEngagementRate >= 15 ? 'good' : 'needs_improvement',
      score: Math.min(100, data.smsEngagementRate * 4),
      metrics: {
        engagement: data.smsEngagementRate,
        conversion: data.smsEngagementRate * 0.4,
        roi: data.smsEngagementRate * 5,
      },
      strengths: ['High immediacy', 'Good open rates'],
      weaknesses: data.smsEngagementRate < 15 ? ['Low engagement'] : [],
      recommendations: [
        'Use for time-sensitive offers',
        'Keep messages concise and actionable',
        'Test send times for optimal engagement',
      ],
    });
  }

  // Push Notifications (if implemented)
  if (data.pushNotificationPlatform !== 'none' && data.pushNotificationEngagementRate) {
    channels.push({
      channel: 'Push Notifications',
      status: data.pushNotificationEngagementRate >= 10 ? 'good' : 'needs_improvement',
      score: Math.min(100, data.pushNotificationEngagementRate * 8),
      metrics: {
        engagement: data.pushNotificationEngagementRate,
        conversion: data.pushNotificationEngagementRate * 0.3,
        roi: data.pushNotificationEngagementRate * 4,
      },
      strengths: ['Real-time engagement', 'Mobile-first'],
      weaknesses: data.pushNotificationEngagementRate < 8 ? ['Below industry average'] : [],
      recommendations: [
        'Personalize based on user behavior',
        'Optimize send frequency',
        'Add rich media and deep links',
      ],
    });
  }

  return channels;
}

// ==================== Technology Stack Analysis ====================

function generateTechnologyStackAnalysis(data: EnhancedAuditFormData): TechnologyStackAnalysis {
  const overallMaturity = calculateTechnologyScore(data);

  const platforms: PlatformAnalysis[] = [
    {
      category: 'Email Marketing',
      platform: data.emailPlatform,
      status: data.emailPlatform !== 'none' ? 'implemented' : 'missing',
      maturityScore: data.emailPlatform !== 'none' ? 75 : 0,
      utilizationScore: data.activeFlows > 5 ? 80 : 50,
      recommendations: data.emailPlatform === 'none' ? ['Implement email platform'] : ['Increase automation'],
    },
    {
      category: 'Customer Data Platform',
      platform: data.cdpPlatform,
      status: data.cdpPlatform !== 'none' ? 'implemented' : 'missing',
      maturityScore: data.cdpPlatform !== 'none' ? 70 : 0,
      utilizationScore: data.dataIntegrationLevel * 10,
      recommendations: data.cdpPlatform === 'none' ? ['Consider CDP implementation'] : ['Improve data quality'],
    },
    {
      category: 'Analytics',
      platform: data.analyticsPlatform,
      status: data.analyticsPlatform !== 'none' ? 'implemented' : 'missing',
      maturityScore: data.analyticsPlatform !== 'none' ? 65 : 0,
      utilizationScore: data.attributionTracking ? 75 : 40,
      recommendations: ['Enable advanced tracking', 'Set up custom dashboards'],
    },
  ];

  const gaps: string[] = [];
  if (data.emailPlatform === 'none') gaps.push('Email marketing platform');
  if (data.cdpPlatform === 'none') gaps.push('Customer data platform');
  if (data.loyaltyPlatform === 'none') gaps.push('Loyalty program platform');
  if (!data.predictiveAnalytics) gaps.push('Predictive analytics capability');
  if (!data.aiRecommendations) gaps.push('AI-powered recommendations');

  return {
    overallMaturity,
    platforms,
    gaps,
    integrationScore: data.dataIntegrationLevel * 10,
    recommendations: [
      'Integrate all platforms for unified customer view',
      'Implement real-time data sync',
      'Add predictive analytics layer',
    ],
  };
}

// ==================== Risk Generation ====================

function generateRisks(data: EnhancedAuditFormData, overallScore: number): Risk[] {
  const risks: Risk[] = [];
  const riskScores = calculateRiskScore(data);
  const retentionRate = calculateImpliedRetentionRate(data);
  const financialMetrics = calculateFinancialMetrics(data);

  // Churn Risk
  if (riskScores.churnRisk > 50) {
    risks.push({
      id: 'risk-churn-001',
      severity: riskScores.churnRisk > 70 ? 'critical' : 'high',
      category: 'Customer Retention',
      title: 'High Customer Churn Rate',
      description: `Current retention rate of ${formatPercentage(retentionRate)} is below industry standards, indicating significant churn risk.`,
      impact: `Annual revenue at risk: ${formatCurrency(financialMetrics.annualRevenueAtRisk)}`,
      probability: riskScores.churnRisk,
      financialImpact: financialMetrics.annualRevenueAtRisk,
      mitigation: 'Implement proactive retention campaigns, improve product/service quality, enhance customer support',
      timeline: 'Immediate action required',
      owner: 'Customer Success Team',
    });
  }

  // LTV:CAC Risk
  if (financialMetrics.ltvCacRatio < 2) {
    risks.push({
      id: 'risk-economics-001',
      severity: financialMetrics.ltvCacRatio < 1 ? 'critical' : 'high',
      category: 'Unit Economics',
      title: 'Unhealthy LTV:CAC Ratio',
      description: `Current LTV:CAC ratio of ${financialMetrics.ltvCacRatio.toFixed(2)} indicates unsustainable customer acquisition costs.`,
      impact: 'Business model sustainability at risk, potential profitability issues',
      probability: 85,
      financialImpact: data.monthlyRevenue * 0.3,
      mitigation: 'Optimize acquisition channels, improve retention to increase LTV, reduce CAC through more efficient marketing',
      timeline: '3-6 months',
      owner: 'Marketing & Finance Teams',
    });
  }

  // Technology Debt
  if (riskScores.technologyRisk > 60) {
    risks.push({
      id: 'risk-tech-001',
      severity: 'medium',
      category: 'Technology',
      title: 'Technology Stack Limitations',
      description: 'Current technology stack lacks modern capabilities for retention optimization.',
      impact: 'Reduced ability to compete, manual processes, limited personalization',
      probability: 70,
      financialImpact: data.monthlyRevenue * 0.15,
      mitigation: 'Invest in modern retention stack, implement automation, add AI/ML capabilities',
      timeline: '6-12 months',
      owner: 'Technology Team',
    });
  }

  // Low Engagement Risk
  if (data.emailOpenRate < 15 || data.emailClickRate < 2) {
    risks.push({
      id: 'risk-engagement-001',
      severity: 'medium',
      category: 'Customer Engagement',
      title: 'Low Customer Engagement',
      description: 'Email engagement metrics are significantly below industry benchmarks.',
      impact: 'Reduced brand connection, lower conversion rates, increased churn likelihood',
      probability: 65,
      financialImpact: data.monthlyRevenue * 0.1,
      mitigation: 'Improve content relevance, implement segmentation, test new messaging approaches',
      timeline: '2-4 months',
      owner: 'Marketing Team',
    });
  }

  // Cart Abandonment Risk
  if (data.cartAbandonmentRate > 70) {
    risks.push({
      id: 'risk-conversion-001',
      severity: 'high',
      category: 'Conversion',
      title: 'High Cart Abandonment Rate',
      description: `Cart abandonment rate of ${formatPercentage(data.cartAbandonmentRate)} represents significant revenue leakage.`,
      impact: 'Lost revenue opportunity from interested customers',
      probability: 90,
      financialImpact: data.monthlyRevenue * 0.25,
      mitigation: 'Implement cart recovery emails, optimize checkout process, address friction points',
      timeline: 'Immediate',
      owner: 'E-commerce Team',
    });
  }

  // Data Quality Risk
  if (data.dataCollectionQuality < 6 || data.dataIntegrationLevel < 6) {
    risks.push({
      id: 'risk-data-001',
      severity: 'medium',
      category: 'Data Quality',
      title: 'Poor Data Quality and Integration',
      description: 'Incomplete or poorly integrated data limits personalization and targeting effectiveness.',
      impact: 'Suboptimal campaign performance, missed opportunities, inaccurate insights',
      probability: 75,
      financialImpact: data.monthlyRevenue * 0.12,
      mitigation: 'Implement data governance, improve integration, add data validation',
      timeline: '4-6 months',
      owner: 'Data Team',
    });
  }

  return risks.sort((a, b) => {
    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
}

// ==================== Opportunity Generation ====================

function generateOpportunities(data: EnhancedAuditFormData, overallScore: number, currency: string = 'INR'): Opportunity[] {
  const opportunities: Opportunity[] = [];
  const financialMetrics = calculateFinancialMetrics(data);

  // CLV Expansion Opportunity
  opportunities.push({
    id: 'opp-clv-001',
    priority: 'high',
    category: 'Revenue Growth',
    title: 'Customer Lifetime Value Expansion',
    description: 'Increase purchase frequency and customer lifespan through targeted retention programs',
    potentialImpact: `Potential revenue increase of ${formatCurrency(financialMetrics.clvOpportunity * data.totalCustomers)}`,
    estimatedRevenue: financialMetrics.clvOpportunity * data.totalCustomers,
    estimatedLift: 25,
    implementationTime: '6-9 months',
    difficulty: 'medium',
    requiredResources: ['Retention platform', 'Marketing automation', 'Analytics'],
    dependencies: ['Data integration', 'Segmentation setup'],
    quickWin: false,
    annualRevenue: financialMetrics.clvOpportunity * data.totalCustomers,
    roi: 450,
    paybackPeriod: '4 months',
    effort: 'Medium',
    confidenceLevel: 'High',
  });

  // Cart Recovery Opportunity
  if (data.cartAbandonmentRate > 60) {
    const abandonedValue = (data.monthlyRevenue / (1 - data.cartAbandonmentRate / 100)) - data.monthlyRevenue;
    const recoveryPotential = abandonedValue * 0.15 * 12; // 15% recovery rate annually

    opportunities.push({
      id: 'opp-cart-001',
      priority: 'high',
      category: 'Conversion Optimization',
      title: 'Cart Abandonment Recovery Program',
      description: 'Implement automated cart recovery emails with personalized incentives',
      potentialImpact: `Recover ${formatCurrency(recoveryPotential)} in annual revenue`,
      estimatedRevenue: recoveryPotential,
      estimatedLift: 15,
      implementationTime: '1-2 months',
      difficulty: 'easy',
      requiredResources: ['Email platform', 'Basic automation'],
      dependencies: [],
      quickWin: true,
      annualRevenue: recoveryPotential,
      roi: 800,
      paybackPeriod: '1 month',
      effort: 'Low',
      confidenceLevel: 'High',
    });
  }

  // Retention Rate Improvement
  opportunities.push({
    id: 'opp-retention-001',
    priority: 'high',
    category: 'Customer Retention',
    title: '5% Retention Rate Improvement',
    description: 'Focused retention initiatives to reduce churn and extend customer lifetime',
    potentialImpact: `Additional ${formatCurrency(financialMetrics.retentionRevenueOpportunity)} in annual revenue`,
    estimatedRevenue: financialMetrics.retentionRevenueOpportunity,
    estimatedLift: 5,
    implementationTime: '4-6 months',
    difficulty: 'medium',
    requiredResources: ['Retention team', 'Customer success platform', 'Analytics'],
    dependencies: ['Customer segmentation', 'Health scoring'],
    quickWin: false,
    annualRevenue: financialMetrics.retentionRevenueOpportunity,
    roi: 500,
    paybackPeriod: '5 months',
    effort: 'Medium',
    confidenceLevel: 'High',
  });

  // Email Optimization
  if (data.emailOpenRate < 25 || data.emailClickRate < 3) {
    opportunities.push({
      id: 'opp-email-001',
      priority: 'medium',
      category: 'Channel Optimization',
      title: 'Email Marketing Optimization',
      description: 'Improve email performance through better segmentation, personalization, and testing',
      potentialImpact: 'Increase email revenue by 30-40%',
      estimatedRevenue: data.monthlyRevenue * 0.35 * 12,
      estimatedLift: 35,
      implementationTime: '3-4 months',
      difficulty: 'medium',
      requiredResources: ['Email platform features', 'A/B testing tools', 'Design resources'],
      dependencies: ['Customer data quality'],
      quickWin: false,
      annualRevenue: data.monthlyRevenue * 0.35 * 12,
      roi: 350,
      paybackPeriod: '3 months',
      effort: 'Medium',
      confidenceLevel: 'Medium',
    });
  }

  // Loyalty Program
  if (data.loyaltyPlatform === 'none' && data.repeatPurchaseRate < 35) {
    opportunities.push({
      id: 'opp-loyalty-001',
      priority: 'medium',
      category: 'Customer Loyalty',
      title: 'Loyalty Program Implementation',
      description: 'Launch points-based loyalty program to incentivize repeat purchases',
      potentialImpact: 'Increase repeat purchase rate by 15-20%',
      estimatedRevenue: financialMetrics.currentCLV * data.totalCustomers * 0.18,
      estimatedLift: 18,
      implementationTime: '4-6 months',
      difficulty: 'medium',
      requiredResources: ['Loyalty platform', 'Rewards budget', 'Marketing support'],
      dependencies: ['Platform integration', 'Reward structure design'],
      quickWin: false,
      annualRevenue: financialMetrics.currentCLV * data.totalCustomers * 0.18,
      roi: 250,
      paybackPeriod: '8 months',
      effort: 'Medium',
      confidenceLevel: 'Medium',
    });
  }

  // Personalization Engine
  if (data.personalizationLevel === 'basic' || data.personalizationLevel === 'none') {
    opportunities.push({
      id: 'opp-personalization-001',
      priority: 'high',
      category: 'Personalization',
      title: 'Advanced Personalization Implementation',
      description: 'Deploy AI-powered personalization across all customer touchpoints',
      potentialImpact: 'Increase conversion rates by 20-30%',
      estimatedRevenue: data.annualRevenue * 0.25,
      estimatedLift: 25,
      implementationTime: '6-9 months',
      difficulty: 'hard',
      requiredResources: ['Personalization platform', 'ML/AI expertise', 'Data infrastructure'],
      dependencies: ['CDP implementation', 'Data quality improvement'],
      quickWin: false,
      annualRevenue: data.annualRevenue * 0.25,
      roi: 300,
      paybackPeriod: '9 months',
      effort: 'High',
      confidenceLevel: 'Medium',
    });
  }

  // Referral Program
  if (data.repeatPurchaseRate > 30) {
    opportunities.push({
      id: 'opp-referral-001',
      priority: 'medium',
      category: 'Acquisition',
      title: 'Customer Referral Program',
      description: 'Leverage satisfied customers to drive low-cost new customer acquisition',
      potentialImpact: 'Reduce CAC by 40-50% for referred customers',
      estimatedRevenue: data.customerAcquisitionCost * data.monthlyNewCustomers * 0.45 * 12,
      estimatedLift: 10,
      implementationTime: '2-3 months',
      difficulty: 'easy',
      requiredResources: ['Referral platform', 'Incentive budget'],
      dependencies: [],
      quickWin: true,
      annualRevenue: data.customerAcquisitionCost * data.monthlyNewCustomers * 0.45 * 12,
      roi: 600,
      paybackPeriod: '2 months',
      effort: 'Low',
      confidenceLevel: 'High',
    });
  }

  return opportunities.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (a.quickWin && !b.quickWin) return -1;
    if (!a.quickWin && b.quickWin) return 1;
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

// ==================== Competitor Analysis ====================

function generateCompetitorAnalysis(data: EnhancedAuditFormData, industryBenchmark: number): CompetitorAnalysis {
  const financialMetrics = calculateFinancialMetrics(data);
  const retentionRate = calculateImpliedRetentionRate(data);

  // Industry averages (simplified - would come from real data)
  const industryAverage = {
    retentionRate: industryBenchmark,
    clv: financialMetrics.currentCLV * 1.1,
    cac: data.customerAcquisitionCost * 0.9,
    nps: 50,
  };

  const yourPosition = {
    retentionRate,
    clv: financialMetrics.currentCLV,
    cac: data.customerAcquisitionCost,
    nps: 45, // Would be calculated from data
  };

  const topPerformers = {
    retentionRate: industryBenchmark * 1.3,
    clv: financialMetrics.currentCLV * 1.5,
    cac: data.customerAcquisitionCost * 0.7,
    nps: 70,
  };

  const competitiveAdvantages: string[] = [];
  const areasForImprovement: string[] = [];

  if (yourPosition.retentionRate > industryAverage.retentionRate) {
    competitiveAdvantages.push('Above-average customer retention');
  } else {
    areasForImprovement.push('Improve retention to match industry standards');
  }

  if (yourPosition.clv > industryAverage.clv) {
    competitiveAdvantages.push('Strong customer lifetime value');
  } else {
    areasForImprovement.push('Increase CLV through better monetization');
  }

  if (yourPosition.cac < industryAverage.cac) {
    competitiveAdvantages.push('Efficient customer acquisition');
  } else {
    areasForImprovement.push('Optimize acquisition costs');
  }

  let marketPosition: 'leader' | 'challenger' | 'follower' | 'niche' = 'follower';
  const performanceScore =
    (yourPosition.retentionRate / topPerformers.retentionRate) * 0.4 +
    (yourPosition.clv / topPerformers.clv) * 0.3 +
    (topPerformers.cac / yourPosition.cac) * 0.3;

  if (performanceScore > 0.85) marketPosition = 'leader';
  else if (performanceScore > 0.70) marketPosition = 'challenger';
  else if (performanceScore > 0.50) marketPosition = 'follower';
  else marketPosition = 'niche';

  return {
    industryAverage,
    yourPosition,
    topPerformers,
    competitiveAdvantages,
    areasForImprovement,
    marketPosition,
  };
}

// ==================== Implementation Roadmap ====================

function generateImplementationRoadmap(data: EnhancedAuditFormData, overallScore: number, currency: string = 'INR'): RoadmapPhase[] {
  const roadmap: RoadmapPhase[] = [];
  const financialMetrics = calculateFinancialMetrics(data);

  // Phase 1: Foundation (0-3 months)
  roadmap.push({
    phase: 1,
    name: 'Foundation & Quick Wins',
    duration: '0-3 months',
    objectives: [
      'Establish baseline metrics and tracking',
      'Implement critical fixes',
      'Launch quick-win initiatives',
    ],
    initiatives: [
      {
        name: 'Analytics & Tracking Setup',
        description: 'Implement comprehensive event tracking and customer journey mapping',
        priority: 'critical',
        estimatedEffort: '4 weeks',
        dependencies: [],
        expectedImpact: 'Visibility into customer behavior',
        successMetrics: ['All key events tracked', 'Dashboard operational'],
        title: 'Analytics & Tracking Setup',
      },
      {
        name: 'Cart Abandonment Campaign',
        description: 'Launch automated cart recovery email series',
        priority: 'high',
        estimatedEffort: '2 weeks',
        dependencies: ['Email platform'],
        expectedImpact: '10-15% cart recovery rate',
        successMetrics: ['Recovery rate > 10%', 'ROI > 5x'],
        title: 'Cart Abandonment Campaign',
      },
      {
        name: 'Email List Segmentation',
        description: 'Create basic customer segments for targeted messaging',
        priority: 'high',
        estimatedEffort: '3 weeks',
        dependencies: ['Data quality'],
        expectedImpact: 'Improved email performance',
        successMetrics: ['5+ segments created', 'Open rate +5%'],
        title: 'Email List Segmentation',
      },
    ],
    estimatedCost: 15000,
    expectedROI: 250,
    kpis: [
      { metric: 'Email Open Rate', current: data.emailOpenRate, target: data.emailOpenRate * 1.15, unit: '%' },
      { metric: 'Cart Recovery Rate', current: 0, target: 12, unit: '%' },
    ],
    expectedRevenue: 15000 * 2.5,
    requiredInvestment: 15000,
  });

  // Phase 2: Optimization (3-6 months)
  roadmap.push({
    phase: 2,
    name: 'Optimization & Automation',
    duration: '3-6 months',
    objectives: [
      'Scale successful initiatives',
      'Implement advanced automation',
      'Improve customer segmentation',
    ],
    initiatives: [
      {
        name: 'Retention Automation Suite',
        description: 'Deploy 10+ automated retention flows',
        priority: 'high',
        estimatedEffort: '8 weeks',
        dependencies: ['Phase 1 completion'],
        expectedImpact: '20% increase in repeat purchases',
        successMetrics: ['10+ flows active', 'Flow conversion > 8%'],
        title: 'Retention Automation Suite',
      },
      {
        name: 'Predictive Churn Model',
        description: 'Implement ML model to identify at-risk customers',
        priority: 'medium',
        estimatedEffort: '6 weeks',
        dependencies: ['Historical data', 'ML resources'],
        expectedImpact: 'Proactive churn prevention',
        successMetrics: ['Model accuracy > 75%', 'Churn reduced 15%'],
        title: 'Predictive Churn Model',
      },
      {
        name: 'Loyalty Program Beta',
        description: 'Launch pilot loyalty program with select customers',
        priority: 'medium',
        estimatedEffort: '10 weeks',
        dependencies: ['Loyalty platform'],
        expectedImpact: 'Increased purchase frequency',
        successMetrics: ['1000+ enrolled', 'Repeat rate +10%'],
        title: 'Loyalty Program Beta',
      },
    ],
    estimatedCost: 35000,
    expectedROI: 400,
    kpis: [
      { metric: 'Retention Rate', current: calculateImpliedRetentionRate(data), target: calculateImpliedRetentionRate(data) * 1.1, unit: '%' },
      { metric: 'Purchase Frequency', current: data.purchaseFrequency, target: data.purchaseFrequency * 1.15, unit: 'x' },
    ],
    expectedRevenue: 35000 * 4,
    requiredInvestment: 35000,
  });

  // Phase 3: Advanced Capabilities (6-12 months)
  roadmap.push({
    phase: 3,
    name: 'Advanced Capabilities & Scale',
    duration: '6-12 months',
    objectives: [
      'Deploy AI/ML-powered personalization',
      'Achieve cross-channel orchestration',
      'Reach retention maturity',
    ],
    initiatives: [
      {
        name: 'AI Personalization Engine',
        description: 'Implement 1:1 personalization across all touchpoints',
        priority: 'high',
        estimatedEffort: '16 weeks',
        dependencies: ['CDP', 'ML infrastructure'],
        expectedImpact: '25-30% conversion lift',
        successMetrics: ['Personalization score > 80%', 'Conversion +25%'],
        title: 'AI Personalization Engine',
      },
      {
        name: 'Omnichannel Orchestration',
        description: 'Unified customer experience across all channels',
        priority: 'high',
        estimatedEffort: '12 weeks',
        dependencies: ['All platforms integrated'],
        expectedImpact: 'Seamless customer journey',
        successMetrics: ['Channel integration 100%', 'NPS +10 points'],
        title: 'Omnichannel Orchestration',
      },
      {
        name: 'Advanced Analytics Dashboard',
        description: 'Real-time insights and predictive analytics',
        priority: 'medium',
        estimatedEffort: '8 weeks',
        dependencies: ['Data infrastructure'],
        expectedImpact: 'Data-driven decision making',
        successMetrics: ['Real-time reporting', 'Predictive accuracy > 80%'],
        title: 'Advanced Analytics Dashboard',
      },
    ],
    estimatedCost: 75000,
    expectedROI: 500,
    kpis: [
      { metric: 'Customer Lifetime Value', current: financialMetrics.currentCLV, target: financialMetrics.potentialCLV, unit: '$' },
      { metric: 'Overall Maturity Score', current: overallScore, target: Math.min(90, overallScore + 25), unit: 'pts' },
    ],
    expectedRevenue: 75000 * 5,
    requiredInvestment: 75000,
  });

  return roadmap;
}

// ==================== Key Insights ====================

function generateKeyInsights(data: EnhancedAuditFormData, overallScore: number, financialMetrics: FinancialMetrics): string[] {
  const insights: string[] = [];
  const retentionRate = calculateImpliedRetentionRate(data);

  insights.push(
    `Your overall retention maturity score is ${overallScore}/100, placing you in the ${calculateMaturityLevel(overallScore)} category.`
  );

  if (financialMetrics.ltvCacRatio < 3) {
    insights.push(
      `Your LTV:CAC ratio of ${financialMetrics.ltvCacRatio.toFixed(2)} indicates room for improvement in unit economics.`
    );
  }

  insights.push(
    `By improving retention by just 5%, you could unlock ${formatCurrency(financialMetrics.retentionRevenueOpportunity)} in additional annual revenue.`
  );

  if (data.cartAbandonmentRate > 60) {
    insights.push(
      `Your cart abandonment rate of ${formatPercentage(data.cartAbandonmentRate)} represents a significant quick-win opportunity.`
    );
  }

  if (retentionRate < 50) {
    insights.push(
      `With a retention rate of ${formatPercentage(retentionRate)}, focusing on retention should be your top priority.`
    );
  }

  if (data.activeFlows < 5) {
    insights.push(
      'Limited marketing automation is constraining your ability to scale retention efforts efficiently.'
    );
  }

  return insights;
}

// ==================== Recommendations ====================

function generateRecommendations(data: EnhancedAuditFormData, overallScore: number): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Top priority recommendations based on gaps
  if (data.activeFlows < 5) {
    recommendations.push({
      id: 'rec-001',
      category: 'Automation',
      priority: 'critical',
      title: 'Implement Core Retention Automation Flows',
      description: 'Deploy essential automated flows including welcome series, post-purchase follow-up, win-back campaigns, and re-engagement sequences.',
      expectedImpact: '15-20% increase in repeat purchase rate',
      implementationComplexity: 'medium',
      timeToValue: '4-6 weeks',
      cost: 'medium',
      prerequisites: ['Email platform with automation', 'Customer segmentation'],
      successMetrics: ['10+ active flows', 'Flow conversion rate > 8%', 'Automated revenue > 15%'],
    });
  }

  if (data.segmentCount < 5) {
    recommendations.push({
      id: 'rec-002',
      category: 'Segmentation',
      priority: 'high',
      title: 'Advanced Customer Segmentation',
      description: 'Create behavioral and value-based customer segments to enable targeted messaging and offers.',
      expectedImpact: '25-30% improvement in campaign performance',
      implementationComplexity: 'medium',
      timeToValue: '2-3 weeks',
      cost: 'low',
      prerequisites: ['Customer data quality', 'Analytics platform'],
      successMetrics: ['10+ segments created', 'Segment-specific campaigns', 'Email performance +20%'],
    });
  }

  if (data.dataCollectionQuality < 7) {
    recommendations.push({
      id: 'rec-003',
      category: 'Data Infrastructure',
      priority: 'high',
      title: 'Improve Data Collection and Quality',
      description: 'Implement comprehensive event tracking, data validation, and quality monitoring to enable better personalization.',
      expectedImpact: 'Foundation for all advanced retention initiatives',
      implementationComplexity: 'high',
      timeToValue: '6-8 weeks',
      cost: 'medium',
      prerequisites: ['Analytics platform', 'Development resources'],
      successMetrics: ['Data completeness > 95%', 'Event tracking comprehensive', 'Real-time sync'],
    });
  }

  if (!data.predictiveAnalytics) {
    recommendations.push({
      id: 'rec-004',
      category: 'Predictive Analytics',
      priority: 'medium',
      title: 'Deploy Predictive Churn Model',
      description: 'Use machine learning to identify customers at risk of churning before they leave.',
      expectedImpact: 'Reduce churn by 15-20% through proactive intervention',
      implementationComplexity: 'high',
      timeToValue: '8-12 weeks',
      cost: 'high',
      prerequisites: ['Historical customer data', 'ML expertise', 'Data infrastructure'],
      successMetrics: ['Model accuracy > 75%', 'Early warning system', 'Churn reduction confirmed'],
    });
  }

  if (data.loyaltyPlatform === 'none' && data.repeatPurchaseRate < 35) {
    recommendations.push({
      id: 'rec-005',
      category: 'Loyalty',
      priority: 'medium',
      title: 'Launch Customer Loyalty Program',
      description: 'Implement a points-based loyalty program to incentivize repeat purchases and increase customer lifetime value.',
      expectedImpact: '15-25% increase in purchase frequency',
      implementationComplexity: 'medium',
      timeToValue: '12-16 weeks',
      cost: 'medium',
      prerequisites: ['Loyalty platform', 'Rewards budget', 'Program design'],
      successMetrics: ['30% enrollment rate', 'Member repeat rate +20%', 'Positive ROI within 6 months'],
    });
  }

  return recommendations;
}
