# Stock Market Analysis - Backend API

Laravel backend API for the Stock Market Analysis application.

## Features

- **RESTful API**: Clean, documented API endpoints
- **PostgreSQL Database**: Robust database for stock data
- **Docker Support**: Containerized development environment
- **API Endpoints**: Stock data, market overview, health check

## Quick Start

### Using Docker (Recommended)

1. **Start the backend services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the API:**
   - API Base URL: `http://localhost:3034/api`
   - Health Check: `http://localhost:3034/api/health`
   - Stocks Data: `http://localhost:3034/api/stocks`
   - Market Overview: `http://localhost:3034/api/stocks/market-overview`

### API Endpoints

#### Health Check
```
GET /api/health
```
Returns API status and version information.

#### Get Stocks
```
GET /api/stocks
```
Returns sample stock data with prices, changes, and market information.

#### Market Overview
```
GET /api/stocks/market-overview
```
Returns market indices data (NIFTY 50, SENSEX, BANK NIFTY, Market Cap).

## Database

- **Database**: PostgreSQL 15
- **Host**: `db` (Docker service)
- **Port**: `5432`
- **Database**: `stock_db`
- **Username**: `stock_user`
- **Password**: `stock_password`

## Development

### Local Development (without Docker)

1. **Install dependencies:**
   ```bash
   composer install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configure database in `.env`:**
   ```
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=stock_db
   DB_USERNAME=stock_user
   DB_PASSWORD=stock_password
   ```

4. **Run migrations:**
   ```bash
   php artisan migrate
   ```

5. **Start development server:**
   ```bash
   php artisan serve
   ```

## Docker Services

- **app**: Laravel PHP-FPM application
- **webserver**: Nginx web server
- **db**: PostgreSQL database

## Environment Variables

Key environment variables for the backend:

- `APP_NAME`: Application name
- `APP_ENV`: Environment (local, production)
- `APP_DEBUG`: Debug mode
- `APP_URL`: Application URL
- `DB_CONNECTION`: Database connection (pgsql)
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_DATABASE`: Database name
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
