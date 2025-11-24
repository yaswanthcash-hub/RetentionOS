'use client';

// components/tools/ProgressBar.tsx
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  color,
  height = 'md',
}: ProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.min((value / max) * 100, 100);

  const getColor = () => {
    if (color) return color;
    if (percentage >= 80) return '#D1F25E'; // Brand lime-green
    if (percentage >= 60) return '#3B82F6'; // Blue
    if (percentage >= 40) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  const barColor = getColor();

  const heights = {
    sm: '6px',
    md: '10px',
    lg: '14px',
  };

  const barHeight = heights[height];

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-semibold" style={{ color: barColor }}>
              {Math.round(value)}/{max}
            </span>
          )}
        </div>
      )}

      <div
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height: barHeight }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${(animatedValue / max) * 100}%`,
            background: `linear-gradient(90deg, ${barColor} 0%, ${barColor}dd 100%)`,
          }}
        />
      </div>
    </div>
  );
}
