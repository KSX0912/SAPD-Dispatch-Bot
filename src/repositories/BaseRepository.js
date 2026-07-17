const db = require('../database/database');

class BaseRepository {
    constructor(table) {
        this.db = db;
        this.table = table;
    }

    exists(guildId) {
        const row = this.db
            .prepare(
                `SELECT 1 FROM ${this.table} WHERE guild_id = ? LIMIT 1`
            )
            .get(guildId);

        return !!row;
    }

    delete(guildId) {
        return this.db
            .prepare(
                `DELETE FROM ${this.table} WHERE guild_id = ?`
            )
            .run(guildId);
    }
}

module.exports = BaseRepository;