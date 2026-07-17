const BaseRepository =
    require('./BaseRepository');


class CountersRepository extends BaseRepository {


    constructor() {

        super('counters');

    }





    /**
     * Ensure counter exists
     */
    createGuild(guildId) {

        return this.db
            .prepare(`
                INSERT OR IGNORE INTO counters
                (

                    guild_id,

                    next_dispatch_number

                )

                VALUES
                (

                    ?,

                    1

                )
            `)
            .run(guildId);

    }






    /**
     * Get Counter
     */
    get(guildId) {

        this.createGuild(
            guildId
        );

        return this.db
            .prepare(`
                SELECT *

                FROM counters

                WHERE guild_id = ?
            `)
            .get(guildId);

    }






    /**
     * Get Next Dispatch Number
     *
     * Returns the current value
     * then increments it.
     */
    nextDispatchNumber(guildId) {

        this.createGuild(
            guildId
        );

        const transaction =
            this.db.transaction(() => {

                const row =
                    this.db
                        .prepare(`
                            SELECT

                                next_dispatch_number

                            FROM counters

                            WHERE guild_id = ?
                        `)
                        .get(guildId);


                const current =
                    row.next_dispatch_number;


                this.db
                    .prepare(`
                        UPDATE counters

                        SET

                            next_dispatch_number = ?

                        WHERE guild_id = ?
                    `)
                    .run(

                        current + 1,

                        guildId

                    );


                return current;

            });

        return transaction();

    }






    /**
     * Peek next number
     *
     * Does NOT increment.
     */
    peekDispatchNumber(guildId) {

        this.createGuild(
            guildId
        );

        return this.db
            .prepare(`
                SELECT

                    next_dispatch_number

                FROM counters

                WHERE guild_id = ?
            `)
            .get(guildId)
            .next_dispatch_number;

    }






    /**
     * Reset Counter
     */
    resetDispatchCounter(
        guildId,
        startAt = 1
    ) {

        this.createGuild(
            guildId
        );

        return this.db
            .prepare(`
                UPDATE counters

                SET

                    next_dispatch_number = ?

                WHERE guild_id = ?
            `)
            .run(

                startAt,

                guildId

            );

    }


}


module.exports =
    new CountersRepository();