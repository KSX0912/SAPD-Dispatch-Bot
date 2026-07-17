const SettingsRepository =
    require('../repositories/SettingsRepository');

const DispatchRepository =
    require('../repositories/DispatchRepository');

const CountersRepository =
    require('../repositories/CountersRepository');

const buildPanicEmbed =
    require('../builders/embeds/PanicEmbed');

const buildPanicButtons =
    require('../builders/components/buttons/PanicButtons');

const logger =
    require('../utils/logger');



class PanicPublishService {



    /**
     * Publish Panic Alarm
     */
    async publish(
        client,
        panic
    ) {


        let databasePanic = null;


        try {


            /*
                Fetch Guild
            */

            const guild =
                client.guilds.cache.get(
                    panic.guildId
                );


            if (!guild) {

                throw new Error(
                    'Guild not found.'
                );

            }






            /*
                Get Settings
            */

            const settings =
                SettingsRepository.getSettings(
                    panic.guildId
                );


            if (
                !settings ||
                !settings.dispatch_alert_channel_id
            ) {

                throw new Error(
                    'Dispatch alert channel not configured.'
                );

            }






            /*
                Fetch Alert Channel
            */

            const channel =
                await guild.channels.fetch(
                    settings.dispatch_alert_channel_id
                );


            if (!channel) {

                throw new Error(
                    'Dispatch alert channel not found.'
                );

            }






            /*
                Generate Incident Number
            */

            const dispatchNumber =
                CountersRepository.nextDispatchNumber(
                    panic.guildId
                );


            panic.dispatchNumber =
                dispatchNumber;






            /*
                Force Panic Values
            */

            panic.type =
                'PANIC';


            panic.priority =
                'EXTREME';


            panic.status =
                'WAITING';


            panic.requestedUnits = [

                'POLICE',

                'SWAT'

            ];


            panic.respondingUnits = [];






            /*
                Create Database Record
            */

            const result =
                DispatchRepository.create({

                    guildId:
                        panic.guildId,

                    dispatchNumber:
                        panic.dispatchNumber,

                    messageId:
                        null,

                    channelId:
                        channel.id,

                    type:
                        panic.type,

                    priority:
                        panic.priority,

                    location:
                        panic.location,

                    situation:
                        panic.situation,

                    additionalNotes:
                        panic.additionalNotes,

                    requestedUnits:
                        panic.requestedUnits,

                    respondingUnits:
                        panic.respondingUnits,

                    status:
                        panic.status,

                    createdBy:
                        panic.createdBy

                });


            databasePanic =
                DispatchRepository.getById(
                    result.lastInsertRowid
                );
                            /*
                Build Embed
            */

            const embed =
                buildPanicEmbed(
                    databasePanic
                );



            /*
                Build Buttons
            */

            const buttons =
                buildPanicButtons(
                    databasePanic.id
                );





            /*
                Mention Roles
            */

            const mentions = [];


            if (
                settings.police_officer_role_id
            ) {

                mentions.push(
                    `<@&${settings.police_officer_role_id}>`
                );

            }


            if (
                settings.swat_role_id
            ) {

                mentions.push(
                    `<@&${settings.swat_role_id}>`
                );

            }






            /*
                Publish Panic Alarm
            */

            const message =
                await channel.send({

                    content:

                        mentions.join(' '),

                    embeds: [

                        embed

                    ],

                    components: [

                        buttons

                    ]

                });






            /*
                Save Discord Message ID
            */

            DispatchRepository.updateMessage(

                databasePanic.id,

                message.id

            );






            logger.info(

                {

                    guildId:
                        panic.guildId,

                    dispatchNumber:
                        dispatchNumber,

                    messageId:
                        message.id

                },

                'Panic Alarm Published'

            );






            return {

                ...databasePanic,

                messageId:
                    message.id

            };


        }

        catch(error) {


            logger.error(

                {

                    error:
                        error.message,

                    panic

                },

                'Panic Publish Failed'

            );





            /*
                Cleanup Database Record
            */

            if (

                databasePanic &&

                databasePanic.id

            ) {


                DispatchRepository.delete(

                    databasePanic.id

                );


            }


            throw error;


        }


    }


}


module.exports =
    new PanicPublishService();