const {
    EmbedBuilder
} = require('discord.js');

module.exports = function buildConsoleEmbed(settings = {}) {

    return new EmbedBuilder()
        .setColor(settings.embedColor ?? 0x1F6FEB)

        .setAuthor({
            name: settings.departmentName ?? 'San Andreas Police Department',
            iconURL: settings.departmentLogo || null
        })

        .setTitle('🚔 SAPD Dispatch Console')

        .setDescription([
            'Welcome to the **SAPD Dispatch Console**.',
            '',
            'Use the buttons below to quickly create a dispatch or activate a panic alarm.',
            '',
            '**Available Actions**',
            '• 🚨 Create Dispatch',
            '• 🚨 Panic Alarm'
        ].join('\n'))

        .setFooter({
            text: settings.footer ?? 'SAPD Pager Dispatch'
        })

        .setTimestamp();
};