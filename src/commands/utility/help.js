const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');


module.exports = {

    data: new SlashCommandBuilder()

        .setName('help')

        .setDescription(
            'Shows all available SAPD PagerDispatch commands.'
        ),



    async execute(interaction) {


        const commands =
            interaction.client.commands;



        const categories = {};



        commands.forEach(command => {


            const category =
                command.category || 'General';



            if (!categories[category]) {

                categories[category] = [];

            }



            categories[category].push(
                `\`/${command.data.name}\` - ${command.data.description}`
            );


        });



        const embed =
            new EmbedBuilder()

                .setTitle(
                    'SAPD PagerDispatch Commands'
                )

                .setDescription(
                    'Available slash commands'
                )

                .setColor(
                    '#1F6FEB'
                )

                .setTimestamp();



        for (
            const category in categories
        ) {


            embed.addFields({

                name:
                    category,

                value:
                    categories[category].join('\n') ||
                    'No commands'

            });


        }



        await interaction.reply({

            embeds: [
                embed
            ],

            ephemeral:
                true

        });


    }

};