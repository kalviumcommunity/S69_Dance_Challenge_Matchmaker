// const express = require('express');
// const app = express();
// const PORT = 3000;

// app.get('/ping', (req, res) => {
//   res.send('pong!');
// });

// app.listen(PORT, () => {
//   console.log(Server is running on http://localhost:${PORT});
// });

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); 
const connectDatabase = require('./DB/database'); 
const routes = require('./routes');

// Initialize dotenv to use environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

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

app.use('/api',routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});