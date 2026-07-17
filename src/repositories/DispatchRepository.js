const BaseRepository =
    require('./BaseRepository');


class DispatchRepository extends BaseRepository {


    constructor() {

        super('dispatches');

    }



    /**
     * Create Dispatch
     */
    create(dispatch) {

        return this.db
            .prepare(`
                INSERT INTO dispatches
                (

                    guild_id,

                    dispatch_number,

                    message_id,

                    channel_id,

                    type,

                    priority,

                    location,

                    situation,

                    additional_notes,

                    requested_units,

                    responding_units,

                    status,

                    created_by

                )

                VALUES
                (

                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?

                )
            `)
            .run(

                dispatch.guildId,

                dispatch.dispatchNumber,

                dispatch.messageId,

                dispatch.channelId,

                dispatch.type,

                dispatch.priority,

                dispatch.location,

                dispatch.situation,

                dispatch.additionalNotes,

                JSON.stringify(
                    dispatch.requestedUnits || []
                ),

                JSON.stringify(
                    dispatch.respondingUnits || []
                ),

                dispatch.status,

                dispatch.createdBy

            );

    }





    /**
     * Update Discord Message ID
     */
    /**
 * Update Discord Message ID
 */
updateMessage(

    id,

    messageId

) {


    return this.db
        .prepare(`
            UPDATE dispatches

            SET

                message_id = ?,

                updated_at = CURRENT_TIMESTAMP

            WHERE

                id = ?

        `)
        .run(

            messageId,

            id

        );


}





    /**
     * Update Status
     */
    updateStatus(
        id,
        status
    ) {

        return this.db
            .prepare(`
                UPDATE dispatches

                SET

                    status = ?,

                    updated_at = CURRENT_TIMESTAMP

                WHERE id = ?
            `)
            .run(
                status,
                id
            );

    }





    /**
     * Update Responding Units
     */
    updateRespondingUnits(
        id,
        respondingUnits
    ) {

        return this.db
            .prepare(`
                UPDATE dispatches

                SET

                    responding_units = ?,

                    updated_at = CURRENT_TIMESTAMP

                WHERE id = ?
            `)
            .run(

                JSON.stringify(
                    respondingUnits
                ),

                id

            );

    }





    /**
     * Close Dispatch
     */
    close(id) {

        return this.db
            .prepare(`
                UPDATE dispatches

                SET

                    status = 'CLOSED',

                    closed_at = CURRENT_TIMESTAMP,

                    updated_at = CURRENT_TIMESTAMP

                WHERE id = ?
            `)
            .run(id);

    }





    /**
     * Get by Database ID
     */
    getById(id) {

        const dispatch =
            this.db
                .prepare(`
                    SELECT *

                    FROM dispatches

                    WHERE id = ?
                `)
                .get(id);

        return this.parse(dispatch);

    }





    /**
     * Get by Discord Message ID
     */
    getByMessageId(messageId) {

        const dispatch =
            this.db
                .prepare(`
                    SELECT *

                    FROM dispatches

                    WHERE message_id = ?
                `)
                .get(messageId);

        return this.parse(dispatch);

    }





    /**
     * Get by Dispatch Number
     */
    getByDispatchNumber(
        guildId,
        dispatchNumber
    ) {

        const dispatch =
            this.db
                .prepare(`
                    SELECT *

                    FROM dispatches

                    WHERE

                        guild_id = ?

                    AND

                        dispatch_number = ?
                `)
                .get(
                    guildId,
                    dispatchNumber
                );

        return this.parse(dispatch);

    }





    /**
     * Get Active Dispatches
     */
    getActive(guildId) {

        const rows =
            this.db
                .prepare(`
                    SELECT *

                    FROM dispatches

                    WHERE

                        guild_id = ?

                    AND

                        status != 'CLOSED'

                    ORDER BY

                        dispatch_number DESC
                `)
                .all(guildId);

        return rows.map(
            dispatch => this.parse(dispatch)
        );

    }





    /**
     * Delete Dispatch
     */
    delete(id) {

        return this.db
            .prepare(`
                DELETE

                FROM dispatches

                WHERE id = ?
            `)
            .run(id);

    }





    /**
     * Parse JSON Columns
     */
    parse(dispatch) {

        if (!dispatch) {

            return null;

        }

        dispatch.requested_units =

            dispatch.requested_units

                ? JSON.parse(
                    dispatch.requested_units
                )

                : [];



        dispatch.responding_units =

            dispatch.responding_units

                ? JSON.parse(
                    dispatch.responding_units
                )

                : [];



        return dispatch;

    }
    getActiveCount() {

    const row =
        this.db
            .prepare(`
                SELECT

                    COUNT(*) AS total

                FROM dispatches

                WHERE

                    status != 'CLOSED'
            `)
            .get();

    return row.total;

}


}


module.exports =
    new DispatchRepository();