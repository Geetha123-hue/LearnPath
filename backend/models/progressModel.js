const db = require('../config/db');

exports.getEnrolledPaths = async (userId) => {
    const sql = `
        SELECT lp.*, ue.enrolled_at, u.username as creator_name
        FROM user_enrollments ue
        JOIN learning_paths lp ON ue.path_id = lp.id
        LEFT JOIN users u ON lp.creator_id = u.id
        WHERE ue.user_id = ?
        ORDER BY ue.enrolled_at DESC
    `;
    return await db.query(sql, [userId]);
};

exports.isEnrolled = async (userId, pathId) => {
    const row = await db.getOne(
        'SELECT * FROM user_enrollments WHERE user_id = ? AND path_id = ?',
        [userId, pathId]
    );
    return !!row;
};

exports.enroll = async (userId, pathId) => {
    return await db.runAsync(
        'INSERT OR IGNORE INTO user_enrollments (user_id, path_id) VALUES (?, ?)',
        [userId, pathId]
    );
};

exports.getCompletedStepIds = async (userId) => {
    const rows = await db.query(
        'SELECT step_id FROM step_completions WHERE user_id = ?',
        [userId]
    );
    return rows.map(r => r.step_id);
};

exports.toggleStepCompletion = async (userId, stepId) => {
    const existing = await db.getOne(
        'SELECT * FROM step_completions WHERE user_id = ? AND step_id = ?',
        [userId, stepId]
    );

    if (existing) {
        await db.runAsync('DELETE FROM step_completions WHERE user_id = ? AND step_id = ?', [userId, stepId]);
        return { completed: false };
    } else {
        await db.runAsync('INSERT INTO step_completions (user_id, step_id) VALUES (?, ?)', [userId, stepId]);
        return { completed: true };
    }
};
