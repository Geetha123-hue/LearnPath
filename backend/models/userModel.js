const db = require('../config/db');

exports.findByEmail = async (email) => {
    return await db.getOne('SELECT * FROM users WHERE email = ?', [email]);
};

exports.findByUsername = async (username) => {
    return await db.getOne('SELECT * FROM users WHERE username = ?', [username]);
};

exports.findById = async (id) => {
    return await db.getOne('SELECT id, username, email, avatar_url, created_at FROM users WHERE id = ?', [id]);
};

exports.create = async ({ username, email, passwordHash }) => {
    const result = await db.runAsync(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, passwordHash]
    );
    return result.lastID;
};
