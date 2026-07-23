# 🚀 TaskFlow - Full Stack Task Management System

<p align="center">
  <img src="./frontend/public/images/taskflow.png" alt="TaskFlow Logo" width="170"/>
</p>

<p align="center">
  <b>A Modern Full-Stack Task Management System built with React, Node.js, Express and MySQL.</b>
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Responsive-38BDF8?style=for-the-badge&logo=tailwind-css)

</p>

---

# 📖 Project Overview

TaskFlow is a modern Full Stack Task Management System developed to help users organize, prioritize, track and complete daily tasks efficiently.

The application provides a clean dashboard, powerful filtering system, real-time statistics, responsive interface and secure authentication.

The system follows a client-server architecture where the React frontend communicates with a RESTful Express API while MySQL securely stores all application data.

---

# ✨ Features

## 🔐 Authentication

- User Login
- JWT Authentication
- Protected Routes
- Password Encryption
- Session Persistence
- Logout Functionality

---

## 📋 Task Management

- Create Tasks
- Edit Tasks
- Delete Tasks
- View All Tasks
- Search Tasks
- Sort Tasks
- Filter by Status
- Filter by Priority

---

## 📊 Dashboard

- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- Overdue Tasks

---

## 🎨 User Experience

- Beautiful Modern UI
- Dark Mode
- Light Mode
- Mobile Responsive
- Interactive Dashboard
- Toast Notifications
- Loading Indicators
- Pagination
- Clean Animations

---

# 🛠 Technology Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcryptjs
- Express Validator
- CORS
- dotenv

---

## Database

- MySQL

---

## Development Tools

- Vite
- Nodemon
- npm

---

# 📁 Project Structure

```
TaskFlow
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── validators
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── routes
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙ Installation Instructions

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/taskflow.git
```

```
cd taskflow
```

---

## 2. Install Backend Dependencies

```bash
cd backend
```

```bash
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd ../frontend
```

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=taskflow

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d
```

---

# 🗄 Database Setup

## Step 1

Create database

```sql
CREATE DATABASE taskflow;
```

---

## Step 2

Import the provided SQL file.

Example:

```
taskflow.sql
```

OR manually create the required tables.

---

## Main Tables

- users
- tasks

---

# ▶ Running the Backend

Navigate to backend

```bash
cd backend
```

Development mode

```bash
npm run dev
```

Production

```bash
npm start
```

Backend runs on

```
http://localhost:5000
```

---

# 💻 Running the Frontend

Navigate to frontend

```bash
cd frontend
```

Start development server

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔌 API Documentation

## Authentication

### Login

```
POST /api/auth/login
```

Request

```json
{
    "email":"admin@test.com",
    "password":"123456"
}
```

---

## Tasks

### Get All Tasks

```
GET /api/tasks
```

Supports

- Search
- Pagination
- Sorting
- Filtering

---

### Create Task

```
POST /api/tasks
```

---

### Update Task

```
PUT /api/tasks/:id
```

---

### Delete Task

```
DELETE /api/tasks/:id
```

---

### Task Statistics

```
GET /api/tasks/stats
```

Returns

```json
{
    "total":20,
    "pending":4,
    "inProgress":6,
    "completed":8,
    "overdue":2
}
```

---

# 🔒 Authentication

The API uses **JSON Web Token (JWT)** authentication.

After login:

```
Authorization:
Bearer <your_token>
```

must be included in protected API requests.

---

# 📱 Responsive Design

TaskFlow supports

- Desktop
- Laptop
- Tablet
- Mobile

using responsive layouts built with Tailwind CSS.

---

# 🎯 Assumptions Made

- Users authenticate before accessing the dashboard.
- Each task belongs to a single user.
- Authentication uses JWT tokens.
- Users can only manage their own tasks.
- MySQL server is running locally.
- Backend and frontend run on separate ports.
- Internet connection is only required during dependency installation.

---

# ⚠ Known Limitations

- No email verification.
- No password reset feature.
- No file attachment support.
- No drag-and-drop task management.
- No team collaboration.
- No push notifications.
- No offline mode.
- No calendar integration.

---

# 👨‍💻 Developed By

**Sanjula Dilhara**

Software Engineering Undergraduate

Sri Lanka Institute of Information Technology (SLIIT)

---

# 📄 License

This project was developed for educational and internship assessment purposes.

---

<p align="center">

⭐ If you found this project useful, don't forget to star the repository.

</p>
