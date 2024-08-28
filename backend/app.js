const express = require('express');
const authMiddleware = require('./middlewares/AuthMiddleware');
const connectDB = require('../database/mongodb');
const cors = require('cors');
const authRoutes = require('./routes/auth-route');
const forumRoutes = require('./routes/forum-route');
const chatRoutes = require('./routes/chat-route');
const contactRoutes = require('./routes/contact-route');
const courseRoute = require('./routes/course-route');

const app = express();
app.use(cors()); // This enables CORS for all routes
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/course',courseRoute);

app.use('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

connectDB().then((client) => {
    const db = client.db('ChatSystem');
    app.locals.db = db;

}).catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);  // Exit the application if the DB connection fails
});

module.exports = app;
