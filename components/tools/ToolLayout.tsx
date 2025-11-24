'use client';

import React from 'react';
import Link from 'next/link';

interface ToolLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    toolId?: string;
}

export default function ToolLayout({ title, description, children, toolId }: ToolLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Premium Brand Header */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-b-4 border-[#D1F25E]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-6">
                        <Link
                            href="/tools"
                            className="inline-flex items-center text-gray-400 hover:text-[#D1F25E] transition-colors text-sm font-medium"
                        >
                            <span className="mr-2">←</span> Back to Tools
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-2 h-12 bg-[#D1F25E] rounded-full"></div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                                    {title}
                                </h1>
                            </div>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Brand Mark */}
                        <div className="hidden md:block opacity-20">
                            <div className="w-24 h-24 rounded-full border-4 border-[#D1F25E] flex items-center justify-center">
                                <span className="text-4xl font-bold text-[#D1F25E]">R</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {children}
                </div>

                {/* Trust/Brand Footer for Tools */}
                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>© RetentionOS • Enterprise Retention Intelligence</p>
                </div>
            </main>
        </div>
    );
}
