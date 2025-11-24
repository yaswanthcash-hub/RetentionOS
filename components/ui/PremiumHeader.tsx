import React from 'react';

interface PremiumHeaderProps {
    title: string;
    description?: string;
    centered?: boolean;
}

export const PremiumHeader: React.FC<PremiumHeaderProps> = ({
    title,
    description,
    centered = true
}) => {
    return (
        <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            {description && (
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    {description}
                </p>
            )}
        </div>
    );
};
