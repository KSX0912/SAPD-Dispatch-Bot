const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');


const DispatchSessionService =
    require('./DispatchSessionService');


const DispatchPublishService =
    require('./DispatchPublishService');



class DispatchService {



    /**
     * Create Dispatch Button
     */
    async handleCreateButton(
        interaction
    ) {


        const modal =
            new ModalBuilder()

                .setCustomId(
                    'dispatch:create_modal'
                )

                .setTitle(
                    'Create Dispatch'
                );




        const location =
    new TextInputBuilder()

        .setCustomId(
            'location'
        )

        .setLabel(
            'Location'
        )

        .setPlaceholder(
            'Example: Market, Los Santos'
        )

        .setStyle(
            TextInputStyle.Short
        )

        .setMinLength(
            3
        )

        .setMaxLength(
            100
        )

        .setRequired(
            true
        );




        const situation =
    new TextInputBuilder()

        .setCustomId(
            'situation'
        )

        .setLabel(
            'Situation'
        )

        .setPlaceholder(
            'Example: Armed robbery in progress. Two suspects fleeing north.'
        )

        .setStyle(
            TextInputStyle.Paragraph
        )

        .setMinLength(
            10
        )

        .setMaxLength(
            1000
        )

        .setRequired(
            true
        );




        const notes =
    new TextInputBuilder()

        .setCustomId(
            'notes'
        )

        .setLabel(
            'Additional Notes'
        )

        .setPlaceholder(
            'Suspect description, vehicle, injuries, weapons, or any other relevant information.'
        )

        .setStyle(
            TextInputStyle.Paragraph
        )

        .setMaxLength(
            1000
        )

        .setRequired(
            false
        );




        modal.addComponents(

            new ActionRowBuilder()
                .addComponents(location),


            new ActionRowBuilder()
                .addComponents(situation),


            new ActionRowBuilder()
                .addComponents(notes)

        );



        await interaction.showModal(
            modal
        );


    }









    /**
     * Modal Submit
     */
    async handleModalSubmit(
        interaction
    ) {


        const location =
            interaction.fields.getTextInputValue(
                'location'
            );


        const situation =
            interaction.fields.getTextInputValue(
                'situation'
            );


        let notes = null;


        try {

            notes =
                interaction.fields.getTextInputValue(
                    'notes'
                );

        }
        catch {

            notes = null;

        }






        /*
            Create session
        */

        DispatchSessionService.create(

            interaction.guild.id,

            interaction.user.id,

            {

                location,

                situation,

                additionalNotes:
                    notes

            }

        );







        await interaction.reply({

            content:
                'Select Dispatch Priority:',

            components:[

                this.createPriorityMenu()

            ],

            ephemeral:true

        });


    }









    /**
     * Handle Select Menus
     */
    async handleSelectMenu(
        interaction
    ) {


        const guildId =
            interaction.guild.id;


        const userId =
            interaction.user.id;



        const session =
            DispatchSessionService.get(

                guildId,

                userId

            );



        if (!session) {


            return interaction.reply({

                content:
                    '❌ Dispatch session expired.',

                ephemeral:true

            });


        }






        /*
            Priority Selection
        */

        if (

            interaction.customId ===

            'dispatch:priority'

        ) {



            DispatchSessionService.update(

                guildId,

                userId,

                {

                    priority:
                        interaction.values[0]

                }

            );




            return interaction.update({

                content:
                    'Select Requested Units:',


                components:[

                    this.createUnitsMenu()

                ]

            });



        }








        /*
            Requested Units
        */

        if (

            interaction.customId ===

            'dispatch:units'

        ) {



            DispatchSessionService.update(

                guildId,

                userId,

                {

                    requestedUnits:
                        interaction.values

                }

            );





            const dispatchSession =
                DispatchSessionService.get(

                    guildId,

                    userId

                );






            const dispatch =
                await DispatchPublishService.publish(

                    interaction.client,

                    dispatchSession

                );







            DispatchSessionService.delete(

                guildId,

                userId

            );






            return interaction.update({

                content:

                    `✅ Dispatch #${dispatch.dispatch_number} created successfully.`,


                components:[]

            });



        }



    }









    /**
     * Priority Menu
     */
    createPriorityMenu() {


        const menu =
            new StringSelectMenuBuilder()

                .setCustomId(
                    'dispatch:priority'
                )

                .setPlaceholder(
                    'Select Priority'
                )

                .addOptions(

                    {

                        label:
                            'Extreme',

                        value:
                            'EXTREME',

                        emoji:
                            '🔴'

                    },


                    {

                        label:
                            'High',

                        value:
                            'HIGH',

                        emoji:
                            '🟠'

                    },


                    {

                        label:
                            'Low',

                        value:
                            'LOW',

                        emoji:
                            '🟡'

                    },


                    {

                        label:
                            'Very Low',

                        value:
                            'VERY_LOW',

                        emoji:
                            '🟢'

                    }

                );



        return new ActionRowBuilder()

            .addComponents(menu);


    }









    /**
     * Requested Units Menu
     */
    createUnitsMenu() {


        const menu =
            new StringSelectMenuBuilder()

                .setCustomId(
                    'dispatch:units'
                )

                .setPlaceholder(
                    'Select Requested Units'
                )

                .setMinValues(
                    1
                )

                .setMaxValues(
                    5
                )

                .addOptions(

                    {

                        label:
                            'Police Officers',

                        value:
                            'POLICE'

                    },


                    {

                        label:
                            'Supervisors',

                        value:
                            'SUPERVISOR'

                    },


                    {

                        label:
                            'Detectives',

                        value:
                            'DETECTIVES'

                    },


                    {

                        label:
                            'SWAT',

                        value:
                            'SWAT'

                    },


                    {

                        label:
                            'Traffic Division',

                        value:
                            'TRAFFIC'

                    }

                );



        return new ActionRowBuilder()

            .addComponents(menu);


    }


}



module.exports =
    new DispatchService();