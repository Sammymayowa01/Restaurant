const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const apiRoutes = require('./routes/api'); 
const connectDB = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// ------------------------------
// ✅ FIXED CORS for Netlify + Railway
// ------------------------------
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5000',
    'https://lighthearted-liger-23ebf4.netlify.app'  // ✅ Your Netlify frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
