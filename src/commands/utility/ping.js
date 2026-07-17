const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

const { performance } = require('node:perf_hooks');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Displays the bot latency and connection status.'),

    async execute(interaction) {
    await interaction.reply({
        content: '🏓 Measuring latency...'
    });

    const reply = await interaction.fetchReply();

    const roundTrip =
        reply.createdTimestamp -
        interaction.createdTimestamp;

    const gateway =
        interaction.client.ws.ping;

    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('🏓 Pong!')
        .addFields(
            {
                name: 'Gateway Latency',
                value: gateway >= 0
                    ? `${gateway} ms`
                    : 'Unavailable',
                inline: true
            },
            {
                name: 'Roundtrip Latency',
                value: `${roundTrip} ms`,
                inline: true
            },
            {
                name: 'Status',
                value: '🟢 Operational',
                inline: true
            }
        )
        .setTimestamp();

    await interaction.editReply({
        content: '',
        embeds: [embed]
    });
}
};