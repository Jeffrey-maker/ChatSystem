const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const { v4: uuidv4 } = require('uuid');

exports.register = async (db, username, email, password) => {
    const userCollection = db.collection('users');

    // Check if the user already exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Generate a unique id
    const userId = uuidv4();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await userCollection.insertOne({
        userId,
        username,
        email,
        password: hashedPassword,
    });

    return userId;
}

exports.login = async (db, email, password) => {
    const userCollection = db.collection('users');

    // Find the user by email
    const user = await userCollection.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, jwtConfig.secret, { expiresIn: '1h' });

    return { token, userId: user.userId };
};

exports.changeUsername = async (db, email) => {

}

exports.changePassword = async (db, email) => {

}