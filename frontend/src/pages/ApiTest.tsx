import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import { useStocks, useMarketOverview, useHealthCheck } from '../hooks/useApi';

const ApiTest: React.FC = () => {
  const { health, loading: healthLoading, error: healthError, checkHealth } = useHealthCheck();
  const { stocks, loading: stocksLoading, error: stocksError, fetchStocks } = useStocks();
  const { marketOverview, loading: marketLoading, error: marketError, fetchMarketOverview } = useMarketOverview();
  
  const [testResults, setTestResults] = useState<{
    health: boolean;
    stocks: boolean;
    market: boolean;
  }>({
    health: false,
    stocks: false,
    market: false,
  });

  useEffect(() => {
    const runTests = async () => {
      const results = { health: false, stocks: false, market: false };

      // Test health endpoint
      try {
        await checkHealth();
        results.health = true;
      } catch (error) {
        console.error('Health check failed:', error);
      }

      // Test stocks endpoint
      try {
        await fetchStocks();
        results.stocks = true;
      } catch (error) {
        console.error('Stocks fetch failed:', error);
      }

      // Test market overview endpoint
      try {
        await fetchMarketOverview();
        results.market = true;
      } catch (error) {
        console.error('Market overview fetch failed:', error);
      }

      setTestResults(results);
    };

    runTests();
  }, [checkHealth, fetchStocks, fetchMarketOverview]);

  const getStatusIcon = (status: boolean) => status ? '✅' : '❌';
  const getStatusText = (status: boolean) => status ? 'PASS' : 'FAIL';

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>API Communication Test</h1>
      <p>This page tests the communication between frontend and backend APIs.</p>

      <div style={{ marginBottom: '30px' }}>
        <h2>Test Results</h2>
        <div style={{ display: 'grid', gap: '10px' }}>
          <div style={{ 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: testResults.health ? '#f0f9ff' : '#fef2f2'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span><strong>Health Check:</strong> GET /api/health</span>
              <span>{getStatusIcon(testResults.health)} {getStatusText(testResults.health)}</span>
            </div>
            {healthLoading && <div style={{ color: '#6b7280', fontSize: '14px' }}>Loading...</div>}
            {healthError && <div style={{ color: '#dc2626', fontSize: '14px' }}>Error: {healthError}</div>}
            {health && <div style={{ color: '#059669', fontSize: '14px' }}>Response: {JSON.stringify(health, null, 2)}</div>}
          </div>

          <div style={{ 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: testResults.stocks ? '#f0f9ff' : '#fef2f2'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span><strong>Stocks Data:</strong> GET /api/stocks</span>
              <span>{getStatusIcon(testResults.stocks)} {getStatusText(testResults.stocks)}</span>
            </div>
            {stocksLoading && <div style={{ color: '#6b7280', fontSize: '14px' }}>Loading...</div>}
            {stocksError && <div style={{ color: '#dc2626', fontSize: '14px' }}>Error: {stocksError}</div>}
            {stocks && <div style={{ color: '#059669', fontSize: '14px' }}>Received {stocks.length} stocks</div>}
          </div>

          <div style={{ 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: testResults.market ? '#f0f9ff' : '#fef2f2'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span><strong>Market Overview:</strong> GET /api/stocks/market-overview</span>
              <span>{getStatusIcon(testResults.market)} {getStatusText(testResults.market)}</span>
            </div>
            {marketLoading && <div style={{ color: '#6b7280', fontSize: '14px' }}>Loading...</div>}
            {marketError && <div style={{ color: '#dc2626', fontSize: '14px' }}>Error: {marketError}</div>}
            {marketOverview && <div style={{ color: '#059669', fontSize: '14px' }}>Market data received</div>}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>API Configuration</h2>
        <div style={{ 
          padding: '15px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9fafb'
        }}>
          <p><strong>Frontend URL:</strong> http://localhost:3033</p>
          <p><strong>Backend API URL:</strong> {process.env.REACT_APP_API_URL || 'http://localhost:3034/api'}</p>
          <p><strong>CORS Enabled:</strong> Yes (configured in Laravel)</p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Sample Data</h2>
        {stocks && (
          <div style={{ marginBottom: '20px' }}>
            <h3>Stocks Data</h3>
            <pre style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '15px', 
              borderRadius: '8px', 
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {JSON.stringify(stocks, null, 2)}
            </pre>
          </div>
        )}

        {marketOverview && (
          <div>
            <h3>Market Overview Data</h3>
            <pre style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '15px', 
              borderRadius: '8px', 
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {JSON.stringify(marketOverview, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={() => window.location.href = '/'}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ApiTest; 