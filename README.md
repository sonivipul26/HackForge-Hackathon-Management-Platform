# 🔨 HackForge — Hackathon Management Platform

A full-stack hackathon management platform built for universities and organizations to host, manage, and participate in hackathons. Built as a production-grade SaaS application.

## 🚀 Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Frontend       | React, React Router, Tailwind CSS   |
| Backend        | Node.js, Express.js                 |
| Database       | MongoDB, Mongoose                   |
| Authentication | JWT, bcrypt                         |
| HTTP Client    | Axios                               |
| Dev Tooling    | Vite, Nodemon, Concurrently         |

## 📁 Project Structure

```
hackforge/
├── client/                 # React frontend (Vite)
│   ├── public/
│   └── src/
│       ├── api/            # Axios instance & API services
│       ├── assets/         # Images, icons, fonts
│       ├── components/     # Reusable UI components
│       │   ├── common/     # Generic components (Button, Input, etc.)
│       │   └── layout/     # Layout components (Navbar, Sidebar, etc.)
│       ├── context/        # React Context providers
│       ├── hooks/          # Custom hooks
│       ├── pages/          # Page-level components
│       ├── routes/         # Route definitions & guards
│       └── utils/          # Helpers, constants, formatters
│
├── server/                 # Express backend
│   └── src/
│       ├── config/         # Database & environment config
│       ├── controllers/    # Route handler logic
│       ├── middleware/      # Auth, error handling, validation
│       ├── models/         # Mongoose schemas
│       ├── routes/         # Express route definitions
│       ├── services/       # Business logic
│       ├── utils/          # Helpers, custom errors, constants
│       └── validators/     # Input validation schemas
│
└── package.json            # Root scripts (concurrently)
```

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Git

### 1. Clone the repository

```bash
git clone <repo-url>
cd hackforge
```

### 2. Install all dependencies

```bash
npm run install:all
```

### 3. Configure environment variables

```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your MongoDB URI and JWT secret.

### 4. Start development servers

```bash
npm run dev
```

This starts both servers concurrently:

- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:5173

### 5. Verify setup

```bash
curl http://localhost:5000/api/v1/health
```

## 👥 User Roles

| Role          | Description                                    |
| ------------- | ---------------------------------------------- |
| Administrator | Full platform control, user & hackathon management |
| Organizer     | Creates and manages hackathons                 |
| Participant   | Joins hackathons, forms teams, submits projects |
| Judge         | Evaluates submissions, provides scores         |

## 📜 License

ISC
