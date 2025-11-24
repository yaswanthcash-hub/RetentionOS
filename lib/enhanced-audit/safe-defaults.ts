// lib/enhanced-audit/safe-defaults.ts
// Safe default values and validation for Enhanced Audit

import { EnhancedAuditFormData } from '@/types/enhanced-audit/enhanced-audit';

/**
 * Ensures all form data has safe default values to prevent NaN and $0 errors
 */
export function applySafeDefaults(data: Partial<EnhancedAuditFormData>): EnhancedAuditFormData {
    return {
        // Company Profile
        company: data.company || 'Your Company',
        industry: data.industry || 'E-commerce',
        subIndustry: data.subIndustry,
        yearFounded: data.yearFounded,
        employeeCount: data.employeeCount || '1-10',
        websiteUrl: data.websiteUrl,

        // Financial Metrics - CRITICAL: Prevent $0 errors
        monthlyRevenue: data.monthlyRevenue || 500000, // Default ₹5L/month
        annualRevenue: data.annualRevenue || (data.monthlyRevenue || 500000) * 12,
        revenueGrowthRate: data.revenueGrowthRate || 20,
        averageOrderValue: data.averageOrderValue || 1500, // Default ₹1500
        averageMargin: data.averageMargin || 30,

        // Customer Base - CRITICAL: Prevent division by zero
        totalCustomers: data.totalCustomers || 1000, // Default 1000 customers
        monthlyNewCustomers: data.monthlyNewCustomers || 100,
        monthlyActiveCustomers: data.monthlyActiveCustomers || 600,
        averageCustomerLifespan: data.averageCustomerLifespan || 24,
        customerAcquisitionCost: data.customerAcquisitionCost || 800,

        // Behavioral Metrics
        repeatPurchaseRate: data.repeatPurchaseRate || 25,
        purchaseFrequency: data.purchaseFrequency || 2.5,
        averageTimeBetweenPurchases: data.averageTimeBetweenPurchases || 45,
        cartAbandonmentRate: data.cartAbandonmentRate || 70,
        returnRate: data.returnRate || 5,

        // Channel Performance
        emailOpenRate: data.emailOpenRate || 20,
        emailClickRate: data.emailClickRate || 2.5,
        emailConversionRate: data.emailConversionRate || 1.5,
        smsEngagementRate: data.smsEngagementRate,
        pushNotificationEngagementRate: data.pushNotificationEngagementRate,

        // Lifecycle Stages (1-10 scores)
        acquisition: data.acquisition || 5,
        activation: data.activation || 5,
        nurture: data.nurture || 5,
        retention: data.retention || 5,
        winback: data.winback || 5,
        advocacy: data.advocacy || 5,

        // Technology Stack
        emailPlatform: data.emailPlatform || 'None',
        smsPlatform: data.smsPlatform || 'None',
        pushNotificationPlatform: data.pushNotificationPlatform || 'None',
        reviewsPlatform: data.reviewsPlatform || 'None',
        loyaltyPlatform: data.loyaltyPlatform || 'None',
        cdpPlatform: data.cdpPlatform || 'None',
        analyticsPlatform: data.analyticsPlatform || 'None',
        automationPlatform: data.automationPlatform || 'None',

        // Advanced Capabilities
        activeFlows: data.activeFlows || 0,
        segmentCount: data.segmentCount || 0,
        personalizationLevel: data.personalizationLevel || 'none',
        predictiveAnalytics: data.predictiveAnalytics || false,
        aiRecommendations: data.aiRecommendations || false,
        crossChannelOrchestration: data.crossChannelOrchestration || false,

        // Data Quality
        dataCollectionQuality: data.dataCollectionQuality || 5,
        dataIntegrationLevel: data.dataIntegrationLevel || 5,
        attributionTracking: data.attributionTracking || false,

        // Team & Resources
        marketingTeamSize: data.marketingTeamSize || 2,
        retentionFocusPercent: data.retentionFocusPercent || 20,
        monthlyMarketingBudget: data.monthlyMarketingBudget || 50000,

        // Contact Info
        name: data.name || '',
        email: data.email || '',
        role: data.role || '',
        phone: data.phone,

        // Goals
        primaryGoal: data.primaryGoal || 'Increase retention',
        targetRetentionRate: data.targetRetentionRate,
        timeline: data.timeline,
    };
}

/**
 * Validates that critical financial metrics are non-zero
 */
export function validateFinancialMetrics(data: EnhancedAuditFormData): boolean {
    const criticalFields = [
        data.monthlyRevenue,
        data.totalCustomers,
        data.averageOrderValue,
    ];

    return criticalFields.every(field => field && field > 0);
}
