const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = function buildPanicButtons(
    panicId,
    disabled = false
) {

    return new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId(
                    `panic:respond:${panicId}`
                )

                .setLabel(
                    'Respond'
                )

                .setEmoji('🚓')

                .setStyle(
                    ButtonStyle.Primary
                )

                .setDisabled(
                    disabled
                ),

            new ButtonBuilder()

                .setCustomId(
                    `panic:enroute:${panicId}`
                )

                .setLabel(
                    'En Route'
                )

                .setEmoji('🚨')

                .setStyle(
                    ButtonStyle.Secondary
                )

                .setDisabled(
                    disabled
                ),

            new ButtonBuilder()

                .setCustomId(
                    `panic:onscene:${panicId}`
                )

                .setLabel(
                    'On Scene'
                )

                .setEmoji('📍')

                .setStyle(
                    ButtonStyle.Success
                )

                .setDisabled(
                    disabled
                ),

            new ButtonBuilder()

                .setCustomId(
                    `panic:secure:${panicId}`
                )

                .setLabel(
                    'Situation Secure'
                )

                .setEmoji('✅')

                .setStyle(
                    ButtonStyle.Success
                )

                .setDisabled(
                    disabled
                ),

            new ButtonBuilder()

                .setCustomId(
                    `panic:close:${panicId}`
                )

                .setLabel(
                    'Close Panic'
                )

                .setEmoji('🔒')

                .setStyle(
                    ButtonStyle.Danger
                )

                .setDisabled(
                    disabled
                )

        );

};