const authService = require('../services/authService');
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = req.app.locals.db;
        const userCollection = db.collection('users');

        // Find the user by email
        const user = await userCollection.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        res.json({ message: 'User logged in successfully' });  
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = req.app.locals.db;
        const userCollection = db.collection('users');

        // Find whether the user exist
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await userCollection.insertOne({
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
