import React from 'react';
import Header from '../components/layout/Header';
import { APP_NAME } from '../utils/constants';

const Home: React.FC = () => {
  // Sample data for demonstration
  const marketStats = [
    { label: 'NIFTY 50', value: '22,419.95', change: '+0.85%', positive: true },
    { label: 'SENSEX', value: '73,852.94', change: '+0.72%', positive: true },
    { label: 'BANK NIFTY', value: '48,123.45', change: '-0.23%', positive: false },
    { label: 'Market Cap', value: '₹3,456.78T', change: '+1.2%', positive: true },
  ];

  const topStocks = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      price: '₹2,456.78',
      change: '+2.34%',
      positive: true,
      volume: '12.5M',
      delivery: '78.5%',
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: '₹3,789.12',
      change: '+1.87%',
      positive: true,
      volume: '8.9M',
      delivery: '82.3%',
    },
    {
      symbol: 'HDFC BANK',
      name: 'HDFC Bank Ltd',
      price: '₹1,567.34',
      change: '-0.45%',
      positive: false,
      volume: '15.2M',
      delivery: '65.7%',
    },
    {
      symbol: 'INFOSYS',
      name: 'Infosys Ltd',
      price: '₹1,234.56',
      change: '+0.92%',
      positive: true,
      volume: '10.8M',
      delivery: '71.2%',
    },
  ];

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

  return (
    <div>
      <Header />
      
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
        </div>
      </section>

      {/* Top Stocks */}
      <section className="container" style={{ marginBottom: '48px' }}>
        <div className="card">
          <h2>Top Performing Stocks</h2>
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