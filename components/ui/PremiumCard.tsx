import React from 'react';

interface PremiumCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: string;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
    children,
    className = '',
    title,
    icon
}) => {
    return (
        <div className={`bg-white p-8 rounded-2xl border border-gray-200 shadow-sm ${className}`}>
            {(title || icon) && (
                <div className="flex items-center gap-3 mb-6">
                    {icon && <span className="text-2xl">{icon}</span>}
                    {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
                </div>
            )}
            {children}
        </div>
    );
};
