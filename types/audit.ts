/**
 * Type definitions for Basic Retention Audit
 */

export interface AuditFormData {
  // Company Info
  company: string;
  industry: string;

  // Metrics
  totalCustomers?: number;
  monthlyRevenue: number;
  monthlyCustomers?: number;
  averageOrderValue: number;
  repeatPurchaseRate: number;
  purchaseFrequency?: number;
  customerLifespan?: number;
  customerAcquisitionCost?: number;

  // Channels
  emailOpenRate?: number;
  emailClickRate?: number;

  // Lifecycle Scores (1-10)
  acquisition?: number;
  activation?: number;
  nurture?: number;
  retention?: number;
  winback?: number;
  acquisitionScore?: number;
  activationScore?: number;
  retentionScore?: number;

  // Tech Stack
  emailPlatform?: string;
  smsPlatform?: string;
  reviewsPlatform?: string;
  loyaltyPlatform?: string;
  activeFlows?: number;
  segmentCount?: number;
  personalizationLevel?: string;

  // Contact
  name: string;
  email: string;
  role?: string;
}

export interface AuditResults {
  overallScore: number;
  industryBenchmark?: number;
  percentile?: number;
  categoryScores: {
    acquisition: number;
    activation: number;
    retention: number;
  };
  lifecycleScores?: any[];
  clv: number;
  ltvCacRatio: number;
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
  topOpportunities?: any[];
  totalMonthlyOpportunity?: number;
  totalAnnualOpportunity?: number;
  currency?: string; // Added for multi-currency support
  leadData?: any;
}
