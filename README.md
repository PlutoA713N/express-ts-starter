# Express TS Starter

A robust, production-ready starter template for building REST APIs with **Express** and **TypeScript**. This boilerplate includes essential features like centralized error handling, request logging, rate limiting, request context, health checks, and Docker support — designed to speed up API development with best practices.

---
## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Docker](#docker)
- [Testing](#testing)
- [Logging](#logging)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---
## Features

- **Express + TypeScript** for scalable type-safe APIs
- Centralized **error handling** and **logging** with Winston
- Request **rate limiting** middleware
- Request **context** to track request IDs
- MongoDB connection management with retries and health checks
- Swagger API documentation integration
- Dockerized for easy containerized deployments
- Jest for unit and integration testing
- Prettier for code formatting

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm 
- Docker (optional, for containerization)

### Install dependencies

```bash
npm install
```

## API Documentation

Swagger UI is integrated and available at `/api-docs` endpoint (configure in `src/swagger`).

---

---

## Environment Variables

Create a `.env` file in the root directory to configure your environment-specific settings. Below are the common variables used in this project:

```env
PORT=5000
LOG_LEVEL=debug
NODE_ENV=development
MONGO_URI=YOUR_MONGO_URI
DB_RETRY_COUNT=5
DB_RETRY_DELAY_MS=3000
```

## NPM Scripts

The following scripts are available to help with development and deployment:

```json
"scripts": {
  "test": "jest --coverage",
  "go": "npm run build && npm start",
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "ts-node-dev src/index.ts"
}
```

## Swagger API Documentation

This API includes Swagger-based documentation to help you explore and interact with the available endpoints.

### Access Swagger UI:

Once the app is running, open your browser and go to:

```
http://localhost:5000/api-docs
```

This will show the Swagger UI, where you can view and interact with the API documentation.

### Example Endpoint: MongoDB Healthcheck

**GET /mongodb**  
Checks the connection to MongoDB and returns the connection status.

#### Responses:
- **200 OK**
   - Message: "MongoDB connected"
- **500 Internal Server Error**
   - Message: "Database Error"
- **429 Too Many Requests**
   - Message: "Too Many Requests"



## Contributing

Feel free to open issues or pull requests to improve this starter.

---

## Local Setup with Docker

1. **Install Docker and Docker Compose**
    - Download and install Docker Desktop from [https://www.docker.com/get-started](https://www.docker.com/get-started)
    - Docker Compose comes bundled with Docker Desktop.

2. **Run MongoDB and the App together**
    - Use the provided `docker-compose.yml` file (make sure your app’s MongoDB URI points to `mongodb://mongo:27017/your-db-name`)
    - Run the command:
      ```bash
      docker-compose up
      ```  
    - This will start both MongoDB and your app containers.

3. **Access the Application**
    - Open your browser and go to `http://localhost:3000`

4. **Stop and Remove Containers**
    - Run the command:
      ```bash
      docker-compose down
      ```

## Logging

- Logs are managed using **winston** and stored in the `logs/` directory at the project root
- Supports daily log rotation with files for combined logs, errors, and HTTP requests
- Log level is configurable via `LOG_LEVEL` environment variable, defaults to `debug` in development and `info` in production
- Each log entry includes a request ID (if available) for easier traceability across requests

## Testing

- Uses **Jest** for unit and integration tests.
- Tests are located under the `src/tests` directory.

### Running Tests

Run all tests with coverage:

```bash
npm test
```

## License

This project is licensed under the GPL License — see the [LICENSE](LICENSE) file for details.

