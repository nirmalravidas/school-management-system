# School Management System API

## Overview

This project implements a simple Node.js and Express API for managing school data using MySQL. It provides two core endpoints:

- `POST /addSchool`: Add a new school record with name, address, latitude, and longitude.
- `GET /listSchools`: Retrieve all schools sorted by proximity to a user-provided latitude and longitude.

The application validates inputs and calculates geographic distance using the Haversine formula.

## Features

- Add school records to a MySQL database
- Validate required fields and coordinate ranges
- List schools sorted by distance from a user-specified location
- Automatically create the `schools` table if it does not exist

## Prerequisites

- Node.js 18 or newer
- MySQL server or a MySQL-compatible database

## Project Setup

1. Clone the repository.
2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file in the project root with the following variables:

```env
PORT=3000
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
```

4. Start the application:

```bash
yarn start
```


## Application Structure

- `index.js` - Starts the server and performs database initialization.
- `src/app.js` - Configures Express middleware and routes.
- `src/routes/schoolRoutes.js` - Defines API routes for school operations.
- `src/controllers/schoolController.js` - Handles request logic for both endpoints.
- `src/middlewares/validate.js` - Validates request payloads and query parameters.
- `src/models/schoolModel.js` - Contains database queries for school records.
- `src/config/db.js` - Configures the MySQL connection pool.
- `src/config/initDB.js` - Creates the `schools` table if needed.
- `src/utils/calculateDistance.js` - Calculates distance using the Haversine formula.

## API Endpoints

### Add School

- Method: `POST`
- URL: `/addSchool`
- Headers: `Content-Type: application/json`

#### Request Body

```json
{
  "name": "Gyandeep High School",
  "address": "Birsanagar Zone No - 6, Jamshedpur, Jharkhand",
  "latitude": 22.785855,
  "longitude": 86.2436583
}
```

#### Success Response

- Status: `201`

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Gyandeep High School",
    "address": "Birsanagar Zone No - 6, Jamshedpur, Jharkhand",
    "latitude": 22.785855,
    "longitude": 86.2436583
  }
}
```

### List Schools

- Method: `GET`
- URL: `/listSchools`
- Query Parameters:
  - `latitude`
  - `longitude`

#### Example Request

```
GET /listSchools?latitude=22.785855,&longitude=86.2436583
```

## Validation Rules

- `name`: required, non-empty string
- `address`: required, non-empty string
- `latitude`: required, numeric, between `-90` and `90`
- `longitude`: required, numeric, between `-180` and `180`

## Notes

- The server will refuse to start if required database environment variables are missing.
- The database table is created automatically on startup if it does not already exist.
- Distance sorting is performed in the application layer after fetching school records.

## Testing with Postman

1. Create a new Postman collection.
2. Add a `POST /addSchool` request with JSON body.
3. Add a `GET /listSchools` request with query parameters.
4. Test both endpoints against `http://localhost:3000` or the configured port.

