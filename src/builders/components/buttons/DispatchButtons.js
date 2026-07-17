const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = function buildDispatchButtons(
    dispatchId,
    disabled = false
) {

    if (!dispatchId) {

        throw new Error(
            'Dispatch ID is required for dispatch buttons.'
        );

    }

    return new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId(
                    `dispatch:respond:${dispatchId}`
                )

                .setLabel('Respond')

                .setEmoji('🚓')

                .setStyle(
                    ButtonStyle.Primary
                )

                .setDisabled(disabled),



            new ButtonBuilder()

                .setCustomId(
                    `dispatch:enroute:${dispatchId}`
                )

                .setLabel('En Route')

                .setEmoji('🚨')

                .setStyle(
                    ButtonStyle.Secondary
                )

                .setDisabled(disabled),



            new ButtonBuilder()

                .setCustomId(
                    `dispatch:onscene:${dispatchId}`
                )

                .setLabel('On Scene')

                .setEmoji('📍')

                .setStyle(
                    ButtonStyle.Success
                )

                .setDisabled(disabled),



            new ButtonBuilder()

                .setCustomId(
                    `dispatch:clear:${dispatchId}`
                )

                .setLabel('Clear')

                .setEmoji('✅')

                .setStyle(
                    ButtonStyle.Danger
                )

                .setDisabled(disabled),



            new ButtonBuilder()

                .setCustomId(
                    `dispatch:close:${dispatchId}`
                )

                .setLabel('Close')

                .setEmoji('🔒')

                .setStyle(
                    ButtonStyle.Secondary
                )

                .setDisabled(disabled)

        );

};