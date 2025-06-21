import { useState, useCallback } from 'react';
import { ApiService, ApiResponse, Stock, MarketOverview } from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>() => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (apiCall: () => Promise<ApiResponse<T>>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiCall();
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  }, []);

  return {
    ...state,
    execute,
  };
};

// Specific hooks for different API calls
export const useStocks = () => {
  const { data, loading, error, execute } = useApi<Stock[]>();

  const fetchStocks = useCallback(() => {
    return execute(() => ApiService.getStocks());
  }, [execute]);

  return {
    stocks: data,
    loading,
    error,
    fetchStocks,
  };
};

export const useMarketOverview = () => {
  const { data, loading, error, execute } = useApi<MarketOverview>();

  const fetchMarketOverview = useCallback(() => {
    return execute(() => ApiService.getMarketOverview());
  }, [execute]);

  return {
    marketOverview: data,
    loading,
    error,
    fetchMarketOverview,
  };
};

export const useHealthCheck = () => {
  const { data, loading, error, execute } = useApi<any>();

  const checkHealth = useCallback(() => {
    return execute(() => ApiService.healthCheck());
  }, [execute]);

  return {
    health: data,
    loading,
    error,
    checkHealth,
  };
}; 