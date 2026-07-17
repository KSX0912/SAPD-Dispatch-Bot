const {
    EmbedBuilder
} = require('discord.js');



module.exports = function buildDispatchEmbed(
    dispatch
) {



    const respondingOfficers =

        dispatch.responding_units &&

        dispatch.responding_units.length > 0


        ?


        dispatch.responding_units

            .map(

                officer =>

                `• <@${officer.userId}> - **${officer.status}**`

            )

            .join('\n')


        :

        'No officers responding';







    const requestedUnits =

        dispatch.requested_units &&

        dispatch.requested_units.length > 0


        ?


        dispatch.requested_units

            .map(

                unit =>

                `• ${unit}`

            )

            .join('\n')


        :

        'None';








    const statusEmoji = {


        WAITING:
            '🟡',


        RESPOND:
            '🚓',


        EN_ROUTE:
            '🚨',


        ON_SCENE:
            '📍',


        CLEAR:
            '✅',


        CLOSED:
            '🔒'


    };








    return new EmbedBuilder()



        .setColor(

            dispatch.status === 'CLOSED'

            ?

            0x808080

            :

            0x1F6FEB

        )




        .setTitle(

            `🚨 Dispatch #${dispatch.dispatch_number}`

        )





        .setDescription(

            dispatch.situation

            ||

            'No situation details provided.'

        )






        .addFields(



            {


                name:
                    '📍 Location',


                value:

                    dispatch.location

                    ||

                    'Unknown',


                inline:true


            },




            {


                name:
                    '⚠️ Priority',


                value:

                    dispatch.priority

                    ||

                    'LOW',


                inline:true


            },




            {


                name:
                    'Status',


                value:

                    `${

                        statusEmoji[dispatch.status]

                        ||

                        '⚪'

                    }

                    ${

                        dispatch.status

                    }`,


                inline:true


            },





            {


                name:
                    '👮 Requested Units',


                value:

                    requestedUnits,


                inline:false


            },





            {


                name:
                    '🚓 Responding Officers',


                value:

                    respondingOfficers,


                inline:false


            },





            {


                name:
                    '📝 Additional Notes',


                value:

                    dispatch.additional_notes

                    ||

                    'None',


                inline:false


            },





            {


                name:
                    'Created By',


                value:

                    `<@${dispatch.created_by}>`,


                inline:true


            }


        )








        .setFooter({

            text:
                'SAPD Pager Dispatch'

        })







        .setTimestamp(

            new Date(

                dispatch.created_at

            )

        );



};