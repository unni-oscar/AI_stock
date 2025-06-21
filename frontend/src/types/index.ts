// Global type definitions
export interface User {
  id: string;
  email: string;
  name: string;
  dob: string;
  createdAt: string;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  dividend: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
} 