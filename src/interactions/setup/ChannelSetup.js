const {
    ActionRowBuilder,
    ChannelSelectMenuBuilder,
    ChannelType
} = require('discord.js');


class ChannelSetup {


    /**
     * Dispatch Alert Channel
     */
    createDispatchAlertChannelMenu() {


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
                )

                .setMinValues(1)

                .setMaxValues(1);



        return new ActionRowBuilder()
            .addComponents(menu);

    }





    /**
     * Evaluation Log Channel
     */
    createEvaluationLogChannelMenu() {


        const menu =
            new ChannelSelectMenuBuilder()

                .setCustomId(
                    'setup_evaluation_log_channel'
                )

                .setPlaceholder(
                    'Select Evaluation Log Channel'
                )

                .setChannelTypes(
                    ChannelType.GuildText
                )

                .setMinValues(1)

                .setMaxValues(1);



        return new ActionRowBuilder()
            .addComponents(menu);

    }


}


module.exports =
    new ChannelSetup();