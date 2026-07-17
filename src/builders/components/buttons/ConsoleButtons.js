const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = function buildConsoleButtons() {

    return new ActionRowBuilder().addComponents(

        new ButtonBuilder()
            .setCustomId('dispatch:create')
            .setLabel('Create Dispatch')
            .setEmoji('🚨')
            .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
            .setCustomId('panic:create')
            .setLabel('Panic Alarm')
            .setEmoji('🚨')
            .setStyle(ButtonStyle.Secondary)
    );

}