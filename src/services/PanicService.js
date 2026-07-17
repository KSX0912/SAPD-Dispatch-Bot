const buildPanicModal =
    require('../builders/components/modals/PanicModal');

const PanicPublishService =
    require('./PanicPublishService');

const logger =
    require('../utils/logger');



class PanicService {



    /**
     * Handle Panic Button
     */
    async handleButton(
        interaction
    ) {

        await interaction.showModal(
            buildPanicModal()
        );

    }






    /**
     * Handle Panic Modal Submission
     */
    async handleModal(
        interaction
    ) {

        try {


            const location =
                interaction.fields.getTextInputValue(
                    'location'
                );


            const situation =
                interaction.fields.getTextInputValue(
                    'situation'
                );


            const additionalNotes =
                interaction.fields.getTextInputValue(
                    'additional_notes'
                ) || '';





            /*
                Build Panic Object
            */

            const panic = {

                guildId:
                    interaction.guild.id,

                userId:
                    interaction.user.id,

                createdBy:
                    interaction.user.id,

                type:
                    'PANIC',

                priority:
                    'EXTREME',

                location,

                situation,

                additionalNotes,

                requestedUnits: [

                    'POLICE',

                    'SWAT'

                ],

                status:
                    'WAITING'

            };





            await PanicPublishService.publish(

                interaction.client,

                panic

            );





            logger.info({

                guildId:
                    interaction.guild.id,

                userId:
                    interaction.user.id,

                location

            },
            'Panic alarm created');





            await interaction.reply({

                content:
                    '🚨 Your panic alarm has been activated. Police Officers and SWAT have been notified.',

                ephemeral: true

            });


        }

        catch(error) {


            logger.error({

                error:
                    error.message

            },
            'Panic creation failed');



            if (

                interaction.replied ||

                interaction.deferred

            ) {


                await interaction.followUp({

                    content:
                        '❌ Failed to activate panic alarm.',

                    ephemeral: true

                });

            }

            else {


                await interaction.reply({

                    content:
                        '❌ Failed to activate panic alarm.',

                    ephemeral: true

                });

            }


        }

    }


}



module.exports =
    new PanicService();