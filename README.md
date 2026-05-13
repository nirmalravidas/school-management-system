# School Management System API

## Overview

This project implements a production-level Node.js and Express API for managing school data using MySQL. It features a clean **3-layer architecture** (Controller → Service → Repository) with robust error handling and business logic separation.

## Core Features

- **Add school records** with name, address, latitude, and longitude
- **Duplicate protection** - Prevents duplicate schools by (name + address)
- **List schools sorted by distance** from user-provided location
- **Structured error handling** - Meaningful HTTP status codes (400, 409, 503, etc.)
- **Clean 3-layer architecture** - Separation of concerns (Controller/Service/Repository)
- **Database constants** - No hardcoded table/column names
- **Automatic schema initialization** with UNIQUE constraint on (name, address)
- **Distance calculation** using Haversine formula

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

### Entry Points
- `index.js` - Server bootstrap. Handles environment validation, DB initialization, and server startup.
- `src/app.js` - Express application setup with middleware and routes configuration.

### 3-Layer Architecture

#### Controller Layer (`src/controllers/`)
- `schoolController.js` - Handles HTTP requests/responses
  - Receives requests → Calls service → Returns responses
  - No business logic, no database queries

#### Service Layer (`src/services/`)
- `schoolService.js` - Implements business logic
  - Duplicate detection using `findSchoolByNameAndAddress()`
  - Throws custom `AppError` with appropriate HTTP status codes
  - Validates results before returning

#### Repository Layer (`src/repositories/`)
- `schoolRepository.js` - All database operations
  - Pure SQL queries only, no business logic
  - Methods: `createSchool()`, `findSchoolByNameAndAddress()`, `getAllSchools()`
  - Wraps database errors in `AppError` (503 status)

### Utilities & Configuration
- `src/utils/AppError.js` - Custom error class with HTTP status codes
- `src/utils/calculateDistance.js` - Haversine formula implementation
- `src/constants/database.js` - Centralized DB table/column names (no hardcoding)
- `src/config/db.js` - MySQL connection pool configuration
- `src/config/initDB.js` - Database schema initialization with UNIQUE constraint
- `src/routes/schoolRoutes.js` - Route definitions
- `src/middlewares/validate.js` - Request input validation

### Deprecated
- `src/models/schoolModel.js` - ❌ No longer used (functionality moved to Repository/Service)

## API Endpoints

### 1. Add School

**POST** `/addSchool`

#### Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
  "name": "Gyandeep High School",
  "address": "Birsanagar Zone No - 6, Jamshedpur, Jharkhand",
  "latitude": 22.785855,
  "longitude": 86.2436583
}
```

#### Success Response (201 Created)
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

#### Error Responses

**Duplicate School (409 Conflict)**
```json
{
  "success": false,
  "message": "School with name \"Gyandeep High School\" and address \"Birsanagar Zone No - 6, Jamshedpur, Jharkhand\" already exists"
}
```

**Validation Error (400 Bad Request)**
```json
{
  "success": false,
  "message": "name is required and must be a non-empty string"
}
```

**Database Error (503 Service Unavailable)**
```json
{
  "success": false,
  "message": "Database error while creating school"
}
```

### 2. List Schools

**GET** `/listSchools`

#### Query Parameters
- `lat` (required, number): User's latitude (-90 to 90)
- `lon` (required, number): User's longitude (-180 to 180)

#### Example Request
```
GET /listSchools?lat=22.785855&lon=86.2436583
```

#### Success Response (200 OK)
```json
{
  "success": true,
  "count": 2,
  "user_location": {
    "latitude": "22.785855",
    "longitude": "86.2436583"
  },
  "message": "Schools retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Gyandeep High School",
      "address": "Birsanagar Zone No - 6, Jamshedpur, Jharkhand",
      "latitude": 22.785855,
      "longitude": 86.2436583,
      "distance": 0
    },
    {
      "id": 2,
      "name": "Central School",
      "address": "Main Street, Delhi",
      "latitude": 28.6139,
      "longitude": 77.2090,
      "distance": 1145.23
    }
  ]
}
```

#### Error Response (400 Bad Request - Missing Parameters)
```json
{
  "success": false,
  "message": "lat is required and must be a valid number"
}
```

#### Error Response (405 Method Not Allowed)
```json
{
  "success": false,
  "message": "Method not allowed. Use GET /listSchools"
}
```

### 3. Root Endpoint

**GET** `/`

#### Response
```
Welcome to the School Management System API
```

## HTTP Status Codes

| Code | Scenario | Handler |
|------|----------|---------|
| **200** | GET /listSchools - Success | Controller |
| **201** | POST /addSchool - School created | Controller |
| **400** | Validation error (invalid input) | Middleware/Controller |
| **409** | Duplicate school detected | Service |
| **500** | Unexpected server error | Controller |
| **503** | Database connection/query error | Repository |

## Validation Rules

### For POST /addSchool
- `name`: required, non-empty string
- `address`: required, non-empty string
- `latitude`: required, numeric, between `-90` and `90`
- `longitude`: required, numeric, between `-180` and `180`

### For GET /listSchools
- `lat`: required, numeric, between `-90` and `90`
- `lon`: required, numeric, between `-180` and `180`

## Database Schema

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_school_location (name, address)
);
```

### Key Features
- **UNIQUE constraint** on (name, address) prevents duplicate schools at DB level
- **AUTO_INCREMENT** for automatic ID generation
- **TIMESTAMP** automatically tracks record creation time

## Key Implementation Details

### Duplicate Protection
- **Database Level**: UNIQUE constraint on (name, address)
- **Application Level**: Service checks for existing school before INSERT
- **Response**: 409 Conflict with clear message

### Error Handling
- **AppError class**: Custom error with message + statusCode
- **Proper HTTP codes**: 400 (validation), 409 (conflict), 503 (DB error), 500 (unexpected)
- **Layer-specific errors**: Each layer throws appropriate errors

### Architecture Advantages
- **Maintainability**: Clear separation of concerns
- **Testability**: Each layer can be tested independently
- **Scalability**: Easy to add new features or modify existing logic
- **Reusability**: Service and Repository layers can be used elsewhere
- **Readability**: Code is well-organized and documented

## Notes

- The server will refuse to start if required database environment variables are missing.
- The database table is created automatically on startup with UNIQUE constraint.
- Distance sorting is performed in the application layer after fetching school records.
- All database interactions are centralized in the Repository layer.
- All business logic is centralized in the Service layer.
- Controllers are kept thin and only handle HTTP concerns.

## Testing with Postman

### Setup
1. Create a new Postman collection called "School Management API"
2. Set base URL to `http://localhost:3000`
3. Start the server: `npm start`

### Test Cases

#### 1. Add Valid School
```
POST /addSchool
Body: {
  "name": "Test School",
  "address": "123 Main St",
  "latitude": 40.7128,
  "longitude": -74.0060
}
Expected: 201 Created
```

#### 2. Test Duplicate Detection (409 Conflict)
```
POST /addSchool
Body: (same as above)
Expected: 409 Conflict with message about duplicate
```

#### 3. Test Validation - Empty Name (400)
```
POST /addSchool
Body: {
  "name": "",
  "address": "123 Main St",
  "latitude": 40.7128,
  "longitude": -74.0060
}
Expected: 400 Bad Request
```

#### 4. Test Validation - Invalid Latitude (400)
```
POST /addSchool
Body: {
  "name": "Test School",
  "address": "123 Main St",
  "latitude": 91,
  "longitude": -74.0060
}
Expected: 400 Bad Request
```

#### 5. List Schools by Distance
```
GET /listSchools?latitude=40.7128&longitude=-74.0060
Expected: 200 OK with schools sorted by distance
```

#### 6. List Schools - Missing Parameters (400)
```
GET /listSchools
Expected: 400 Bad Request - missing latitude/longitude
```


