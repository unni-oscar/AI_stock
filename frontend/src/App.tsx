import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
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
    <div className="App">
      <header className="App-header">
        <h1>Stock Market Analysis Application</h1>
        <p>Welcome! This is a sample page for your stock market analysis app frontend.</p>
        <p>React + TypeScript setup is complete.</p>
        <h2>Stocks from Backend API:</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && (
          <ul>
            {stocks.map((stock) => (
              <li key={stock.symbol}>
                <strong>{stock.symbol}</strong>: ₹{stock.price} ({stock.change})
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
