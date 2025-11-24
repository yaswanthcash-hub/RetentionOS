import React from 'react';

interface PremiumHeroCardProps {
    title: string;
    value: string;
    subtext?: string;
    icon?: string;
    trend?: string;
    trendDirection?: 'up' | 'down' | 'neutral';
    className?: string;
}

export const PremiumHeroCard: React.FC<PremiumHeroCardProps> = ({
    title,
    value,
    subtext,
    icon,
    trend,
    trendDirection = 'neutral',
    className = ''
}) => {
    return (
        <div className={`bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[200px] ${className}`}>
            {icon && (
                <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                    <span className="text-8xl">{icon}</span>
                </div>
            )}

            <div>
                <p className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-sm">{title}</p>
                <h3 className="text-5xl md:text-6xl font-bold text-[#D1F25E] mb-2 tracking-tight">
                    {value}
                </h3>
            </div>

            {(subtext || trend) && (
                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                    {subtext && <p className="text-gray-400 text-sm">{subtext}</p>}
                    {trend && (
                        <span className={`text-sm font-bold px-2 py-1 rounded ${trendDirection === 'up' ? 'bg-green-900 text-green-300' :
                                trendDirection === 'down' ? 'bg-red-900 text-red-300' : 'bg-gray-800 text-gray-300'
                            }`}>
                            {trend}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};
