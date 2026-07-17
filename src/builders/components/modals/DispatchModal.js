const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require('discord.js');

class DispatchModal {

    create() {

        const modal =
            new ModalBuilder()

                .setCustomId(
                    'dispatch_create_modal'
                )

                .setTitle(
                    'Create Dispatch'
                );



        const priority =
            new TextInputBuilder()

                .setCustomId(
                    'priority'
                )

                .setLabel(
                    'Priority (Extreme / High / Low / Very Low)'
                )

                .setPlaceholder(
                    'Example: High'
                )

                .setStyle(
                    TextInputStyle.Short
                )

                .setRequired(true);



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

                .setRequired(true);



        const situation =
            new TextInputBuilder()

                .setCustomId(
                    'situation'
                )

                .setLabel(
                    'Situation'
                )

                .setPlaceholder(
                    'Describe the situation...'
                )

                .setStyle(
                    TextInputStyle.Paragraph
                )

                .setRequired(true);



        const requestedUnits =
            new TextInputBuilder()

                .setCustomId(
                    'requested_units'
                )

                .setLabel(
                    'Requested Units'
                )

                .setPlaceholder(
                    'Police Officers, Detectives, SWAT'
                )

                .setStyle(
                    TextInputStyle.Short
                )

                .setRequired(true);



        const notes =
            new TextInputBuilder()

                .setCustomId(
                    'notes'
                )

                .setLabel(
                    'Additional Notes (Optional)'
                )

                .setStyle(
                    TextInputStyle.Paragraph
                )

                .setRequired(false);



        modal.addComponents(

            new ActionRowBuilder().addComponents(priority),

            new ActionRowBuilder().addComponents(location),

            new ActionRowBuilder().addComponents(situation),

            new ActionRowBuilder().addComponents(requestedUnits),

            new ActionRowBuilder().addComponents(notes)

        );



        return modal;

    }

}

module.exports = new DispatchModal();