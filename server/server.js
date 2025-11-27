// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// const apiRoutes = require('./routes/api'); 
// const connectDB = require('./db');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5002;

// connectDB();

// // Test route
// app.get("/", (req, res) => {
//   res.send("API is working!");
// });

// // ------------------------------
// // ✅ FIXED CORS for Netlify + Railway
// // ------------------------------
// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'http://localhost:5173',
//     'http://localhost:5000',
//     'https://lighthearted-liger-23ebf4.netlify.app'  // ✅ Your Netlify frontend
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api', apiRoutes);

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });




// server.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api'); 
const connectDB = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ✅ Use Railway's port automatically
const port = process.env.PORT || 5002;

// Connect to MongoDB
connectDB();

// ------------------------------
// ✅ CORS configuration
// ------------------------------
app.use(cors({
  origin: [
    'http://localhost:3000',               // Local React dev
    'http://localhost:5173',               // Vite dev
    'https://lighthearted-liger-23ebf4.netlify.app' // Netlify frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ------------------------------
// Middleware
// ------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------------
// Routes
// ------------------------------
app.use('/api', apiRoutes);

// ------------------------------
// Test route
// ------------------------------
app.get('/', (req, res) => {
  res.send('API is working!');
});

// ------------------------------
// Catch-all for 404
// ------------------------------
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// ------------------------------
// Start server
// ------------------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
