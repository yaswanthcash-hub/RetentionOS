// lib/audit/professional-audit-generator.ts
import { AuditFormData, AuditResults } from '@/types/audit';

// India-specific industry benchmarks
const INDIA_BENCHMARKS: Record<string, {
    retention: number;
    churn: number;
    clv: number;
    repeatPurchase: number;
}> = {
    'Fashion & Apparel': { retention: 35, churn: 65, clv: 12000, repeatPurchase: 28 },
    'Beauty & Cosmetics': { retention: 42, churn: 58, clv: 15000, repeatPurchase: 35 },
    'Health & Wellness': { retention: 48, churn: 52, clv: 18000, repeatPurchase: 40 },
    'Food & Beverage': { retention: 55, churn: 45, clv: 8000, repeatPurchase: 50 },
    'Electronics': { retention: 25, churn: 75, clv: 25000, repeatPurchase: 15 },
    'Home & Garden': { retention: 30, churn: 70, clv: 14000, repeatPurchase: 22 },
    'Pet Supplies': { retention: 60, churn: 40, clv: 16000, repeatPurchase: 55 },
    'Jewelry & Accessories': { retention: 28, churn: 72, clv: 20000, repeatPurchase: 18 },
    'Sports & Outdoors': { retention: 38, churn: 62, clv: 13000, repeatPurchase: 30 },
    'Other': { retention: 35, churn: 65, clv: 12000, repeatPurchase: 25 },
};

export function generateProfessionalAudit(formData: Partial<AuditFormData>, currency: string = 'INR'): AuditResults {
    // Calculate lifecycle scores
    const acquisitionScore = (formData.acquisition || 5) * 10;
    const activationScore = (formData.activation || 5) * 10;
    const nurtureScore = (formData.nurture || 5) * 10;
    const retentionScore = (formData.retention || 5) * 10;
    const winbackScore = (formData.winback || 5) * 10;

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
        (acquisitionScore * 0.15 +
            activationScore * 0.20 +
            nurtureScore * 0.25 +
            retentionScore * 0.30 +
            winbackScore * 0.10)
    );

    // Get industry benchmark
    const industry = formData.industry || 'Other';
    const benchmark = INDIA_BENCHMARKS[industry] || INDIA_BENCHMARKS['Other'];
    const industryBenchmark = benchmark.retention;

    // Calculate percentile
    const percentile = Math.min(95, Math.max(5, Math.round((overallScore / 100) * 100)));

    // Calculate CLV
    const aov = formData.averageOrderValue || 1500;
    const frequency = formData.purchaseFrequency || 2.5;
    const lifespan = formData.customerLifespan || 24;
    const clv = Math.round(aov * frequency * lifespan);

    // Calculate LTV:CAC ratio
    const cac = formData.customerAcquisitionCost || 800;
    const ltvCacRatio = Number((clv / cac).toFixed(2));

    // Get monthly revenue from form data
    const monthlyRevenue = formData.monthlyRevenue || 500000;

    // Generate lifecycle scores array
    const lifecycleScores = [
        {
            stage: 'Acquisition',
            score: acquisitionScore,
            benchmark: 70,
            gap: Math.max(0, 70 - acquisitionScore),
            status: acquisitionScore >= 75 ? 'excellent' : acquisitionScore >= 60 ? 'good' : 'needs-improvement',
            color: acquisitionScore >= 75 ? '#10B981' : acquisitionScore >= 60 ? '#F59E0B' : '#EF4444',
        },
        {
            stage: 'Activation',
            score: activationScore,
            benchmark: 75,
            gap: Math.max(0, 75 - activationScore),
            status: activationScore >= 80 ? 'excellent' : activationScore >= 65 ? 'good' : 'needs-improvement',
            color: activationScore >= 80 ? '#10B981' : activationScore >= 65 ? '#F59E0B' : '#EF4444',
        },
        {
            stage: 'Nurture',
            score: nurtureScore,
            benchmark: 65,
            gap: Math.max(0, 65 - nurtureScore),
            status: nurtureScore >= 70 ? 'excellent' : nurtureScore >= 55 ? 'good' : 'needs-improvement',
            color: nurtureScore >= 70 ? '#10B981' : nurtureScore >= 55 ? '#F59E0B' : '#EF4444',
        },
        {
            stage: 'Retention',
            score: retentionScore,
            benchmark: industryBenchmark,
            gap: Math.max(0, industryBenchmark - retentionScore),
            status: retentionScore >= industryBenchmark + 10 ? 'excellent' : retentionScore >= industryBenchmark - 5 ? 'good' : 'needs-improvement',
            color: retentionScore >= industryBenchmark + 10 ? '#10B981' : retentionScore >= industryBenchmark - 5 ? '#F59E0B' : '#EF4444',
        },
        {
            stage: 'Win-back',
            score: winbackScore,
            benchmark: 55,
            gap: Math.max(0, 55 - winbackScore),
            status: winbackScore >= 60 ? 'excellent' : winbackScore >= 45 ? 'good' : 'needs-improvement',
            color: winbackScore >= 60 ? '#10B981' : winbackScore >= 45 ? '#F59E0B' : '#EF4444',
        },
    ];

    // Generate intelligent recommendations
    const recommendations = generateRecommendations(formData, lifecycleScores, overallScore);

    // Identify strengths and weaknesses
    const strengths = identifyStrengths(lifecycleScores, formData);
    const weaknesses = identifyWeaknesses(lifecycleScores, formData);

    // Generate top opportunities with proper revenue calculations
    const topOpportunities = generateOpportunities(lifecycleScores, formData, monthlyRevenue);

    // Calculate revenue opportunities
    const totalMonthlyOpportunity = calculateMonthlyOpportunity(overallScore, monthlyRevenue, industryBenchmark);
    const totalAnnualOpportunity = totalMonthlyOpportunity * 12;

    return {
        overallScore,
        industryBenchmark,
        percentile,
        categoryScores: {
            acquisition: acquisitionScore,
            activation: activationScore,
            retention: retentionScore,
        },
        lifecycleScores,
        clv,
        ltvCacRatio,
        recommendations,
        strengths,
        weaknesses,
        topOpportunities,
        totalMonthlyOpportunity,
        totalAnnualOpportunity,
        currency, // Add currency to results
        leadData: {
            company: formData.company || 'Your Company',
            industry: formData.industry || 'E-commerce',
            email: formData.email || '',
        },
    };
}

function generateRecommendations(
    formData: Partial<AuditFormData>,
    lifecycleScores: any[],
    overallScore: number
): string[] {
    const recommendations: string[] = [];

    // Prioritize based on lifecycle gaps
    const sortedByGap = [...lifecycleScores].sort((a, b) => b.gap - a.gap);

    sortedByGap.slice(0, 3).forEach(stage => {
        if (stage.gap > 10) {
            switch (stage.stage) {
                case 'Acquisition':
                    recommendations.push('Optimize customer acquisition channels with better targeting and messaging');
                    break;
                case 'Activation':
                    recommendations.push('Implement welcome series automation to improve first purchase conversion');
                    break;
                case 'Nurture':
                    recommendations.push('Build automated nurture campaigns based on customer behavior and preferences');
                    break;
                case 'Retention':
                    recommendations.push('Launch retention-focused campaigns including loyalty programs and exclusive offers');
                    break;
                case 'Win-back':
                    recommendations.push('Create win-back campaigns targeting lapsed customers with personalized incentives');
                    break;
            }
        }
    });

    // Add tech stack recommendations
    if (!formData.emailPlatform || formData.emailPlatform === 'None') {
        recommendations.push('Implement professional email marketing platform (Klaviyo/Mailchimp) for automation');
    }

    if ((formData.activeFlows || 0) < 5) {
        recommendations.push('Expand automated flow coverage - aim for 8-12 active flows minimum');
    }

    if ((formData.segmentCount || 0) < 5) {
        recommendations.push('Increase customer segmentation to enable personalized messaging (target 10+ segments)');
    }

    // Add personalization recommendation
    if (formData.personalizationLevel === 'basic' || !formData.personalizationLevel) {
        recommendations.push('Upgrade to advanced personalization using behavioral triggers and dynamic content');
    }

    return recommendations.slice(0, 5);
}

function identifyStrengths(lifecycleScores: any[], formData: Partial<AuditFormData>): string[] {
    const strengths: string[] = [];

    lifecycleScores.forEach(stage => {
        if (stage.status === 'excellent') {
            strengths.push(`Strong ${stage.stage.toLowerCase()} performance (${stage.score}/100)`);
        }
    });

    if ((formData.activeFlows || 0) >= 8) {
        strengths.push('Comprehensive automation coverage with multiple active flows');
    }

    if ((formData.segmentCount || 0) >= 10) {
        strengths.push('Advanced customer segmentation strategy in place');
    }

    if (formData.personalizationLevel === 'advanced') {
        strengths.push('Sophisticated personalization and dynamic content implementation');
    }

    return strengths.length > 0 ? strengths : ['Foundation in place for retention improvement'];
}

function identifyWeaknesses(lifecycleScores: any[], formData: Partial<AuditFormData>): string[] {
    const weaknesses: string[] = [];

    lifecycleScores.forEach(stage => {
        if (stage.status === 'needs-improvement') {
            weaknesses.push(`${stage.stage} needs attention (${stage.gap} points below benchmark)`);
        }
    });

    if ((formData.activeFlows || 0) < 5) {
        weaknesses.push('Limited automation - missing key customer journey flows');
    }

    if ((formData.segmentCount || 0) < 5) {
        weaknesses.push('Insufficient segmentation limiting personalization potential');
    }

    if (!formData.loyaltyPlatform || formData.loyaltyPlatform === 'None') {
        weaknesses.push('No loyalty program in place to drive repeat purchases');
    }

    return weaknesses;
}

function generateOpportunities(
    lifecycleScores: any[],
    formData: Partial<AuditFormData>,
    monthlyRevenue: number
): any[] {
    const opportunities: any[] = [];

    // Find biggest gaps
    const sortedByGap = [...lifecycleScores].sort((a, b) => b.gap - a.gap);

    sortedByGap.slice(0, 3).forEach((stage, index) => {
        const impact = stage.gap * 100; // Simplified impact calculation
        const potentialGain = Math.round((stage.gap / 100) * monthlyRevenue * 0.15);

        opportunities.push({
            title: `Improve ${stage.stage} Performance`,
            description: `Close the ${stage.gap}-point gap to reach industry benchmark`,
            impact: impact > 1000 ? 'High' : impact > 500 ? 'Medium' : 'Low',
            effort: stage.gap > 20 ? 'High' : stage.gap > 10 ? 'Medium' : 'Low',
            monthlyRevenue: potentialGain, // Changed from monthlyValue to match OpportunityCard
            annualRevenue: potentialGain * 12, // Changed from annualValue to match OpportunityCard
            priority: index + 1,
            actions: getActionsForStage(stage.stage, formData),
        });
    });

    return opportunities;
}

function getActionsForStage(stage: string, formData: Partial<AuditFormData>): string[] {
    const actions: { [key: string]: string[] } = {
        'Acquisition': [
            'Optimize landing pages for conversion',
            'Implement referral program',
            'Improve targeting and ad creative',
        ],
        'Activation': [
            'Create compelling welcome series (3-5 emails)',
            'Offer first-purchase incentive',
            'Reduce friction in checkout process',
        ],
        'Nurture': [
            'Build browse abandonment flow',
            'Implement post-purchase education series',
            'Create engagement campaigns based on behavior',
        ],
        'Retention': [
            'Launch loyalty/rewards program',
            'Implement replenishment reminders',
            'Create VIP customer segment with exclusive perks',
        ],
        'Win-back': [
            'Build lapsed customer win-back flow',
            'Offer personalized comeback incentives',
            'Survey churned customers for insights',
        ],
    };

    return actions[stage] || [];
}

function calculateMonthlyOpportunity(
    currentScore: number,
    monthlyRevenue: number,
    benchmark: number
): number {
    // Calculate potential revenue increase
    // Even if above benchmark, there's always room to reach industry best practice (85+)
    const targetScore = 85; // Industry best practice
    const gap = Math.max(0, targetScore - currentScore);
    const improvementPotential = gap / 100;

    // Conservative estimate: 20% revenue impact for reaching best practice
    const revenueImpact = improvementPotential * monthlyRevenue * 0.20;

    return Math.round(revenueImpact);
}
