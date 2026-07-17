const Database = require('better-sqlite3');
const fs = require('node:fs');
const path = require('node:path');

const logger = require('../utils/logger');

const DATA_FOLDER = path.join(process.cwd(), 'data');

const DATABASE_FILE = path.join(
    DATA_FOLDER,
    'dispatch.db'
);

if (!fs.existsSync(DATA_FOLDER)) {
    fs.mkdirSync(DATA_FOLDER, { recursive: true });

    logger.info('Created data directory.');
}

const db = new Database(DATABASE_FILE);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

logger.info('SQLite database initialized.');

module.exports = db;