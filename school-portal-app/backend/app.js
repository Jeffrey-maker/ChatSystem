const express = require('express');
const authRoutes = require('./routes/authRoute');
const authMiddleware = require('./middlewares/AuthMiddleware');
const connectDB = require('../database/mongodb');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

connectDB().then((client) => {
    const db = client.db('ChatSystem');
    app.locals.db = db;

    // Register routes after the DB connection is established
    app.use('/api/auth', authRoutes);
    app.use('/api/protected', authMiddleware, (req, res) => {
        res.json({ message: 'This is a protected route' });
    });

}).catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);  // Exit the application if the DB connection fails
});

module.exports = app;
