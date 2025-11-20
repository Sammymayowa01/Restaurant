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

// 👉 Add this AFTER creating app
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Middleware
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5000'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
