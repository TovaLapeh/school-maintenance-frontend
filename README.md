# School Maintenance Frontend

This is a standalone Angular frontend for the existing School Maintenance System backend.

## Features
- Angular 20 + TypeScript
- Angular Material admin layout
- Reactive forms for creating users
- Material table for listing users
- Runtime API configuration via /assets/app-config.json
- Docker-ready production build

## Run locally
1. Install dependencies:
   npm install
2. Start the dev server:
   npm start
3. Open http://localhost:4200

## Configure backend API URL
Update the file src/assets/app-config.json:

{
  "apiBaseUrl": "https://your-cloud-run-backend-url"
}

The frontend reads this at runtime, so you can change the backend URL without rebuilding the entire app.

## Build Docker image
docker build -t school-maintenance-frontend .

## Run Docker container
docker run -p 80:80 school-maintenance-frontend
