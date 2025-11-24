// components/EnhancedAuditDashboard.tsx
'use client';

import React, { useState } from 'react';
import { EnhancedAuditResults } from '@/types/enhanced-audit/enhanced-audit';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import ExecutiveSummary from './dashboard/ExecutiveSummary';
import FinancialAnalysis from './dashboard/FinancialAnalysis';
import LifecycleAnalysis from './dashboard/LifecycleAnalysis';
import OpportunitiesSection from './dashboard/OpportunitiesSection';
import ImplementationRoadmap from './dashboard/ImplementationRoadmap';
import CompetitiveBenchmarks from './dashboard/CompetitiveBenchmarks';
import CustomerSegments from './dashboard/CustomerSegments';
import TechStackAnalysis from './dashboard/TechStackAnalysis';
import ChannelPerformance from './dashboard/ChannelPerformance';
import RiskAssessment from './dashboard/RiskAssessment';
import IndustryTrends from './dashboard/IndustryTrends';
import CallToAction from './dashboard/CallToAction';

interface EnhancedAuditDashboardProps {
  results: EnhancedAuditResults;
}

export default function EnhancedAuditDashboard({ results }: EnhancedAuditDashboardProps) {
  const [activeSection, setActiveSection] = useState('all');
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const handleDownloadPDF = async () => {
    // In production, this would call an API to generate a PDF
    alert('PDF generation feature coming soon! For now, use Print to save as PDF.');
    handlePrint();
  };

  const sections = [
    { id: 'all', name: 'Full Report', icon: '📊' },
    { id: 'executive', name: 'Executive Summary', icon: '👔' },
    { id: 'financial', name: 'Financial Analysis', icon: '💰' },
    { id: 'lifecycle', name: 'Lifecycle Scores', icon: '♻️' },
    { id: 'opportunities', name: 'Opportunities', icon: '🎯' },
    { id: 'roadmap', name: 'Implementation', icon: '🗺️' },
    { id: 'competitive', name: 'Benchmarks', icon: '📈' },
    { id: 'customers', name: 'Customer Segments', icon: '👥' },
    { id: 'tech', name: 'Tech Stack', icon: '⚙️' },
    { id: 'channels', name: 'Channel Performance', icon: '📱' },
    { id: 'risks', name: 'Risk Assessment', icon: '⚠️' },
    { id: 'trends', name: 'Industry Trends', icon: '🔮' },
  ];

  const shouldShowSection = (sectionId: string) => {
    return activeSection === 'all' || activeSection === sectionId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Retention Audit Report
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {results.leadData.company} • Generated {new Date(results.generatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>🖨️</span>
                <span>Print Report</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>📥</span>
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 py-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${activeSection === section.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Report Info Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Report ID</p>
              <p className="font-mono text-sm font-semibold text-gray-900">{results.reportId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Report Version</p>
              <p className="font-semibold text-gray-900">{results.reportVersion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Maturity Level</p>
              <p className="font-semibold text-gray-900 capitalize">
                {results.executiveSummary.maturityLevel}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Valid Until</p>
              <p className="font-semibold text-gray-900">
                {new Date(results.expiresAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        {shouldShowSection('executive') && (
          <ExecutiveSummary results={results} />
        )}

        {/* Financial Analysis */}
        {shouldShowSection('financial') && (
          <FinancialAnalysis results={results} />
        )}

        {/* Lifecycle Analysis */}
        {shouldShowSection('lifecycle') && (
          <LifecycleAnalysis results={results} />
        )}

        {/* Opportunities */}
        {shouldShowSection('opportunities') && (
          <OpportunitiesSection results={results} />
        )}

        {/* Implementation Roadmap */}
        {shouldShowSection('roadmap') && (
          <ImplementationRoadmap results={results} />
        )}

        {/* Competitive Benchmarks */}
        {shouldShowSection('competitive') && (
          <CompetitiveBenchmarks results={results} />
        )}

        {/* Customer Segments */}
        {shouldShowSection('customers') && (
          <CustomerSegments results={results} />
        )}

        {/* Tech Stack Analysis */}
        {shouldShowSection('tech') && (
          <TechStackAnalysis results={results} />
        )}

        {/* Channel Performance */}
        {shouldShowSection('channels') && (
          <ChannelPerformance results={results} />
        )}

        {/* Risk Assessment */}
        {shouldShowSection('risks') && (
          <RiskAssessment results={results} />
        )}

        {/* Industry Trends */}
        {shouldShowSection('trends') && (
          <IndustryTrends results={results} />
        )}

        {/* Call to Action */}
        <CallToAction results={results} />

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            This report contains proprietary analysis and recommendations.
            For questions or to discuss implementation, contact your RetentionOS representative.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © 2025 RetentionOS. All rights reserved.
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:break-after {
            page-break-after: always;
          }
          .print\\:break-before {
            page-break-before: always;
          }
        }
      `}</style>
    </div>
  );
}
