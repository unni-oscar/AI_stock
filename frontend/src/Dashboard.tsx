import React, { useEffect, useState } from 'react';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('user:password'));

    fetch('http://localhost:3034/api/data', { headers })
      .then((res) => {
        if (res.status === 401) throw new Error('Authentication failed');
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setStocks(data.stocks);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          borderBottom: '1px solid #eee',
          paddingBottom: '1rem'
        }}>
          <h1 style={{ color: '#333', margin: 0 }}>
            Stock Market Analysis Dashboard
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#666' }}>
              Welcome, <strong>{username}</strong>!
            </span>
            <button
              onClick={onLogout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>
            Market Overview
          </h2>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Real-time stock data and market analysis
          </p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading market data...</p>
          </div>
        )}

        {error && (
          <div style={{ 
            color: 'red', 
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#ffe6e6',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>
              Stock Prices
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              {stocks.map((stock) => (
                <div
                  key={stock.symbol}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <h4 style={{ margin: 0, color: '#333' }}>
                      {stock.symbol}
                    </h4>
                    <span style={{
                      color: stock.change.startsWith('+') ? '#28a745' : '#dc3545',
                      fontWeight: 'bold'
                    }}>
                      {stock.change}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>
                    ₹{stock.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#e9ecef',
          borderRadius: '4px',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          <strong>Note:</strong> This is a sample dashboard. In a real application, 
          you would see real-time stock data, charts, and advanced analytics.
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 