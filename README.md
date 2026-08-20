# LearnPath

**LearnPath** is a full-stack personalized learning platform for discovering, creating, and tracking structured learning paths. It allows users to explore courses, enroll in learning paths, track lesson completion, and create custom learning roadmaps.

## ✨ Features

* 📚 Browse learning paths by category
* 💻 Explore courses in:

  * Web Development
  * Data Science
  * DevOps
  * Design
  * Cybersecurity
  * Mobile Development
  * Product Management
* 📖 View course modules and learning steps
* 🔐 Secure user registration and login
* 🎯 Enroll in learning paths
* 📊 Track completed lessons and learning progress
* ✏️ Create custom learning paths
* 📱 Responsive React interface
* 🗄️ SQLite database with automatic initialization
* 🌱 Database schema and seed-data migration support
* 🔑 JWT-based authentication

## 🛠️ Tech Stack

### Frontend

* React 18
* Vite
* React Router
* Axios
* Lucide React
* CSS

### Backend

* Node.js
* Express.js
* SQLite3
* JSON Web Tokens (JWT)
* bcryptjs
* CORS

### Database

* SQLite

## 📁 Project Structure

```text
LearnPath/
│
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── context/                  # React context
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── pages/                    # Application pages
│   │   └── services/                 # API services
│   └── package.json
│
├── backend/                          # Express backend API
│   ├── config/                       # Configuration
│   ├── controllers/                  # Request controllers
│   ├── middleware/                   # Authentication/middleware
│   ├── models/                       # Database models
│   ├── routes/                       # API routes
│   ├── services/                     # Business logic
│   └── server.js                     # Backend entry point
│
├── database/
│   ├── schema.sql                    # Database schema
│   └── additional_paths.sql          # Additional seed data
│
└── README.md
```

## ⚙️ Installation

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd LearnPath
```

### 2. Install Backend Dependencies

Open a terminal and run:

```bash
cd backend
npm install
```

Start the backend:

npm start


The backend API will run at:


http://localhost:5000


### 3. Install Frontend Dependencies

Open a **new terminal**:

cd frontend
npm install


Start the frontend:


npm run dev


The frontend will run at:


http://localhost:5173


## 🗄️ Database

LearnPath uses **SQLite** as its database.

The database is initialized automatically when the backend starts.

The database schema is defined in:


database/schema.sql


Additional learning-path and course content is available in:


database/additional_paths.sql


The application automatically initializes the required database structure and seed data.

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory if your application requires custom configuration.

.env
PORT=5000
JWT_SECRET=replace_with_a_secure_secret
JWT_EXPIRES_IN=7d
DB_PATH=./learnpath.sqlite


### Environment Variables

| Variable         | Description                        | Example              |
| ---------------- | ---------------------------------- | -------------------- |
| `PORT`           | Backend server port                | `5000`               |
| `JWT_SECRET`     | Secret key used for authentication | `your_secure_secret` |
| `JWT_EXPIRES_IN` | JWT token expiration time          | `7d`                 |
| `DB_PATH`        | SQLite database location           | `./learnpath.sqlite` |

> **Important:** Never commit your `.env` file or expose your JWT secret publicly.

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| `POST` | `/api/auth/register` | Register a new user                |
| `POST` | `/api/auth/login`    | Log in an existing user            |
| `GET`  | `/api/auth/me`       | Get the current authenticated user |

### Learning Paths

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| `GET`  | `/api/paths`     | Get all learning paths        |
| `GET`  | `/api/paths/:id` | Get a specific learning path  |
| `POST` | `/api/paths`     | Create a custom learning path |

> Additional endpoints may be available for enrollment, progress tracking, courses, and lessons depending on the current backend implementation.

## 🔄 Application Flow

`
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  React + Vite       │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │
                         Axios / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Express.js Backend │
                    │                     │
                    │ Authentication      │
                    │ Learning Paths      │
                    │ Courses             │
                    │ Progress Tracking   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   SQLite Database   │
                    └─────────────────────┘
``

## 🚀 Running the Application

Start the backend first:


cd backend
npm start


Then, in another terminal, start the frontend:


cd frontend
npm run dev


The application will be available at:


Frontend: http://localhost:5173
Backend:  http://localhost:5000


## 🔒 Authentication

LearnPath uses **JWT authentication** to secure user sessions.

Passwords are securely hashed using **bcryptjs** before being stored in the database.

Authentication flow:


Register
   ↓
Password Hashing
   ↓
User Stored in SQLite
   ↓
Login
   ↓
JWT Token Generated
   ↓
Authenticated API Requests


## 📈 Learning Progress

Users can:

1. Browse available learning paths.
2. Open a learning path to view its courses and modules.
3. Enroll in a learning path.
4. Complete individual lessons.
5. Track their overall learning progress.

## 🧑‍💻 Custom Learning Paths

LearnPath also allows users to create their own learning paths by defining:

* Learning path title
* Category
* Description
* Courses
* Modules
* Learning steps

This makes the platform suitable for both predefined and personalized learning roadmaps.

## 🐛 Troubleshooting

### Backend does not start

Run:

```bash
cd backend
npm install
npm start
```

Check that port `5000` is available.

### Frontend does not start

Run:

```bash
cd frontend
npm install
npm run dev
```

### Frontend cannot connect to backend

Make sure the backend is running:

```text
http://localhost:5000
```

Also verify that the frontend API/proxy configuration points `/api` requests to the backend.

### Database issues

Stop the backend and verify that the SQLite database configuration is correct. Restart the backend so the initialization scripts can run.

## 📝 Development Notes

* Start the backend before the frontend.
* Backend runs on port `5000`.
* Vite frontend runs on port `5173`.
* Frontend communicates with the backend through REST APIs.
* SQLite is used for persistent data storage.
* JWT is used for authentication.
* Keep sensitive environment variables out of Git.


## 👩‍💻 Author

**Chandu Geethanjali**

Computer Science and Data Science Engineering

---

⭐ If you find this project useful, consider giving the repository a star!
