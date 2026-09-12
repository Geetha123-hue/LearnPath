const db = require('../config/db');

exports.getAll = async () => {
    const sql = `
        SELECT lp.*, u.username as creator_name,
        (SELECT COUNT(*) FROM modules m WHERE m.path_id = lp.id) as module_count,
        (SELECT COUNT(*) FROM steps s JOIN modules m ON s.module_id = m.id WHERE m.path_id = lp.id) as total_steps
        FROM learning_paths lp
        LEFT JOIN users u ON lp.creator_id = u.id
        ORDER BY lp.created_at DESC
    `;
    return await db.query(sql);
};

exports.getById = async (id) => {
    const pathSql = `
        SELECT lp.*, u.username as creator_name 
        FROM learning_paths lp
        LEFT JOIN users u ON lp.creator_id = u.id
        WHERE lp.id = ?
    `;
    const path = await db.getOne(pathSql, [id]);
    if (!path) return null;

    const modulesSql = `
        SELECT * FROM modules WHERE path_id = ? ORDER BY order_index ASC
    `;
    const modules = await db.query(modulesSql, [id]);

    for (let mod of modules) {
        const stepsSql = `
            SELECT * FROM steps WHERE module_id = ? ORDER BY order_index ASC
        `;
        mod.steps = await db.query(stepsSql, [mod.id]);
    }

    path.modules = modules;
    return path;
};

exports.createPath = async ({ title, description, category, difficulty, estimatedHours, coverImage, creatorId }) => {
    const result = await db.runAsync(
        `INSERT INTO learning_paths (title, description, category, difficulty, estimated_hours, cover_image, creator_id)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, description, category || 'General', difficulty || 'Beginner', estimatedHours || 10, coverImage, creatorId]
    );
    return result.lastID;
};

exports.createModule = async ({ pathId, title, description, orderIndex }) => {
    const result = await db.runAsync(
        `INSERT INTO modules (path_id, title, description, order_index) VALUES (?, ?, ?, ?)`,
        [pathId, title, description, orderIndex]
    );
    return result.lastID;
};

exports.createStep = async ({ moduleId, title, resourceType, resourceUrl, estimatedMinutes, orderIndex }) => {
    const result = await db.runAsync(
        `INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [moduleId, title, resourceType || 'article', resourceUrl, estimatedMinutes || 30, orderIndex]
    );
    return result.lastID;
};
