# Task Management App – MERN Stack Project

Task Management App is a full-stack task manager built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to register, log in, and manage tasks with features like adding, editing, deleting, and marking tasks as important or completed. The app includes user authentication with JWT and uses Tailwind CSS for UI styling.

---

## 🚀 Features

- User authentication with JWT
- Secure password encryption using bcrypt
- Task CRUD: Add, edit, delete tasks
- Mark tasks as completed/incomplete/important
- Responsive UI with Tailwind CSS
- Modal popup for detailed task views
- Organized and scalable folder structure

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/MarufAnan/Task-Management-App.git
cd Task-Management-App
```

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Run the project

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontendd
npm run dev
```

---

## 📡 API Endpoints

### **Auth Routes**

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| POST   | `/api/auth/signup` | Register a new user    |
| POST   | `/api/auth/login`  | Login an existing user |

### **Task Routes**

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | `/api/tasks`       | Fetch all user tasks     |
| POST   | `/api/tasks`       | Create a new task        |
| PUT    | `/api/tasks/:id`   | Update an existing task  |
| DELETE | `/api/tasks/:id`   | Delete a task            |

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Frontend (`client/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000
```

> ⚠️ Important: Never commit `.env` files to version control.

---

## 🚀 Deployment

### 🔹 Frontend (Netlify)

1. Build the frontend:

```bash
npm run build
```

2. Deploy the `dist/` folder (inside `client/`) to Netlify.
3. Set the `VITE_API_BASE_URL` environment variable in Netlify settings.

### 🔹 Backend (Heroku/Render)

1. Push your backend to a GitHub repository.
2. Connect to Heroku or Render.
3. Add your environment variables in their dashboard.
4. Enable CORS for your frontend domain.

---

## 📝 Additional Notes

- Built with React Router for navigation.
- Fully styled with Tailwind CSS.
- Future-ready for user roles and admin panel integration.
- MongoDB Atlas is recommended for production DB.

---

## 📬 Contact

If you have any questions, suggestions, or issues, please open an issue on the [GitHub repository](https://github.com/MarufAnan/Task-Management-App/issues).

---

© 2025 Task Management App.Maruf Halder. All rights reserved.
