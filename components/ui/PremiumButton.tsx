import React from 'react';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
    children,
    variant = 'primary',
    size = 'lg',
    icon,
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles = "font-bold rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-gray-900 hover:bg-black text-white",
        secondary: "bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900",
        outline: "bg-white border-2 border-gray-200 hover:border-gray-900 text-gray-900",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 shadow-none"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    const width = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
            {...props}
        >
            {children}
            {icon && <span className={variant === 'primary' ? "text-[#D1F25E]" : ""}>{icon}</span>}
        </button>
    );
};
