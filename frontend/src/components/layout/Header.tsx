import React from 'react';
import { APP_NAME } from '../../utils/constants';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo and App Name */}
          <div className="logo">
            {APP_NAME}
          </div>

          {/* Navigation */}
          <nav className="nav">
            <a href="/dashboard">Dashboard</a>
            <a href="/stocks">Stocks</a>
            <a href="/analysis">Analysis</a>
            <a href="/api-test">API Test</a>
          </nav>

          {/* User Menu */}
          <div className="user-menu">
            <button className="btn btn-outline" onClick={() => window.location.href = '/login'}>
              Login
            </button>
            <button className="btn btn-primary" onClick={() => window.location.href = '/register'}>
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 