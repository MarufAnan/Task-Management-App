const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// ✅ Define app BEFORE using it
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes); // moved AFTER app is declared

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
