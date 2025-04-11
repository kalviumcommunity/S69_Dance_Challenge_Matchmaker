const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); 
const connectDatabase = require('./DB/database'); 
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Initialize dotenv to use environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());


// Explicit CORS configuration
const corsOptions = {
    origin: "http://localhost:5173", // Allow frontend URL
    methods: "GET, POST, PUT, DELETE", // Allow necessary methods
    allowedHeaders: "Content-Type, Authorization" // Allow necessary headers
};
app.use(cors(corsOptions));

// Connect to the database
connectDatabase();

// Middleware to handle the root route
app.get('/', (req, res) => {
    res.send('Welcome to the MongoDB connection server!');
});

// A route to check if the DB connection is successful
app.get('/status', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.send('MongoDB connected successfully!');
    } else {
        res.status(500).send('MongoDB connection failed!');
    }
});

// Use routes
app.use('/api', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
