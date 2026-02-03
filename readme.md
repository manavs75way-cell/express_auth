# Express Authentication API

A RESTful authentication API built with Express.js, TypeScript, and MongoDB. Supports both traditional email/password authentication and Google OAuth 2.0.

## Features

- User registration and login with JWT authentication
- Google OAuth 2.0 integration
- Protected routes with role-based access control
- Input validation using express-validator
- Password hashing with bcryptjs
- TypeScript for type safety

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote instance)
- Google OAuth credentials (Client ID and Client Secret)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/manavs75way-cell/express_auth.git
cd express_auth
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```
PORT=5000
NODE_ENV=local
MONGO_URI=mongodb://localhost:27017/express-auth
JWT_SECRET=your_jwt_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm run prod
```

Standard start:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login with email and password
- `GET /api/auth/google` - Initiate Google OAuth flow
- `GET /api/auth/google/callback` - Google OAuth callback

### User Management (Protected)
- `GET /api/users/me` - Get current user details
- `PUT /api/users/:id` - Update user information
- `DELETE /api/users/:id` - Delete user account

## Project Structure

```
app/
├── common/
│   ├── dto/           # Data transfer objects
│   ├── helper/        # Utility functions
│   ├── middleware/    # Express middleware
│   ├── route/         # Auth routes
│   ├── services/      # Database and passport configuration
│   └── types/         # TypeScript type definitions
└── user/
    ├── user.controller.ts
    ├── user.dto.ts
    ├── user.model.ts
    ├── user.route.ts
    ├── user.services.ts
    └── user.validator.ts
```

## Technologies Used

- Express.js - Web framework
- TypeScript - Type safety
- MongoDB with Mongoose - Database
- Passport.js - Authentication middleware
- JWT - Token-based authentication
- bcryptjs - Password hashing
- express-validator - Input validation

## License

ISC
