# LearnPath 🚀

A comprehensive full-stack learning management system designed to help users create, track, and manage their personalized learning journeys.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [Environment Configuration](#environment-configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

LearnPath is a modern web application that enables users to:
- Create custom learning paths with structured steps
- Track learning progress with visual indicators
- Manage multiple learning paths simultaneously
- Authenticate securely with JWT tokens
- Monitor completion milestones and achievements

The application follows a **full-stack architecture** with a **Node.js/Express backend** and a **React/Vite frontend**, deployed on **Vercel**.

## ✨ Features

### User Management
- User registration and authentication
- JWT-based authentication with secure token management
- User profile management
- Password security with encryption

### Learning Paths
- Create and customize learning paths
- Add detailed steps to each path
- Categorize and organize paths
- View path details with step-by-step guidance
- Track path completion status

### Progress Tracking
- Real-time progress monitoring
- Visual progress bars for each path
- Step-level tracking
- Progress history and analytics
- Completion percentages

### Dashboard
- Centralized dashboard for all learning paths
- Quick access to in-progress paths
- Overview of completed paths
- Statistics and progress summaries

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | Latest | UI library for building interactive user interfaces |
| **Vite** | Latest | Modern build tool and dev server |
| **JavaScript (ES6+)** | - | Programming language |
| **CSS3** | - | Styling and responsive design |
| **Axios** | Latest | HTTP client for API communication |
| **React Context API** | Built-in | State management for auth and paths |
| **React Router** | Latest | Client-side routing |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest LTS | Runtime environment |
| **Express.js** | Latest | Web framework for REST API |
| **JWT (jsonwebtoken)** | Latest | Authentication and authorization |
| **MySQL/MariaDB** | Latest | Relational database |
| **dotenv** | Latest | Environment variable management |

### Database
| Technology | Purpose |
|----------|---------|
| **SQL** | Database schema and queries |
| **MySQL** | Primary database system |

### Deployment
| Platform | Purpose |
|----------|---------|
| **Vercel** | Frontend & serverless backend deployment |
| **Database Hosting** | Cloud or local MySQL instance |

## 📁 Project Structure

```
LearnPath/
├── backend/                          # Node.js/Express API server
│   ├── server.js                     # Main server entry point
│   ├── package.json                  # Backend dependencies
│   ├── api/
│   │   └── index.js                  # API configuration
│   ├── config/
│   │   ├── db.js                     # Database connection
│   │   └── env.js                    # Environment variables
│   ├── controllers/
│   │   ├── authController.js         # Authentication logic
│   │   ├── pathController.js         # Learning paths logic
│   │   └── progressController.js     # Progress tracking logic
│   ├── middleware/
│   │   ├── auth.js                   # JWT verification middleware
│   │   └── errorHandler.js           # Global error handling
│   ├── models/
│   │   ├── userModel.js              # User database schema
│   │   ├── pathModel.js              # Learning path schema
│   │   └── progressModel.js          # Progress tracking schema
│   ├── routes/
│   │   ├── authRoutes.js             # Auth endpoints
│   │   ├── pathRoutes.js             # Path management endpoints
│   │   └── progressRoutes.js         # Progress endpoints
│   └── services/
│       ├── jwtService.js             # JWT token management
│       └── pathService.js            # Business logic for paths
│
├── frontend/                         # React/Vite application
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration
│   └── src/
│       ├── main.jsx                  # React app entry
│       ├── App.jsx                   # Main App component
│       ├── index.css                 # Global styles
│       ├── assets/                   # Static assets
│       ├── components/               # Reusable components
│       │   ├── Navbar.jsx            # Navigation bar
│       │   ├── Footer.jsx            # Footer component
│       │   ├── PathCard.jsx          # Path display card
│       │   ├── ProgressBar.jsx       # Visual progress indicator
│       │   └── StepItem.jsx          # Individual learning step
│       ├── context/                  # Context for state management
│       │   ├── AuthContext.jsx       # Authentication state
│       │   └── PathContext.jsx       # Learning paths state
│       ├── hooks/                    # Custom React hooks
│       │   ├── useAuth.js            # Auth hook
│       │   ├── useFetchPaths.js      # Fetch paths hook
│       │   └── useProgress.js        # Progress tracking hook
│       ├── pages/                    # Page components
│       │   ├── HomePage.jsx          # Landing page
│       │   ├── LoginPage.jsx         # Login page
│       │   ├── RegisterPage.jsx      # Registration page
│       │   ├── DashboardPage.jsx     # User dashboard
│       │   ├── PathDetailPage.jsx    # Detailed path view
│       │   └── CreatePathPage.jsx    # Create new path
│       └── services/                 # API services
│           ├── api.js                # API client setup
│           ├── authService.js        # Auth API calls
│           ├── pathService.js        # Path API calls
│           └── progressService.js    # Progress API calls
│
├── database/                         # Database files
│   ├── schema.sql                    # Database schema creation
│   └── additional_paths.sql          # Sample data
│
├── vercel.json                       # Vercel deployment config
├── package-lock.json                 # Dependency lock file
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL/MariaDB database
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the backend directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=learnpath
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Setup database:**
   ```bash
   # Create database and tables
   mysql -u root -p < ../database/schema.sql
   ```

5. **Start backend server:**
   ```bash
   npm start
   ```
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` (or shown in terminal)

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Learning Paths Table
```sql
CREATE TABLE paths (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Progress Table
```sql
CREATE TABLE progress (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  path_id INT NOT NULL,
  completed_steps INT DEFAULT 0,
  total_steps INT,
  status VARCHAR(50),
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (path_id) REFERENCES paths(id)
);
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /verify` - Verify JWT token

### Path Routes (`/api/paths`)
- `GET /` - Get all paths for user
- `GET /:id` - Get specific path details
- `POST /` - Create new path
- `PUT /:id` - Update path
- `DELETE /:id` - Delete path

### Progress Routes (`/api/progress`)
- `GET /:pathId` - Get progress for a path
- `POST /:pathId/step` - Mark step as complete
- `GET /user/:userId` - Get all user progress
- `PUT /:pathId` - Update overall progress

## 🎨 Frontend Components

### Key Components
- **Navbar** - Navigation and user menu
- **PathCard** - Display learning path summary
- **ProgressBar** - Visual progress indicator
- **StepItem** - Individual learning step
- **Footer** - Application footer

### Context Providers
- **AuthContext** - Manages authentication state
- **PathContext** - Manages learning paths state

### Custom Hooks
- **useAuth()** - Authentication operations
- **useFetchPaths()** - Fetch and manage paths
- **useProgress()** - Progress tracking operations

## ⚙️ Environment Configuration

### Backend Environment Variables
```
PORT                 - Server port (default: 5000)
DB_HOST              - Database host
DB_USER              - Database user
DB_PASSWORD          - Database password
DB_NAME              - Database name
JWT_SECRET           - Secret key for JWT
JWT_EXPIRE           - Token expiration time
NODE_ENV             - Environment (development/production)
```

### Frontend Environment Variables
```
VITE_API_URL         - Backend API URL
```

## 🚀 Deployment

### Deploy on Vercel

1. **Connect GitHub repository** to Vercel
2. **Configure Environment Variables** in Vercel dashboard:
   - Add all backend environment variables
   - Add frontend API URL

3. **Deploy:**
   - Vercel will automatically detect and build the project
   - Frontend serves on Vercel domain
   - Backend APIs run on Vercel serverless functions

### Database for Production
- Use managed database service (AWS RDS, DigitalOcean, etc.)
- Update connection strings in environment variables

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👥 Author

- **Developer** - LearnPath Project Team

## 📞 Support

For support, email support@learnpath.com or open an issue in the repository.

---

**Last Updated:** September 2026