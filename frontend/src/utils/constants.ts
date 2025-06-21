// Application constants
export const APP_NAME = 'Stock Market Analysis';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  STOCKS: {
    LIST: '/stocks',
    DETAILS: '/stocks/:symbol',
  },
  MARKET: {
    OVERVIEW: '/market/overview',
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
} as const; 