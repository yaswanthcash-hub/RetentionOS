/**
 * Utility functions for RetentionOS
 * Common formatting, validation, and helper functions
 */

// ==================== Currency Formatting ====================

export const formatCurrency = (
  value: number,
  currency: string = 'USD',
  decimals: number = 0
): string => {
  try {
    // Use appropriate locale based on currency
    let locale = 'en-US';
    if (currency === 'INR') {
      locale = 'en-IN';
    } else if (currency === 'EUR') {
      locale = 'en-GB';
    } else if (currency === 'GBP') {
      locale = 'en-GB';
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  } catch (error) {
    // Fallback if currency code is invalid
    return `${currency} ${value.toFixed(decimals)}`;
  }
};

export const formatCompactCurrency = (
  value: number,
  currency: string = 'USD'
): string => {
  if (value >= 1000000) {
    return formatCurrency(value / 1000000, currency, 2) + 'M';
  }
  if (value >= 1000) {
    return formatCurrency(value / 1000, currency, 2) + 'K';
  }
  return formatCurrency(value, currency, 0);
};

// ==================== Number Formatting ====================

export const formatNumber = (
  value: number,
  decimals: number = 0
): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatDecimal = (
  value: number,
  decimals: number = 2
): string => {
  return value.toFixed(decimals);
};

// ==================== Validation Functions ====================

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidNumber = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export const isPositiveNumber = (value: number): boolean => {
  return isValidNumber(value) && value > 0;
};

export const isValidPercentage = (value: number): boolean => {
  return isValidNumber(value) && value >= 0 && value <= 100;
};

// ==================== Calculation Helpers ====================

export const safeDivide = (
  numerator: number,
  denominator: number,
  defaultValue: number = 0
): number => {
  if (denominator === 0 || !isValidNumber(denominator)) {
    return defaultValue;
  }
  return numerator / denominator;
};

export const safePercentage = (
  value: number,
  total: number,
  defaultValue: number = 0
): number => {
  if (total === 0 || !isValidNumber(total)) {
    return defaultValue;
  }
  return (value / total) * 100;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// ==================== Date Helpers ====================

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatShortDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getMonthsDifference = (date1: Date, date2: Date): number => {
  return (
    (date2.getFullYear() - date1.getFullYear()) * 12 +
    (date2.getMonth() - date1.getMonth())
  );
};

// ==================== String Helpers ====================

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ==================== Array Helpers ====================

export const average = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

export const sum = (numbers: number[]): number => {
  return numbers.reduce((sum, num) => sum + num, 0);
};

export const median = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
};

// ==================== Object Helpers ====================

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const isEmpty = (obj: any): boolean => {
  if (obj === null || obj === undefined) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

// ==================== Performance Indicators ====================

export const getPerformanceLevel = (
  value: number,
  thresholds: { good: number; warning: number }
): 'good' | 'warning' | 'critical' => {
  if (value >= thresholds.good) return 'good';
  if (value >= thresholds.warning) return 'warning';
  return 'critical';
};

export const getPerformanceColor = (
  level: 'good' | 'warning' | 'critical'
): string => {
  switch (level) {
    case 'good':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'warning':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'critical':
      return 'text-red-600 bg-red-50 border-red-200';
  }
};

// ==================== Export Helpers ====================

export const downloadJSON = (data: any, filename: string): void => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => JSON.stringify(row[header] || '')).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ==================== Local Storage Helpers ====================

export const saveToLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};
