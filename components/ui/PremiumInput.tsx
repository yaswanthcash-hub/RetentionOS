import React from 'react';

interface PremiumInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: string;
    helperText?: string;
    className?: string;
}

export const PremiumInput: React.FC<PremiumInputProps> = ({
    label,
    icon,
    helperText,
    className = '',
    ...props
}) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-bold text-gray-900">
                {label}
            </label>
            <div className="relative">
                <input
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium text-gray-900 placeholder-gray-400"
                    {...props}
                />
                {icon && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-xl">{icon}</span>
                    </div>
                )}
            </div>
            {helperText && (
                <p className="text-xs text-gray-500">{helperText}</p>
            )}
        </div>
    );
};
