const SettingsRepository =
    require('../repositories/SettingsRepository');


const logger =
    require('../utils/logger');





class DispatchLogService {



    /**
     * Create Dispatch Closure Log
     */
    async createLog(
        client,
        dispatch
    ) {


        try {



            const guild =
                await client.guilds.fetch(
                    dispatch.guild_id
                );



            if (!guild) {

                return;

            }







            const settings =
                SettingsRepository.getSettings(
                    dispatch.guild_id
                );



            if (

                !settings ||

                !settings.evaluation_log_channel_id

            ) {

                return;

            }







            const channel =
                await guild.channels.fetch(

                    settings.evaluation_log_channel_id

                );



            if (!channel) {

                return;

            }








            /*
                Requested Units Format
            */

            const requestedUnits =

                dispatch.requested_units &&

                dispatch.requested_units.length > 0

                ?

                dispatch.requested_units
                    .join(', ')

                :

                'None';









            /*
                Responding Officers Format
            */

            const respondingUnits =


                dispatch.responding_units &&

                dispatch.responding_units.length > 0


                ?


                dispatch.responding_units

                    .map(

                        unit =>

                        `• <@${unit.userId}> - ${unit.status}`

                    )

                    .join('\n')


                :


                'No officers responded';









            await channel.send({



                embeds:[{


                    color:
                        0x1F6FEB,



                    title:
                        `📋 Dispatch #${dispatch.dispatch_number} Closed`,





                    description:

                        'Final dispatch activity report.',






                    fields:[



                        {

                            name:
                            'Location',

                            value:

                            dispatch.location
                            ||

                            'Unknown'

                        },





                        {

                            name:
                            'Situation',

                            value:

                            dispatch.situation
                            ||

                            'Unknown'

                        },





                        {

                            name:
                            'Priority',

                            value:

                            dispatch.priority
                            ||

                            'LOW'

                        },





                        {

                            name:
                            'Requested Units',

                            value:

                            requestedUnits

                        },





                        {

                            name:
                            'Responding Officers',

                            value:

                            respondingUnits

                        },





                        {

                            name:
                            'Closed By',

                            value:

                            `<@${dispatch.created_by}>`

                        },





                        {

                            name:
                            'Final Status',

                            value:

                            dispatch.status

                        }



                    ],






                    footer:{

                        text:
                        'SAPD Pager Dispatch Logs'

                    },




                    timestamp:
                        new Date()



                }]



            });








            logger.info(

                {

                    dispatch:

                        dispatch.dispatch_number

                },

                'Dispatch log created'

            );




        }



        catch(error) {



            logger.error(

                {

                    error:
                        error.message

                },

                'Dispatch logging failed'

            );


        }



    }



}



module.exports =
    new DispatchLogService();