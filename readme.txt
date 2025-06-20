# Stock Market Analysis Application

I want to develop a comprehensive web application for stock market analysis with automated NSE data fetching, technical analysis, and long-term investment insights.

## Features

### Frontend Features
- **Modern Dashboard**: Real-time market overview with key statistics
- **Interactive Charts**: TradingView-style charts with volume and delivery data
- **Stock Analysis**: Detailed individual stock analysis with technical indicators
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Light Theme**: Professional light theme with excellent readability

### Backend Features
- **Automated Data Fetching**: Daily NSE data fetching at 6 PM
- **Comprehensive Analysis**: Technical indicators, trend analysis, volume analysis
- **Investment Scoring**: AI-powered long-term investment recommendations
- **RESTful API**: Clean, documented API endpoints
- **Database Management**: PostgreSQL with optimized queries


### Analysis Features
- **Technical Indicators**: RSI, MACD, Moving Averages, Bollinger Bands
- **Price Trend Analysis**: Support/Resistance levels, trend strength
- **Volume Analysis**: Volume trends, delivery percentage analysis
- **Investment Scoring**: Overall investment score with risk assessment
- **Long-term Focus**: Specifically designed for long-term investment decisions

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Recharts
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Data Source**: NSE India (National Stock Exchange)
- **Containerization**: Docker & Docker Compose
- **Scheduling**: APScheduler for automated data fetching

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

## Phases

### Phase 1 

- Create folders for frontend and backend and make it in individual containers
- setup react in the frontend 
- Create a sample page and run sample page on http://localhost:3033/

### Phase 2

- Create FastAPI, SQLAlchemy, PostgreSQL in backend
- frontend and backend communication should be only through api call- 
- use Docker
- run sample page on http://localhost:3033/

### Phase 3

- Implement API-only communication between frontend and backend.

### Phase 4
- Creating a sample API endpoint for frontend-backend communication?
- Set up basic authentication in the backend.
