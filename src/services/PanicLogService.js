const SettingsRepository =
    require('../repositories/SettingsRepository');

const logger =
    require('../utils/logger');

const {
    EmbedBuilder
} = require('discord.js');



class PanicLogService {



    /**
     * Create Panic Log
     */
    async createLog(
        client,
        panic
    ) {

        try {


            /*
                Fetch Guild
            */

            const guild =
                await client.guilds.fetch(
                    panic.guild_id
                );


            /*
                Settings
            */

            const settings =
                SettingsRepository.getSettings(
                    panic.guild_id
                );


            if (

                !settings ||

                !settings.evaluation_log_channel_id

            ) {

                return;

            }


            /*
                Log Channel
            */

            const channel =
                await guild.channels.fetch(

                    settings.evaluation_log_channel_id

                );


            if (!channel) {

                return;

            }






            /*
                Responding Officers
            */

            const respondingOfficers =

                panic.responding_units.length > 0

                    ?

                    panic.responding_units

                        .map(officer =>

                            `• <@${officer.userId}> — **${officer.status}**`

                        )

                        .join('\n')

                    :

                    'No responding officers.';






            /*
                Requested Units
            */

            const requestedUnits =

                panic.requested_units.length > 0

                    ?

                    panic.requested_units.join(', ')

                    :

                    'None';






            /*
                Duration
            */

            let duration =

                'Unknown';


            if (

                panic.created_at &&

                panic.closed_at

            ) {

                const created =

                    new Date(
                        panic.created_at
                    );

                const closed =

                    new Date(
                        panic.closed_at
                    );

                const minutes =

                    Math.round(

                        (closed - created)

                        / 60000

                    );

                duration =
                    `${minutes} minute(s)`;

            }






            /*
                Build Embed
            */

            const embed =
                new EmbedBuilder()

                    .setColor(
                        0xFF0000
                    )

                    .setTitle(

                        `🚨 Panic #${panic.dispatch_number} Closed`

                    )

                    .addFields(

                        {

                            name:
                                '👮 Activated By',

                            value:
                                `<@${panic.created_by}>`,

                            inline: true

                        },

                        {

                            name:
                                '📡 Final Status',

                            value:
                                panic.status,

                            inline: true

                        },

                        {

                            name:
                                '⏱ Duration',

                            value:
                                duration,

                            inline: true

                        },

                        {

                            name:
                                '📍 Location',

                            value:
                                panic.location,

                            inline: false

                        },

                        {

                            name:
                                '📝 Situation',

                            value:
                                panic.situation,

                            inline: false

                        },

                        {

                            name:
                                '📄 Additional Notes',

                            value:
                                panic.additional_notes ||

                                'None',

                            inline: false

                        },

                        {

                            name:
                                '🚓 Requested Units',

                            value:
                                requestedUnits,

                            inline: false

                        },

                        {

                            name:
                                '👥 Responding Officers',

                            value:
                                respondingOfficers,

                            inline: false

                        }

                    )

                    .setFooter({

                        text:

                            'SAPD Pager Dispatch • Panic Log'

                    })

                    .setTimestamp();






            await channel.send({

                embeds: [

                    embed

                ]

            });






            logger.info(

                {

                    panic:
                        panic.dispatch_number

                },

                'Panic log created'

            );


        }

        catch(error) {


            logger.error(

                {

                    error:
                        error.message

                },

                'Failed to create panic log'

            );


        }


    }


}


module.exports =
    new PanicLogService();