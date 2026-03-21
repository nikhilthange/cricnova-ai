# CricNova AI Deployment Plan

## Frontend
- Framework: Next.js
- Environment variable:
  - NEXT_PUBLIC_API_BASE_URL

## Backend
- Framework: Express
- Environment variables:
  - DATABASE_URL
  - PORT
  - JWT_SECRET
  - CLIENT_URL

## Database
- PostgreSQL

## Health Checks
- Frontend: /
- Backend: /health

## Deployment Order
1. Deploy database
2. Deploy backend
3. Set backend env variables
4. Copy backend URL
5. Deploy frontend with NEXT_PUBLIC_API_BASE_URL