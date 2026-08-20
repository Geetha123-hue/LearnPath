const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { generateToken } = require('../services/jwtService');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required.' });
        }

        const existingEmail = await userModel.findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ error: 'Email is already registered.' });
        }

        const existingUsername = await userModel.findByUsername(username);
        if (existingUsername) {
            return res.status(400).json({ error: 'Username is already taken.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const userId = await userModel.create({ username, email, passwordHash });
        const user = await userModel.findById(userId);
        const token = generateToken({ id: user.id, username: user.username, email: user.email });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const token = generateToken({ id: user.id, username: user.username, email: user.email });
        const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar_url: user.avatar_url,
            created_at: user.created_at
        };

        res.json({
            message: 'Login successful',
            token,
            user: userData
        });
    } catch (err) {
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json({ user });
    } catch (err) {
        next(err);
    }
};
