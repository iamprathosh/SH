# SafeHire Application

This repository contains the SafeHire application, a comprehensive platform for AI-powered candidate assessment. The application is built with a Flask-based RESTful API backend and a React TypeScript frontend.

## Backend Setup

### Prerequisites

- Python 3.9
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/iamprathosh/SH.git
   cd SH/backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up the PostgreSQL database:

   ```bash
   psql -U postgres
   CREATE DATABASE safehire;
   ```

5. Set the environment variables:

   ```bash
   export FLASK_ENV=development
   export DATABASE_URL=postgresql://postgres:password@localhost:5432/safehire
   ```

6. Run the database migrations:

   ```bash
   flask db upgrade
   ```

7. Start the Flask application:

   ```bash
   flask run
   ```

## Frontend Setup

### Prerequisites

- Node.js
- npm

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the React application:

   ```bash
   npm start
   ```

## Docker Setup

### Prerequisites

- Docker
- Docker Compose

### Running the Application with Docker

1. Build and start the services:

   ```bash
   docker-compose up --build
   ```

2. Access the application:

   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000

## Testing

### Backend Testing

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Run the tests with pytest:

   ```bash
   pytest
   ```

### Frontend Testing

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Run the tests with Jest:

   ```bash
   npm test
   ```

## CI/CD

The repository is configured with GitHub Actions for automated testing and deployment. The CI/CD pipeline ensures that the entire system provides fair, bias-reduced candidate screening with explainable AI decisions and GDPR-compliant data handling.
