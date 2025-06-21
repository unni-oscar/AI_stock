import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import { APP_NAME } from '../utils/constants';
import { useStocks, useMarketOverview, useHealthCheck } from '../hooks/useApi';
import { Stock, MarketOverview } from '../services/api';

const Home: React.FC = () => {
  const { stocks, loading: stocksLoading, error: stocksError, fetchStocks } = useStocks();
  const { marketOverview, loading: marketLoading, error: marketError, fetchMarketOverview } = useMarketOverview();
  const { health, loading: healthLoading, error: healthError, checkHealth } = useHealthCheck();
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    // Check API health first
    checkHealth()
      .then(() => {
        setApiStatus('connected');
        // Fetch data if API is healthy
        fetchStocks();
        fetchMarketOverview();
      })
      .catch(() => {
        setApiStatus('disconnected');
      });
  }, [checkHealth, fetchStocks, fetchMarketOverview]);

  // Format market stats from API data
  const getMarketStats = () => {
    if (!marketOverview) return [];

    return [
      { 
        label: 'NIFTY 50', 
        value: marketOverview.nifty_50.value.toLocaleString('en-IN', { maximumFractionDigits: 2 }), 
        change: `${marketOverview.nifty_50.change_percent >= 0 ? '+' : ''}${marketOverview.nifty_50.change_percent.toFixed(2)}%`, 
        positive: marketOverview.nifty_50.change_percent >= 0 
      },
      { 
        label: 'SENSEX', 
        value: marketOverview.sensex.value.toLocaleString('en-IN', { maximumFractionDigits: 2 }), 
        change: `${marketOverview.sensex.change_percent >= 0 ? '+' : ''}${marketOverview.sensex.change_percent.toFixed(2)}%`, 
        positive: marketOverview.sensex.change_percent >= 0 
      },
      { 
        label: 'BANK NIFTY', 
        value: marketOverview.bank_nifty.value.toLocaleString('en-IN', { maximumFractionDigits: 2 }), 
        change: `${marketOverview.bank_nifty.change_percent >= 0 ? '+' : ''}${marketOverview.bank_nifty.change_percent.toFixed(2)}%`, 
        positive: marketOverview.bank_nifty.change_percent >= 0 
      },
      { 
        label: 'Market Cap', 
        value: `₹${(marketOverview.market_cap.value / 1e12).toFixed(2)}T`, 
        change: `${marketOverview.market_cap.change_percent >= 0 ? '+' : ''}${marketOverview.market_cap.change_percent.toFixed(2)}%`, 
        positive: marketOverview.market_cap.change_percent >= 0 
      },
    ];
  };

  // Format stocks from API data
  const getTopStocks = () => {
    if (!stocks) return [];

    return stocks.map(stock => ({
      symbol: stock.symbol,
      name: stock.name,
      price: `₹${stock.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
      change: `${stock.change_percent >= 0 ? '+' : ''}${stock.change_percent.toFixed(2)}%`,
      positive: stock.change_percent >= 0,
      volume: `${(stock.volume / 1e6).toFixed(1)}M`,
      delivery: '75.0%', // This would come from API in future
    }));
  };

  const features = [
    {
      icon: '📊',
      title: 'Real-time Data',
      description: 'Live NSE data with automated daily updates at 6 PM',
      bgClass: 'blue-bg',
      textClass: 'blue-text',
    },
    {
      icon: '📈',
      title: 'Technical Analysis',
      description: 'Advanced indicators including RSI, MACD, and Bollinger Bands',
      bgClass: 'green-bg',
      textClass: 'green-text',
    },
    {
      icon: '🎯',
      title: 'Investment Scoring',
      description: 'AI-powered recommendations for long-term investments',
      bgClass: 'purple-bg',
      textClass: 'purple-text',
    },
  ];

  const marketStats = getMarketStats();
  const topStocks = getTopStocks();

  return (
    <div>
      <Header />
      
      {/* API Status Indicator */}
      {apiStatus === 'checking' && (
        <div className="api-status checking">
          <div className="container">
            <p>Connecting to API...</p>
          </div>
        </div>
      )}
      
      {apiStatus === 'disconnected' && (
        <div className="api-status disconnected">
          <div className="container">
            <p>⚠️ Unable to connect to backend API. Please ensure the backend is running on http://localhost:3034</p>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to {APP_NAME}</h1>
          <p>
            Your comprehensive platform for stock market analysis with automated NSE data fetching, 
            technical analysis, and AI-powered investment insights for long-term success.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-lg" onClick={() => window.location.href = '/dashboard'}>
              Get Started
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => window.location.href = '/analysis'}>
              View Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Market Statistics */}
      <section className="container" style={{ marginBottom: '48px' }}>
        <div className="card">
          <h2>Market Overview</h2>
          {marketLoading ? (
            <div className="loading">Loading market data...</div>
          ) : marketError ? (
            <div className="error">Error loading market data: {marketError}</div>
          ) : (
            <div className="stats-grid">
              {marketStats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className={`price-change ${stat.positive ? 'positive' : 'negative'}`}>
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Stocks */}
      <section className="container" style={{ marginBottom: '48px' }}>
        <div className="card">
          <h2>Top Performing Stocks</h2>
          {stocksLoading ? (
            <div className="loading">Loading stock data...</div>
          ) : stocksError ? (
            <div className="error">Error loading stock data: {stocksError}</div>
          ) : (
            <div className="stocks-grid">
              {topStocks.map((stock, index) => (
                <div key={index} className="stock-card">
                  <div className="stock-header">
                    <div>
                      <div className="stock-symbol">{stock.symbol}</div>
                      <div className="stock-name">{stock.name}</div>
                    </div>
                    <div className="stock-price">
                      <div className="price-value">{stock.price}</div>
                      <div className={`price-change ${stock.positive ? 'positive' : 'negative'}`}>
                        {stock.change}
                      </div>
                    </div>
                  </div>
                  <div className="stock-details">
                    <div className="detail-item">
                      <span className="detail-label">Volume</span>
                      <span className="detail-value">{stock.volume}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Delivery %</span>
                      <span className="detail-value">{stock.delivery}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="container" style={{ marginBottom: '48px' }}>
        <div className="card">
          <h2>Key Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className={`feature-icon ${feature.bgClass}`}>
                  <span className={feature.textClass}>{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 