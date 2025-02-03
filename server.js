const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // Import mongoose here
const connectDatabase = require('./DB/database'); // Import your custom database connection logic

// Initialize dotenv to use environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDatabase();

// Middleware to handle the root route
app.get('/', (req, res) => {
    res.send('Welcome to the MongoDB connection server!');
});

// A route to check if the DB connection is successful
app.get('/status', (req, res) => {
    // Check if mongoose is connected
    if (mongoose.connection.readyState === 1) {
        res.send('MongoDB connected successfully!');
    } else {
        res.status(500).send('MongoDB connection failed!');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});