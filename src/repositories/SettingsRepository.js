const BaseRepository = require('./BaseRepository');


class SettingsRepository extends BaseRepository {


    constructor() {

        super('settings');

    }





    /**
     * Creates default guild settings
     */
    createGuild(guildId) {

        return this.db
            .prepare(`
                INSERT OR IGNORE INTO settings
                (
                    guild_id
                )
                VALUES (?)
            `)
            .run(guildId);

    }





    /**
     * Get complete settings
     */
    getSettings(guildId) {

        return this.db
            .prepare(`
                SELECT *
                FROM settings
                WHERE guild_id = ?
            `)
            .get(guildId);

    }





    /**
     * Check if dispatch is configured
     */
    isConfigured(guildId) {

        const row =
            this.db
                .prepare(`
                    SELECT

                        dispatch_alert_channel_id,

                        evaluation_log_channel_id

                    FROM settings

                    WHERE guild_id = ?

                `)
                .get(guildId);



        return Boolean(

            row &&

            row.dispatch_alert_channel_id &&

            row.evaluation_log_channel_id

        );

    }





    /**
     * Get console information
     */
    getConsole(guildId) {

        return this.db
            .prepare(`
                SELECT

                    console_channel_id,

                    console_message_id,

                    console_created_at


                FROM settings


                WHERE guild_id = ?

            `)
            .get(guildId);

    }





    /**
     * Save dispatch console
     */
    updateConsole(

        guildId,

        channelId,

        messageId

    ) {


        return this.db
            .prepare(`
                UPDATE settings

                SET

                    console_channel_id = ?,

                    console_message_id = ?,

                    console_created_at = CURRENT_TIMESTAMP,

                    updated_at = CURRENT_TIMESTAMP


                WHERE guild_id = ?

            `)
            .run(

                channelId,

                messageId,

                guildId

            );

    }





    /**
     * Remove only console message
     */
    clearConsole(guildId) {


        return this.db
            .prepare(`
                UPDATE settings

                SET

                    console_channel_id = NULL,

                    console_message_id = NULL,

                    console_created_at = NULL,

                    updated_at = CURRENT_TIMESTAMP


                WHERE guild_id = ?

            `)
            .run(guildId);

    }





    /**
     * Full dispatch reset
     *
     * Used by:
     * /setup_dispatch reset:true
     */
    clearConfiguration(guildId) {


        return this.db
            .prepare(`
                UPDATE settings

                SET


                    console_channel_id = NULL,

                    console_message_id = NULL,

                    console_created_at = NULL,


                    dispatch_alert_channel_id = NULL,

                    evaluation_log_channel_id = NULL,


                    staff_officer_role_id = NULL,

                    command_officer_role_id = NULL,

                    supervisor_role_id = NULL,


                    police_officer_role_id = NULL,

                    detective_role_id = NULL,


                    swat_role_id = NULL,

                    traffic_role_id = NULL,


                    updated_at = CURRENT_TIMESTAMP


                WHERE guild_id = ?

            `)
            .run(guildId);

    }





    /**
     * Save channels + roles
     */
    updateDispatchConfiguration(

        guildId,


        dispatchAlertChannelId,

        evaluationLogChannelId,


        staffOfficerRoleId,

        commandOfficerRoleId,

        supervisorRoleId,


        policeOfficerRoleId,

        detectiveRoleId,


        swatRoleId,

        trafficRoleId

    ) {


        return this.db
            .prepare(`
                UPDATE settings

                SET


                    dispatch_alert_channel_id = ?,

                    evaluation_log_channel_id = ?,


                    staff_officer_role_id = ?,

                    command_officer_role_id = ?,

                    supervisor_role_id = ?,


                    police_officer_role_id = ?,

                    detective_role_id = ?,


                    swat_role_id = ?,

                    traffic_role_id = ?,


                    updated_at = CURRENT_TIMESTAMP


                WHERE guild_id = ?

            `)
            .run(


                dispatchAlertChannelId,

                evaluationLogChannelId,


                staffOfficerRoleId,

                commandOfficerRoleId,

                supervisorRoleId,


                policeOfficerRoleId,

                detectiveRoleId,


                swatRoleId,

                trafficRoleId,


                guildId

            );

    }





    /**
     * Get dispatch channels + roles
     */
    getDispatchConfiguration(guildId) {


        return this.db
            .prepare(`
                SELECT

                    dispatch_alert_channel_id,

                    evaluation_log_channel_id,


                    staff_officer_role_id,

                    command_officer_role_id,

                    supervisor_role_id,


                    police_officer_role_id,

                    detective_role_id,


                    swat_role_id,

                    traffic_role_id


                FROM settings


                WHERE guild_id = ?

            `)
            .get(guildId);

    }





    /**
     * Get only roles
     */
    getDispatchRoles(guildId) {


        return this.db
            .prepare(`
                SELECT


                    staff_officer_role_id,

                    command_officer_role_id,

                    supervisor_role_id,


                    police_officer_role_id,

                    detective_role_id,


                    swat_role_id,

                    traffic_role_id


                FROM settings


                WHERE guild_id = ?

            `)
            .get(guildId);

    }





    /**
     * Update Department Branding
     */
    updateDepartmentInfo(

        guildId,

        departmentName,

        logo,

        footer,

        color

    ) {


        return this.db
            .prepare(`
                UPDATE settings

                SET

                    department_name = ?,

                    department_logo = ?,

                    footer_text = ?,

                    embed_color = ?,


                    updated_at = CURRENT_TIMESTAMP


                WHERE guild_id = ?

            `)
            .run(

                departmentName,

                logo,

                footer,

                color,

                guildId

            );

    }





    /**
     * Get all existing consoles
     */
    getAllConsoles() {


        return this.db
            .prepare(`
                SELECT

                    guild_id,

                    console_channel_id,

                    console_message_id


                FROM settings


                WHERE

                    console_channel_id IS NOT NULL

                AND

                    console_message_id IS NOT NULL

            `)
            .all();

    }


}


module.exports = new SettingsRepository();