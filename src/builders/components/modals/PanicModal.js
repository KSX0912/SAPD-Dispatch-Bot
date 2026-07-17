const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require('discord.js');



module.exports = function buildPanicModal() {

    const modal =
        new ModalBuilder()

            .setCustomId(
                'panic:modal'
            )

            .setTitle(
                '🚨 Officer Panic Alarm'
            );



    /*
        Location
    */

    const location =
        new TextInputBuilder()

            .setCustomId(
                'location'
            )

            .setLabel(
                'Current Location'
            )

            .setPlaceholder(
                'Example: Market, Los Santos'
            )

            .setStyle(
                TextInputStyle.Short
            )

            .setRequired(true)

            .setMaxLength(100);




    /*
        Situation
    */

    const situation =
        new TextInputBuilder()

            .setCustomId(
                'situation'
            )

            .setLabel(
                'Describe the Emergency'
            )

            .setPlaceholder(
                'Example: Officer under heavy fire.'
            )

            .setStyle(
                TextInputStyle.Paragraph
            )

            .setRequired(true)

            .setMaxLength(1000);




    /*
        Additional Notes
    */

    const notes =
        new TextInputBuilder()

            .setCustomId(
                'additional_notes'
            )

            .setLabel(
                'Additional Notes (Optional)'
            )

            .setPlaceholder(
                'Example: Two suspects with rifles, requesting immediate backup.'
            )

            .setStyle(
                TextInputStyle.Paragraph
            )

            .setRequired(false)

            .setMaxLength(1000);




    modal.addComponents(

        new ActionRowBuilder().addComponents(
            location
        ),

        new ActionRowBuilder().addComponents(
            situation
        ),

        new ActionRowBuilder().addComponents(
            notes
        )

    );



    return modal;

};