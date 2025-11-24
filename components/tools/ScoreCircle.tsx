'use client';

// components/tools/ScoreCircle.tsx
import { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  color?: string;
}

export default function ScoreCircle({
  score,
  size = 'lg',
  showLabel = true,
  label = 'Overall Score',
  color,
}: ScoreCircleProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedScore(Math.min(Math.round(increment * currentStep), score));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score]);

  const sizes = {
    sm: { width: 120, height: 120, fontSize: '2rem', strokeWidth: 8 },
    md: { width: 160, height: 160, fontSize: '3rem', strokeWidth: 10 },
    lg: { width: 200, height: 200, fontSize: '4rem', strokeWidth: 12 },
  };

  const dimensions = sizes[size];
  const radius = (dimensions.width - dimensions.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  const getColor = () => {
    if (color) return color;
    if (score >= 80) return '#D1F25E'; // Brand lime-green
    if (score >= 60) return '#3B82F6'; // Blue
    if (score >= 40) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  const scoreColor = getColor();

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
        <svg
          className="transform -rotate-90"
          width={dimensions.width}
          height={dimensions.height}
        >
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.height / 2}
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={dimensions.strokeWidth}
          />
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.height / 2}
            r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth={dimensions.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <div
            className="font-bold"
            style={{ fontSize: dimensions.fontSize, color: scoreColor }}
          >
            {animatedScore}
          </div>
          <div className="text-sm text-gray-500 font-medium">/ 100</div>
        </div>
      </div>

      {showLabel && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-gray-700">{label}</p>
        </div>
      )}
    </div>
  );
}
