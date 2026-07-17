const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ChannelSelectMenuBuilder,
    ChannelType
} = require('discord.js');


class SetupWizard {


    createChannelMenu() {


        const menu =
            new ChannelSelectMenuBuilder()

                .setCustomId(
                    'setup_dispatch_alert_channel'
                )

                .setPlaceholder(
                    'Select Dispatch Alert Channel'
                )

                .setChannelTypes(
                    ChannelType.GuildText
                );



        return new ActionRowBuilder()
            .addComponents(menu);

    }



    createEvaluationChannelMenu() {


        const menu =
            new ChannelSelectMenuBuilder()

                .setCustomId(
                    'setup_evaluation_channel'
                )

                .setPlaceholder(
                    'Select Evaluation Log Channel'
                )

                .setChannelTypes(
                    ChannelType.GuildText
                );



        return new ActionRowBuilder()
            .addComponents(menu);

    }


}


module.exports =
    new SetupWizard();