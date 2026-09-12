const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const config = require('./env');

const dbPath = config.DB_PATH;
const schemaPath = path.join(__dirname, '../../database/schema.sql');
const seedMigrationPath = path.join(__dirname, '../../database/additional_paths.sql');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error connecting to SQLite database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database at:', dbPath);
        initDatabase();
    }
});

function initDatabase() {
    db.get("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
        if (err) {
            console.error('Error checking database tables:', err);
            return;
        }

        if (row && row.count === 0) {
            console.log('⚡ Initializing database schema from schema.sql...');
            if (fs.existsSync(schemaPath)) {
                const schemaSql = fs.readFileSync(schemaPath, 'utf8');
                db.exec(schemaSql, (execErr) => {
                    if (execErr) {
                        console.error('❌ Error executing database schema:', execErr.message);
                    } else {
                        console.log('✅ Database schema initialized successfully!');
                        runSeedMigration();
                    }
                });
            } else {
                console.warn('⚠️ schema.sql not found at:', schemaPath);
            }
        } else {
            runSeedMigration();
        }
    });
}

function runSeedMigration() {
    if (!fs.existsSync(seedMigrationPath)) return;

    const migrationSql = fs.readFileSync(seedMigrationPath, 'utf8');
    db.exec(migrationSql, (err) => {
        if (err) {
            console.error('❌ Error applying learning path seed migration:', err.message);
        } else {
            console.log('✅ Learning path seed migration checked successfully.');
        }
    });
}

// Helper method for promisified queries
db.query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

db.getOne = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

db.runAsync = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve({ lastID: this.lastID, changes: this.changes });
        });
    });
};

module.exports = db;
