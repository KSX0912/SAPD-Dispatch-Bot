const {
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

class DispatchPrioritySelect {

    create() {

        const menu =
            new StringSelectMenuBuilder()

                .setCustomId(
                    'dispatch:priority'
                )

                .setPlaceholder(
                    'Select Dispatch Priority'
                )

                .addOptions(

                    {
                        label: 'Extreme',
                        description: 'Officer in immediate danger',
                        emoji: '🔴',
                        value: 'EXTREME'
                    },

                    {
                        label: 'High',
                        description: 'Immediate police response required',
                        emoji: '🟠',
                        value: 'HIGH'
                    },

                    {
                        label: 'Low',
                        description: 'Routine police response',
                        emoji: '🟡',
                        value: 'LOW'
                    },

                    {
                        label: 'Very Low',
                        description: 'Information / Non-urgent',
                        emoji: '🟢',
                        value: 'VERY_LOW'
                    }

                );

        return new ActionRowBuilder()
            .addComponents(menu);

    }

}

module.exports =
    new DispatchPrioritySelect();