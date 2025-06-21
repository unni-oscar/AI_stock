import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, ApiTest } from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api-test" element={<ApiTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
