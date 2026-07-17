const DispatchRepository =
    require('../repositories/DispatchRepository');


const buildDispatchEmbed =
    require('../builders/embeds/DispatchEmbed');


const buildDispatchButtons =
    require('../builders/components/buttons/DispatchButtons');


const DispatchLogService =
    require('./DispatchLogService');

const PresenceService =
    require('./PresenceService');

const logger =
    require('../utils/logger');





class DispatchResponseService {



    /**
     * Handle Dispatch Button Actions
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


            const dispatchId =
                Number(parts[2]);


            const dispatch =
                DispatchRepository.getById(
                    dispatchId
                );


            if (!dispatch) {

                return interaction.reply({

                    content:
                        '❌ Dispatch no longer exists.',

                    ephemeral: true

                });

            }




            /*
                Prevent actions on closed dispatches
            */

            if (

                dispatch.status ===
                'CLOSED'

            ) {

                return interaction.reply({

                    content:
                        '🔒 This dispatch is already closed.',

                    ephemeral: true

                });

            }




            switch (action) {


                case 'respond':

                    await this.respond(

                        interaction,

                        dispatch

                    );

                break;



                case 'enroute':

                    await this.updateStatus(

                        interaction,

                        dispatch,

                        'EN_ROUTE'

                    );

                break;



                case 'onscene':

                    await this.updateStatus(

                        interaction,

                        dispatch,

                        'ON_SCENE'

                    );

                break;



                case 'clear':

                    await this.updateStatus(

                        interaction,

                        dispatch,

                        'CLEAR'

                    );

                break;



                case 'close':

                    await this.close(

                        interaction,

                        dispatch

                    );

                break;

            }


        }

        catch (error) {


            logger.error({

                error:
                    error.message,

                stack:
                    error.stack

            },
            'Dispatch Response Error');


            if (

                !interaction.replied &&

                !interaction.deferred

            ) {

                await interaction.reply({

                    content:
                        '❌ Failed to update dispatch.',

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
        dispatch
    ) {


        const respondingUnits =

            [...(dispatch.responding_units || [])];



        const officer =

            respondingUnits.find(

                unit =>

                    unit.userId ===
                    interaction.user.id

            );



        if (!officer) {


            respondingUnits.push({

                userId:
                    interaction.user.id,

                username:
                    interaction.user.username,

                status:
                    'RESPOND'

            });


        }

        else {


            officer.status =
                'RESPOND';

        }



        DispatchRepository.updateRespondingUnits(

            dispatch.id,

            respondingUnits

        );



        await this.refreshMessage(

            interaction,

            dispatch.id

        );



        await interaction.reply({

            content:
                '🚓 You are now responding to this dispatch.',

            ephemeral: true

        });


    }







    /**
     * Update Officer Status
     */
    async updateOfficerStatus(

        dispatch,

        user,

        status

    ) {


        const respondingUnits =

            [...(dispatch.responding_units || [])];



        const officer =

            respondingUnits.find(

                unit =>

                    unit.userId ===
                    user.id

            );



        if (!officer) {


            respondingUnits.push({

                userId:
                    user.id,

                username:
                    user.username,

                status

            });

        }

        else {


            officer.status =
                status;

        }



        DispatchRepository.updateRespondingUnits(

            dispatch.id,

            respondingUnits

        );


    }
        /**
     * Update Dispatch Status
     */
    async updateStatus(

        interaction,

        dispatch,

        status

    ) {


        /*
            Update Dispatch Status
        */

        DispatchRepository.updateStatus(

            dispatch.id,

            status

        );



        /*
            Update Officer Status
        */

        await this.updateOfficerStatus(

            dispatch,

            interaction.user,

            status

        );



        /*
            Refresh Dispatch Message
        */

        await this.refreshMessage(

            interaction,

            dispatch.id

        );



        await interaction.reply({

            content:
                `✅ Dispatch updated to ${status}.`,

            ephemeral: true

        });


    }







    /**
     * Close Dispatch
     */
    async close(

        interaction,

        dispatch

    ) {


        /*
            Close Database Record
        */

        DispatchRepository.close(

            dispatch.id

        );
        await PresenceService.update();



        /*
            Reload Updated Dispatch
        */

        const closedDispatch =

            DispatchRepository.getById(

                dispatch.id

            );



        /*
            Refresh Discord Message

            Buttons will automatically
            become disabled because
            dispatch.status == CLOSED.
        */

        await this.refreshMessage(

            interaction,

            dispatch.id

        );



        /*
            Create Dispatch Log
        */

        await DispatchLogService.createLog(

            interaction.client,

            closedDispatch

        );



        logger.info({

            dispatchNumber:
                closedDispatch.dispatch_number,

            closedBy:
                interaction.user.id

        },
        'Dispatch Closed');



        await interaction.reply({

            content:
                '🔒 Dispatch closed successfully.',

            ephemeral: true

        });


    }
        /**
     * Refresh Dispatch Message
     */
    async refreshMessage(

        interaction,

        dispatchId

    ) {


        /*
            Reload Latest Dispatch
        */

        const dispatch =

            DispatchRepository.getById(

                dispatchId

            );


        if (

            !dispatch ||

            !dispatch.message_id ||

            !dispatch.channel_id

        ) {

            return;

        }



        /*
            Fetch Channel

            Don't rely on the interaction
            channel. Always use the stored
            dispatch channel.
        */

        const channel =

            await interaction.client.channels.fetch(

                dispatch.channel_id

            );


        if (!channel) {

            return;

        }



        /*
            Fetch Dispatch Message
        */

        const message =

            await channel.messages.fetch(

                dispatch.message_id

            );



        /*
            Build Updated Embed
        */

        const embed =

            buildDispatchEmbed(

                dispatch

            );



        /*
            Disable Buttons Automatically
            when dispatch is CLOSED.
        */

        const buttons =

            buildDispatchButtons(

                dispatch.id,

                dispatch.status === 'CLOSED'

            );



        /*
            Update Discord Message
        */

        await message.edit({

            embeds: [

                embed

            ],

            components: [

                buttons

            ]

        });


    }


}


module.exports =
    new DispatchResponseService();