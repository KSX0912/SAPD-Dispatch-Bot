const DispatchRepository =
    require('../repositories/DispatchRepository');


const buildPanicEmbed =
    require('../builders/embeds/PanicEmbed');


const buildPanicButtons =
    require('../builders/components/buttons/PanicButtons');


const PanicLogService =
    require('./PanicLogService');


const logger =
    require('../utils/logger');





class PanicResponseService {



    /**
     * Handle Panic Buttons
     */
    async handle(
        interaction
    ) {


        try {


            const parts =
                interaction.customId.split(':');


            if (
                parts.length !== 3
            ) {

                return;

            }


            const action =
                parts[1];


            const panicId =
                parts[2];




            const panic =
                DispatchRepository.getById(
                    panicId
                );


            if (
                !panic
            ) {

                return interaction.reply({

                    content:
                        '❌ Panic alarm no longer exists.',

                    ephemeral: true

                });

            }






            /*
                Prevent interaction after close
            */

            if (
                panic.status ===
                'CLOSED'
            ) {

                return interaction.reply({

                    content:
                        '🔒 This panic alarm has already been closed.',

                    ephemeral: true

                });

            }






            switch(action) {


                case 'respond':

                    await this.respond(

                        interaction,

                        panic

                    );

                break;





                case 'enroute':

                    await this.updateStatus(

                        interaction,

                        panic,

                        'EN_ROUTE'

                    );

                break;





                case 'onscene':

                    await this.updateStatus(

                        interaction,

                        panic,

                        'ON_SCENE'

                    );

                break;





                case 'secure':

                    await this.updateStatus(

                        interaction,

                        panic,

                        'CLEAR'

                    );

                break;





                case 'close':

                    await this.close(

                        interaction,

                        panic

                    );

                break;

            }


        }

        catch(error) {


            logger.error({

                error:
                    error.message

            },
            'Panic Response Error');


            if (
                !interaction.replied
            ) {

                await interaction.reply({

                    content:
                        '❌ Failed to update panic alarm.',

                    ephemeral: true

                });

            }


        }


    }







    /**
     * Officer Respond
     */
    async respond(
        interaction,
        panic
    ) {


        const respondingUnits =
            panic.responding_units || [];


        const existingOfficer =
            respondingUnits.find(

                officer =>

                    officer.userId ===
                    interaction.user.id

            );



        if (
            existingOfficer
        ) {

            existingOfficer.status =
                'RESPOND';

        }

        else {

            respondingUnits.push({

                userId:
                    interaction.user.id,

                username:
                    interaction.user.username,

                status:
                    'RESPOND'

            });

        }



        DispatchRepository.updateRespondingUnits(

            panic.id,

            respondingUnits

        );



        await this.refreshMessage(

            interaction,

            panic.id

        );



        await interaction.reply({

            content:
                '🚓 You are responding to this panic alarm.',

            ephemeral: true

        });


    }
        /**
     * Update Officer Status
     */
    async updateStatus(
        interaction,
        panic,
        status
    ) {


        const respondingUnits =
            panic.responding_units || [];


        const officer =
            respondingUnits.find(

                unit =>

                    unit.userId ===
                    interaction.user.id

            );



        /*
            Officer hasn't responded yet.
            Automatically add them.
        */

        if (!officer) {

            respondingUnits.push({

                userId:
                    interaction.user.id,

                username:
                    interaction.user.username,

                status

            });

        }

        else {

            officer.status =
                status;

        }



        DispatchRepository.updateRespondingUnits(

            panic.id,

            respondingUnits

        );



        /*
            Update overall panic status
        */

        DispatchRepository.updateStatus(

            panic.id,

            status

        );



        await this.refreshMessage(

            interaction,

            panic.id

        );



        const labels = {

            EN_ROUTE:
                '🚨 You are now En Route.',

            ON_SCENE:
                '📍 You are now On Scene.',

            CLEAR:
                '✅ Situation marked as Secure.'

        };



        await interaction.reply({

            content:

                labels[status] ||

                'Status updated.',

            ephemeral: true

        });


    }









    /**
     * Close Panic Alarm
     */
    async close(
        interaction,
        panic
    ) {


        DispatchRepository.close(

            panic.id

        );



        const closedPanic =
            DispatchRepository.getById(

                panic.id

            );



        /*
            Disable Buttons
        */

        await this.disableButtons(

            interaction,

            closedPanic

        );



        /*
            Create Log
        */

        await PanicLogService.createLog(

            interaction.client,

            closedPanic

        );



        /*
            Refresh Embed
        */

        await this.refreshMessage(

            interaction,

            panic.id,

            true

        );



        await interaction.reply({

            content:
                '🔒 Panic alarm closed.',

            ephemeral: true

        });


    }
        /**
     * Refresh Panic Message
     */
    async refreshMessage(
        interaction,
        panicId,
        closed = false
    ) {

        const panic =
            DispatchRepository.getById(
                panicId
            );

        if (
            !panic ||
            !panic.message_id
        ) {

            return;

        }

        /*
            Fetch Channel

            Don't assume the interaction
            happened inside the
            dispatch-alert channel.
        */

        const channel =
            await interaction.client.channels.fetch(
                panic.channel_id
            );

        if (!channel) {

            return;

        }

        /*
            Fetch Message
        */

        const message =
            await channel.messages.fetch(
                panic.message_id
            );

        /*
            Rebuild Embed
        */

        const embed =
            buildPanicEmbed(
                panic
            );

        /*
            Rebuild Buttons
        */

        const buttons =
            buildPanicButtons(

                panic.id,

                closed

            );

        await message.edit({

            embeds: [

                embed

            ],

            components: [

                buttons

            ]

        });

    }







    /**
     * Disable Buttons
     */
    async disableButtons(
        interaction,
        panic
    ) {

        if (
            !panic.message_id
        ) {

            return;

        }

        const channel =
            await interaction.client.channels.fetch(
                panic.channel_id
            );

        if (!channel) {

            return;

        }

        const message =
            await channel.messages.fetch(
                panic.message_id
            );

        const buttons =
            buildPanicButtons(

                panic.id,

                true

            );

        await message.edit({

            components: [

                buttons

            ]

        });

    }


}


module.exports =
    new PanicResponseService();