const SettingsRepository =
    require('../repositories/SettingsRepository');


const DispatchRepository =
    require('../repositories/DispatchRepository');


const CountersRepository =
    require('../repositories/CountersRepository');


const buildDispatchEmbed =
    require('../builders/embeds/DispatchEmbed');


const buildDispatchButtons =
    require('../builders/components/buttons/DispatchButtons');

const PresenceService =
    require('./PresenceService');
const logger =
    require('../utils/logger');





class DispatchPublishService {



    /**
     * Publish Dispatch To Discord
     */
    async publish(
        client,
        dispatch
    ) {


        let databaseDispatch = null;



        try {


            const guild =
                await client.guilds.fetch(
                    dispatch.guildId
                );



            if (!guild) {

                throw new Error(
                    'Guild not found'
                );

            }







            const settings =
                SettingsRepository.getSettings(
                    dispatch.guildId
                );



            if (

                !settings ||

                !settings.dispatch_alert_channel_id

            ) {

                throw new Error(
                    'Dispatch alert channel not configured'
                );

            }







            const channel =
                await guild.channels.fetch(
                    settings.dispatch_alert_channel_id
                );



            if (

                !channel ||

                !channel.isTextBased()

            ) {


                throw new Error(
                    'Invalid dispatch alert channel'
                );


            }









            /*
                Generate Dispatch Number
            */

            const dispatchNumber =
                CountersRepository.nextDispatchNumber(
                    dispatch.guildId
                );







            const dispatchData = {


                ...dispatch,


                dispatchNumber,


                status:
                    dispatch.status ||
                    'WAITING',



                type:
                    dispatch.type ||
                    'DISPATCH',



                requestedUnits:

                    dispatch.requestedUnits
                    ||
                    [],



                respondingUnits:

                    []

            };









            /*
                Create Database Record
            */

            const result =
                DispatchRepository.create(

                    {

                        ...dispatchData,


                        messageId:
                            null,


                        channelId:
                            channel.id

                    }

                );







            databaseDispatch =
                DispatchRepository.getById(

                    result.lastInsertRowid

                );









            /*
                Build Embed
            */

            const embed =
                buildDispatchEmbed(

                    databaseDispatch

                );







            const buttons =
                buildDispatchButtons(

                    databaseDispatch.id

                );









            /*
                Build Role Mentions
            */

            const roleMentions =
                this.buildRoleMentions(

                    settings,

                    dispatch.requestedUnits

                );









            /*
                Send Dispatch Message
            */

            const message =
                await channel.send({


                    content:

                        roleMentions || null,



                    embeds:[

                        embed

                    ],



                    components:[

                        buttons

                    ],



                    allowedMentions:{


                        roles:

                            dispatch.requestedUnits
                                .map(
                                    role =>
                                    this.getRoleId(
                                        settings,
                                        role
                                    )
                                )
                                .filter(Boolean)


                    }


                });









            /*
                Save Discord Message ID
            */

            DispatchRepository.updateMessage(

                databaseDispatch.id,

                message.id

            );
            await PresenceService.update();









            logger.info(

                {

                    guildId:
                        dispatch.guildId,


                    dispatchNumber,


                    messageId:
                        message.id


                },

                'Dispatch Published'

            );









            return {


                ...databaseDispatch,


                messageId:
                    message.id


            };



        }

        catch(error) {



            logger.error(

                {

                    error:
                        error.message,


                    dispatch

                },

                'Dispatch Publish Failed'

            );







            if (

                databaseDispatch &&

                databaseDispatch.id

            ) {


                DispatchRepository.delete(

                    databaseDispatch.id

                );


            }






            throw error;


        }


    }









    /**
     * Convert Unit Name To Role Mention
     */
    buildRoleMentions(

        settings,

        requestedUnits

    ) {


        if (

            !requestedUnits ||

            requestedUnits.length === 0

        ) {

            return '';

        }





        const mentions = [];




        for (

            const unit of requestedUnits

        ) {


            const roleId =

                this.getRoleId(

                    settings,

                    unit

                );



            if (roleId) {


                mentions.push(

                    `<@&${roleId}>`

                );


            }


        }





        return mentions.join(' ');


    }









    /**
     * Get Role ID From Settings
     */
    getRoleId(

        settings,

        unit

    ) {


        switch(unit) {



            case 'POLICE':

                return settings.police_officer_role_id;





            case 'SUPERVISOR':

                return settings.supervisor_role_id;





            case 'DETECTIVES':

                return settings.detective_role_id;





            case 'SWAT':

                return settings.swat_role_id;





            case 'TRAFFIC':

                return settings.traffic_role_id;





            default:

                return null;


        }


    }



}



module.exports =
    new DispatchPublishService();