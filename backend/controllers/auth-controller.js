const authService = require('../services/auth-service');

exports.register = async (req, res) => {
    try {
        const { username,email, password } = req.body;
        const db = req.app.locals.db;

        const userId = await authService.register(db, username, email, password);

        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        if (error.message === 'User already exists') {
            return res.status(400).json({ error: error.message });
        }
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = req.app.locals.db;

        const { token, userId } = await authService.login(db, email, password);

        res.json({ message: 'User logged in successfully', token, userId});
    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Invalid credentials') {
            return res.status(400).json({ error: error.message });
        }
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
