
---

# PRODIGY_FS_01 - User Authentication

This project is a user authentication system built using the MERN stack (MongoDB, Express, React, Node.js). It includes features like user registration, login, logout, and session management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- User registration with email and password
- Secure password storage with bcrypt
- JWT-based authentication and authorization
- Session management
- Protected routes
- Error handling

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Other Tools**: Mongoose, bcryptjs, axios

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Manishl8304/PRODIGY_FS_01.git
   cd PRODIGY_FS_01
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Backend dependencies
   cd Backend
   npm install

   # Frontend dependencies
   cd ../Frontend
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following variables:
   ```bash
   GMAIL_USERNAME = ''
   GMAIL_PASSWORD = ''
   DATABASE = 'your database link'
   DATABASE_PASS = 'your database password'
   
   ```

4. Start the development servers:
   ```bash
   # Backend
   cd Backend
   npm run start

   # Frontend
   cd ../frontend
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## Usage

- Register a new user using the registration form.
- Log in with your credentials to access protected routes.
- Log out to end the session.

## Project Structure

```bash
PRODIGY_FS_01/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── .env
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.js
    │   └── index.js
    └── public/
```

## API Endpoints

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Authenticate user and return token
- **GET** `/api/auth/logout` - Log out user and invalidate session
- **GET** `/api/auth/me` - Get current logged-in user's information

## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you have any suggestions or improvements.
