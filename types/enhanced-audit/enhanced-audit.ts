/**
 * Type definitions for Enhanced Retention Audit
 * Comprehensive types for form data, results, and analysis
 */

// ==================== Form Data Types ====================

export interface EnhancedAuditFormData {
  // Company Profile
  company: string;
  industry: string;
  subIndustry?: string;
  yearFounded?: number;
  employeeCount: string;
  websiteUrl?: string;

  // Financial Metrics
  monthlyRevenue: number;
  annualRevenue: number;
  revenueGrowthRate: number;
  averageOrderValue: number;
  averageMargin: number;

  // Customer Base
  totalCustomers: number;
  monthlyNewCustomers: number;
  monthlyActiveCustomers: number;
  averageCustomerLifespan: number;
  customerAcquisitionCost: number;

  // Behavioral Metrics
  repeatPurchaseRate: number;
  purchaseFrequency: number;
  averageTimeBetweenPurchases: number;
  cartAbandonmentRate: number;
  returnRate: number;

  // Channel Performance
  emailOpenRate: number;
  emailClickRate: number;
  emailConversionRate: number;
  smsEngagementRate?: number;
  pushNotificationEngagementRate?: number;

  // Lifecycle Stages (1-10 scores)
  acquisition: number;
  activation: number;
  nurture: number;
  retention: number;
  winback: number;
  advocacy: number;

  // Technology Stack
  emailPlatform: string;
  smsPlatform: string;
  pushNotificationPlatform: string;
  reviewsPlatform: string;
  loyaltyPlatform: string;
  cdpPlatform: string;
  analyticsPlatform: string;
  automationPlatform: string;

  // Advanced Capabilities
  activeFlows: number;
  segmentCount: number;
  personalizationLevel: string;
  predictiveAnalytics: boolean;
  aiRecommendations: boolean;
  crossChannelOrchestration: boolean;

  // Data Quality
  dataCollectionQuality: number;
  dataIntegrationLevel: number;
  attributionTracking: boolean;

  // Team & Resources
  marketingTeamSize: number;
  retentionFocusPercent: number;
  monthlyMarketingBudget: number;

  // Contact Info
  name: string;
  email: string;
  role: string;
  phone?: string;

  // Goals
  primaryGoal: string;
  targetRetentionRate?: number;
  timeline?: string;
}

// ==================== Audit Results Types ====================

export interface EnhancedAuditResults {
  // Metadata
  reportId: string;
  reportVersion: string;
  generatedAt: string;
  expiresAt: string;
  leadData: EnhancedAuditFormData;
  currency?: string; // Currency used for all monetary values

  // Executive Summary
  executiveSummary: {
    overallScore: number;
    maturityLevel: string;
    keyInsights: string[];
    topRisks: Risk[];
    topOpportunities: Opportunity[];
  };

  // Core Metrics
  overallScore: number;
  industryBenchmark: number;
  maturityLevel: string;

  // Detailed Analysis
  categoryScores: CategoryScores;
  financialMetrics: FinancialMetrics;
  financialAnalysis: FinancialAnalysisData;
  customerMetrics: CustomerMetrics;
  channelPerformance: ChannelPerformance[];
  technologyStack: TechnologyStackAnalysis;

  // Action Items
  risks: Risk[];
  opportunities: Opportunity[];
  prioritizedOpportunities: Opportunity[];
  competitorAnalysis: CompetitorAnalysis;
  implementationRoadmap: RoadmapPhase[];
  keyInsights: string[];
  recommendations: Recommendation[];
}

export interface FinancialAnalysisData {
  revenueProjection: {
    month: number;
    baseline: number;
    optimized: number;
    incremental: number;
  }[];
  currentMetrics: {
    currentCLV: number;
    targetCLV: number;
    cacRatio: number;
    retentionRate: number;
  };
  opportunityAnalysis: {
    totalMonthlyOpportunity: number;
    totalAnnualOpportunity: number;
    totalThreeYearValue: number;
    requiredInvestment: number;
    netROI: number;
    breakEvenMonths: number;
  };
}

export interface CategoryScores {
  acquisition: number;
  activation: number;
  nurture: number;
  retention: number;
  winback: number;
  advocacy: number;
}

export interface FinancialMetrics {
  currentCLV: number;
  potentialCLV: number;
  clvOpportunity: number;
  currentCAC: number;
  targetCAC: number;
  ltvCacRatio: number;
  targetLtvCacRatio: number;
  annualRevenueAtRisk: number;
  retentionRevenueOpportunity: number;
  monthlyRecurringRevenue: number;
  projectedAnnualRevenue: number;
}

export interface CustomerMetrics {
  totalCustomers: number;
  activeCustomerRate: number;
  churnRate: number;
  retentionRate: number;
  repeatPurchaseRate: number;
  averageLifespan: number;
  segmentHealth: SegmentHealth[];
}

export interface SegmentHealth {
  name: string;
  size: number;
  percentage: number;
  clv: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

export interface ChannelPerformance {
  channel: string;
  status: 'excellent' | 'good' | 'needs_improvement' | 'critical';
  score: number;
  metrics: {
    engagement: number;
    conversion: number;
    roi: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface TechnologyStackAnalysis {
  overallMaturity: number;
  platforms: PlatformAnalysis[];
  gaps: string[];
  integrationScore: number;
  recommendations: string[];
}

export interface PlatformAnalysis {
  category: string;
  platform: string;
  status: 'implemented' | 'partial' | 'missing';
  maturityScore: number;
  utilizationScore: number;
  recommendations: string[];
}

export interface Risk {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  title: string;
  description: string;
  impact: string;
  probability: number;
  financialImpact: number;
  mitigation: string;
  timeline: string;
  owner: string;
}

export interface Opportunity {
  id: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  title: string;
  description: string;
  potentialImpact: string;
  estimatedRevenue: number;
  estimatedLift: number;
  implementationTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  requiredResources: string[];
  dependencies: string[];
  quickWin: boolean;
  // Added for compatibility
  annualRevenue: number;
  roi: number;
  paybackPeriod: string;
  effort: string;
  confidenceLevel: string;
}

export interface CompetitorAnalysis {
  industryAverage: {
    retentionRate: number;
    clv: number;
    cac: number;
    nps: number;
  };
  yourPosition: {
    retentionRate: number;
    clv: number;
    cac: number;
    nps: number;
  };
  topPerformers: {
    retentionRate: number;
    clv: number;
    cac: number;
    nps: number;
  };
  competitiveAdvantages: string[];
  areasForImprovement: string[];
  marketPosition: 'leader' | 'challenger' | 'follower' | 'niche';
}

export interface RoadmapPhase {
  phase: number;
  name: string;
  duration: string;
  objectives: string[];
  initiatives: Initiative[];
  estimatedCost: number;
  expectedROI: number;
  kpis: KPI[];
  // Added for compatibility
  expectedRevenue: number;
  requiredInvestment: number;
}

export interface Initiative {
  name: string;
  title: string; // Added for compatibility
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedEffort: string;
  dependencies: string[];
  expectedImpact: string;
  successMetrics: string[];
}

export interface KPI {
  metric: string;
  current: number;
  target: number;
  unit: string;
}

export interface Recommendation {
  id: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  expectedImpact: string;
  implementationComplexity: 'low' | 'medium' | 'high';
  timeToValue: string;
  cost: 'low' | 'medium' | 'high';
  prerequisites: string[];
  successMetrics: string[];
}

// ==================== Industry Benchmarks ====================

export interface IndustryBenchmark {
  industry: string;
  metrics: {
    averageRetentionRate: number;
    averageCLV: number;
    averageCAC: number;
    averageRepeatPurchaseRate: number;
    averageNPS: number;
    averageChurnRate: number;
  };
  topQuartile: {
    retentionRate: number;
    clv: number;
    cac: number;
    repeatPurchaseRate: number;
  };
}

// ==================== Scoring System ====================

export interface ScoringCriteria {
  category: string;
  weight: number;
  factors: ScoringFactor[];
}

export interface ScoringFactor {
  name: string;
  weight: number;
  thresholds: {
    excellent: number;
    good: number;
    fair: number;
    poor: number;
  };
}

// ==================== Maturity Levels ====================

export type MaturityLevel = 'nascent' | 'developing' | 'defined' | 'managed' | 'optimized';

export interface MaturityAssessment {
  level: MaturityLevel;
  score: number;
  description: string;
  characteristics: string[];
  nextLevel: {
    level: MaturityLevel;
    requirements: string[];
    estimatedTimeline: string;
  };
}

// ==================== Segment Analysis ====================

export interface CustomerSegment {
  name: string;
  size: number;
  percentage: number;
  characteristics: string[];
  averageCLV: number;
  retentionRate: number;
  churnRisk: 'low' | 'medium' | 'high';
  recommendations: string[];
}

// ==================== Channel Insights ====================

export interface ChannelInsight {
  channel: string;
  performance: 'excellent' | 'good' | 'average' | 'poor';
  engagement: number;
  conversion: number;
  roi: number;
  trends: {
    metric: string;
    direction: 'up' | 'down' | 'stable';
    change: number;
  }[];
  opportunities: string[];
}

// ==================== Export Types ====================

export interface AuditExport {
  metadata: {
    generatedAt: Date;
    company: string;
    industry: string;
    version: string;
  };
  results: EnhancedAuditResults;
  formData: EnhancedAuditFormData;
}

// ==================== Helper Types ====================

export type ScoreRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';

export type ImplementationComplexity = 'low' | 'medium' | 'high';

export type TimeHorizon = 'immediate' | 'short_term' | 'medium_term' | 'long_term';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type ChannelType = 'email' | 'sms' | 'push' | 'social' | 'web' | 'mobile' | 'offline';

export type CustomerStage = 'acquisition' | 'activation' | 'nurture' | 'retention' | 'winback' | 'advocacy';

// ==================== Constants ====================

export const MATURITY_LEVELS: Record<MaturityLevel, { min: number; max: number; description: string }> = {
  nascent: {
    min: 0,
    max: 20,
    description: 'Basic retention activities with minimal automation',
  },
  developing: {
    min: 21,
    max: 40,
    description: 'Some structured retention programs beginning to take shape',
  },
  defined: {
    min: 41,
    max: 60,
    description: 'Established retention programs with defined processes',
  },
  managed: {
    min: 61,
    max: 80,
    description: 'Data-driven retention strategy with advanced automation',
  },
  optimized: {
    min: 81,
    max: 100,
    description: 'Industry-leading retention excellence with continuous optimization',
  },
};

export const INDUSTRY_BENCHMARKS: Record<string, IndustryBenchmark> = {
  ecommerce: {
    industry: 'E-commerce',
    metrics: {
      averageRetentionRate: 38,
      averageCLV: 3500,
      averageCAC: 45,
      averageRepeatPurchaseRate: 28,
      averageNPS: 45,
      averageChurnRate: 62,
    },
    topQuartile: {
      retentionRate: 55,
      clv: 6000,
      cac: 30,
      repeatPurchaseRate: 45,
    },
  },
  saas: {
    industry: 'SaaS',
    metrics: {
      averageRetentionRate: 90,
      averageCLV: 15000,
      averageCAC: 1200,
      averageRepeatPurchaseRate: 85,
      averageNPS: 50,
      averageChurnRate: 10,
    },
    topQuartile: {
      retentionRate: 95,
      clv: 25000,
      cac: 800,
      repeatPurchaseRate: 92,
    },
  },
  subscription: {
    industry: 'Subscription Box',
    metrics: {
      averageRetentionRate: 75,
      averageCLV: 800,
      averageCAC: 60,
      averageRepeatPurchaseRate: 70,
      averageNPS: 55,
      averageChurnRate: 25,
    },
    topQuartile: {
      retentionRate: 85,
      clv: 1500,
      cac: 40,
      repeatPurchaseRate: 80,
    },
  },
  // Add more industries as needed
};
