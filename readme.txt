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
- **Backend**: Laravel, PostgreSQL
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

- Create folder for frontend for react with docker container
- structure React application in a professional, managable, scalable, and maintainable and high level and modern folder structure ?
- Create a sample page and run sample page on http://localhost:3033/

### Phase 2

- create backend folder for Laravel with docker container
- use PostgreSQL as db
- frontend and backend communication should be only through api call- 
- run sample backend page on http://localhost:3034/

Phase 3: API-Only Communication
- All frontend–backend interactions should happen via REST APIs (no server-side rendering or blade views).
- The React frontend must communicate only via Laravel APIs, including:
  - Auth
  - File fetching
  - Data tracking

✅ Phase 4: Backend Authentication Setup (Laravel)
- Implement basic authentication APIs:
  - POST /api/login → issues JWT or session
  - POST /api/logout
  - Auth middleware for protecting endpoints
- Use Laravel Sanctum or Passport for token-based auth.

✅ Phase 5: Login + Dashboard (React)
- Create a Login Page with fields:
  - Email
  - Password
- After successful login:
  - Store the JWT/token securely (e.g., HttpOnly cookie or localStorage)
  - Redirect the user to a Dashboard page
- Ensure protected routes are inaccessible without authentication

✅ Phase 6: Registration Page (React + Laravel)
- Create a Registration Page with:
  - Email
  - Password
  - Name
- Implement POST /api/register on the Laravel backend
- After successful registration:
  - Auto-login or redirect to login page

✅ Phase 7: NSE Bhavcopy Fetcher Page

🔐 Access Control
- This page must be protected: only authenticated users can access it.

📅 UI: Bhavcopy Calendar (React)
1. Year dropdown:
   - List years from current year to 20 years ago.
2. Upon year selection:
   - Show 12 month blocks, each containing a calendar-style layout of dates
   - Dates should be shown in descending order (today → backward)
   - Each month has a "Fetch Month" button

3. Calendar Behavior:
   - Processed days should be visually distinct
   - When "Fetch" is clicked:
     - Iterate from 1st to last day of the month
     - Fetch bhavcopy CSV for each date
     - Show processing status or progress loader
     - Update UI after each success/failure

📤 Backend Logic (Laravel)
- CSV fetch URL (per day):  
  https://nsearchives.nseindia.com/products/content/sec_bhavdata_full_DDMMYYYY.csv
- Laravel will:
  - Download the CSV
  - Store it at:
    storage/app/bhavcopy-data/nse/{year}/{month}/sec_bhavdata_full_DDMMYYYY.csv

📂 Folder Structure (Backend)
storage/app/bhavcopy-data/
└── nse/
    └── {year}/
        └── {month}/
            └── sec_bhavdata_full_DDMMYYYY.csv

🔁 Process Tracking
- Track downloaded (processed) dates by either:
  - Checking file existence OR
  - Using a DB table for processed days
- Used by frontend to style calendar UI appropriately

🔌 Laravel API Endpoints

1. Get processed days
   GET /api/bhavcopy/processed-dates?year=YYYY
   Response:
   {
     "2024": {
       "6": [1, 2, 3],
       "7": [1, 2]
     }
   }

2. Fetch month data
   POST /api/bhavcopy/fetch
   Payload:
   {
     "year": 2024,
     "month": 6
   }

🛠️ Tools & Libraries (Suggestions)

Task                    | Recommended Tools
------------------------|------------------------
Auth (API tokens)       | Laravel Sanctum
HTTP (React)            | Axios or React Query
State Management        | Zustand or TanStack Query
Calendar UI             | react-calendar, custom grid
File download/backend   | Laravel Http + Storage
Auth route protection   | React Router + token guard
