const fs = require('node:fs');
const path = require('node:path');

const db = require('./database');
const logger = require('../utils/logger');

function runMigrations() {
    const schema = fs.readFileSync(
        path.join(__dirname, 'schema.sql'),
        'utf8'
    );

    db.exec(schema);

    logger.info('Database schema loaded.');
}

module.exports = {
    runMigrations
};