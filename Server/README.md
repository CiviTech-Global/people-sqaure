# People Square - Server

Backend API for People Square platform built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- User authentication (register, login, forgot password, reset password)
- PostgreSQL database with TypeORM
- Clean Architecture structure
- Password hashing with bcrypt
- Input validation and sanitization
- RESTful API endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Security**: Helmet, bcrypt
- **CORS**: Enabled

## Project Structure

```
Server/
├── application/
│   └── controllers/        # Business logic controllers
├── domain/
│   └── user/              # Domain entities
│       ├── user.entity.ts # TypeORM entity
│       └── user.model.ts  # Domain model (legacy)
├── infrastructure/
│   ├── database/          # Database configuration
│   │   └── data-source.ts
│   ├── repositories/      # Data access layer
│   │   └── user.repository.ts
│   └── user.util.ts       # Utility functions
├── presentation/
│   └── routes/            # API routes
│       └── user.route.ts
└── index.ts               # Application entry point
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Configure your database credentials in `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=people_square
```

4. Create the PostgreSQL database:
```bash
psql -U postgres
CREATE DATABASE people_square;
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### User Management

- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Login user
- **POST** `/api/users/forgot-password` - Request password reset
- **POST** `/api/users/reset-password` - Reset password
- **GET** `/api/users/:id` - Get user by ID
- **PUT** `/api/users/:id` - Update user profile
- **GET** `/api/users` - Get all users

### Health Check

- **GET** `/health` - Server health status
- **GET** `/` - Server status

## Database Schema

### Users Table

| Column     | Type                | Description                    |
|------------|---------------------|--------------------------------|
| id         | UUID                | Primary key                    |
| fullName   | VARCHAR(255)        | User's full name               |
| email      | VARCHAR(255)        | Unique email address           |
| role       | ENUM                | User role (startup-owner, investor, organization, citizen) |
| password   | VARCHAR(255)        | Hashed password                |
| createdAt  | TIMESTAMP           | Account creation date          |
| updatedAt  | TIMESTAMP           | Last update date               |

## Environment Variables

| Variable       | Description              | Default       |
|----------------|--------------------------|---------------|
| PORT           | Server port              | 3000          |
| NODE_ENV       | Environment mode         | development   |
| DB_HOST        | Database host            | localhost     |
| DB_PORT        | Database port            | 5432          |
| DB_USERNAME    | Database username        | postgres      |
| DB_PASSWORD    | Database password        | postgres      |
| DB_NAME        | Database name            | people_square |

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- Password validation (min 8 chars, uppercase, lowercase, number)
- Email validation
- Input sanitization
- Helmet for HTTP headers security
- CORS enabled

## Development

### TypeScript Configuration

The project uses TypeScript with:
- Experimental decorators enabled
- Strict mode enabled
- CommonJS module system

### Code Quality

- No unused variables or imports
- Type-safe operations
- Clean separation of concerns
- Repository pattern for data access
