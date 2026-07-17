const {
    EmbedBuilder
} = require('discord.js');

module.exports = function buildPanicEmbed(
    panic
) {

    const respondingOfficers =

        panic.responding_units &&
        panic.responding_units.length > 0

            ?

            panic.responding_units

                .map(officer =>

                    `• <@${officer.userId}> • **${officer.status}**`

                )

                .join('\n')

            :

            'No officers responding';





    const statusEmoji = {

        WAITING: '🟡',

        RESPOND: '🚓',

        EN_ROUTE: '🚨',

        ON_SCENE: '📍',

        CLEAR: '✅',

        CLOSED: '🔒'

    };





    return new EmbedBuilder()

        .setColor(0xFF0000)

        .setTitle('🚨 OFFICER PANIC ALARM')

        .setDescription(

            'An officer has activated a **PANIC ALARM**.\n\nImmediate assistance is required.'

        )

        .addFields(

            {

                name: '👮 Officer',

                value: `<@${panic.created_by}>`,

                inline: true

            },



            {

                name: '🚨 Priority',

                value: '🔴 **EXTREME**',

                inline: true

            },



            {

                name: '📡 Status',

                value:

                    `${

                        statusEmoji[panic.status]

                    } ${

                        panic.status

                    }`,

                inline: true

            },



            {

                name: '📍 Location',

                value:

                    panic.location ||

                    'Unknown',

                inline: false

            },



            {

                name: '📝 Situation',

                value:

                    panic.situation ||

                    'No information provided.',

                inline: false

            },



            {

                name: '📄 Additional Notes',

                value:

                    panic.additional_notes ||

                    'None',

                inline: false

            },



            {

                name: '🚓 Responding Officers',

                value:

                    respondingOfficers,

                inline: false

            }

        )

        .setFooter({

            text:

                `SAPD Pager Dispatch • Panic #${panic.dispatch_number}`

        })

        .setTimestamp(

            new Date(

                panic.created_at

            )

        );

};