const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType
} = require('discord.js');


const SetupService =
    require('../../services/SetupService');



module.exports = {


    data: new SlashCommandBuilder()

        .setName('setup_dispatch')

        .setDescription(
            'Configure SAPD PagerDispatch system.'
        )


        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        )



        .addBooleanOption(option =>

            option

                .setName('reset')

                .setDescription(
                    'Reset and recreate dispatch console.'
                )

                .setRequired(false)

        ),



    async execute(interaction) {


        const reset =
            interaction.options.getBoolean(
                'reset'
            ) || false;



        /*
            Defer because setup will have
            database + Discord operations
        */

        await interaction.deferReply({
            ephemeral: true
        });



        await SetupService.execute(

            interaction,

            {
                reset
            }

        );


    }

};