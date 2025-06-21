// Format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(value);
};

// Format percentage
export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

// Format large numbers (K, M, B)
export const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
};

// Get color based on value change
export const getChangeColor = (change: number): string => {
  if (change > 0) return 'text-green-600';
  if (change < 0) return 'text-red-600';
  return 'text-gray-600';
};

// Utility functions for formatting and calculations

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN').format(value);
};

export const calculateChange = (current: number, previous: number): number => {
  return ((current - previous) / previous) * 100;
}; 