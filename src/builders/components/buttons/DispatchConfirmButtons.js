const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

class DispatchConfirmButtons {

    create() {

        return new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()

                    .setCustomId(
                        'dispatch:confirm'
                    )

                    .setLabel(
                        'Confirm Dispatch'
                    )

                    .setEmoji('✅')

                    .setStyle(
                        ButtonStyle.Success
                    ),

                new ButtonBuilder()

                    .setCustomId(
                        'dispatch:cancel'
                    )

                    .setLabel(
                        'Cancel'
                    )

                    .setEmoji('❌')

                    .setStyle(
                        ButtonStyle.Secondary
                    )

            );

    }

}

module.exports =
    new DispatchConfirmButtons();