import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3034/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  change_percent: number;
  volume: number;
  market_cap: number;
}

export interface MarketOverview {
  nifty_50: {
    value: number;
    change: number;
    change_percent: number;
  };
  sensex: {
    value: number;
    change: number;
    change_percent: number;
  };
  bank_nifty: {
    value: number;
    change: number;
    change_percent: number;
  };
  market_cap: {
    value: number;
    change: number;
    change_percent: number;
  };
}

// API Service class
export class ApiService {
  // Health check
  static async healthCheck(): Promise<ApiResponse> {
    const response = await apiClient.get('/health');
    return response.data as ApiResponse;
  }

  // Stock APIs
  static async getStocks(): Promise<ApiResponse<Stock[]>> {
    const response = await apiClient.get('/stocks');
    return response.data as ApiResponse<Stock[]>;
  }

  static async getMarketOverview(): Promise<ApiResponse<MarketOverview>> {
    const response = await apiClient.get('/stocks/market-overview');
    return response.data as ApiResponse<MarketOverview>;
  }

  // Auth APIs (for future phases)
  static async login(email: string, password: string): Promise<ApiResponse> {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data as ApiResponse;
  }

  static async register(userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<ApiResponse> {
    const response = await apiClient.post('/auth/register', userData);
    return response.data as ApiResponse;
  }

  static async logout(): Promise<ApiResponse> {
    const response = await apiClient.post('/auth/logout');
    return response.data as ApiResponse;
  }

  static async getUser(): Promise<ApiResponse> {
    const response = await apiClient.get('/user');
    return response.data as ApiResponse;
  }
}

export default apiClient; 