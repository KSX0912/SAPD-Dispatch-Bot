const {
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

const SettingsRepository =
    require('../../../repositories/SettingsRepository');

class DispatchUnitsSelect {

    create(guildId) {

        const settings =
            SettingsRepository.getDispatchConfiguration(
                guildId
            );

        const options = [];



        if (settings.police_officer_role_id) {

            options.push({

                label: 'Police Officers',

                description:
                    'Notify all Police Officers',

                emoji: '👮',

                value:
                    settings.police_officer_role_id

            });

        }



        if (settings.detective_role_id) {

            options.push({

                label: 'Detectives',

                description:
                    'Notify Detectives',

                emoji: '🕵️',

                value:
                    settings.detective_role_id

            });

        }



        if (settings.supervisor_role_id) {

            options.push({

                label: 'Supervisors',

                description:
                    'Notify Supervisors',

                emoji: '⭐',

                value:
                    settings.supervisor_role_id

            });

        }



        if (settings.swat_role_id) {

            options.push({

                label: 'SWAT',

                description:
                    'Notify SWAT Division',

                emoji: '🛡️',

                value:
                    settings.swat_role_id

            });

        }



        if (settings.traffic_role_id) {

            options.push({

                label: 'Traffic Division',

                description:
                    'Notify Traffic Division',

                emoji: '🚓',

                value:
                    settings.traffic_role_id

            });

        }



        if (settings.command_officer_role_id) {

            options.push({

                label: 'Command Officers',

                description:
                    'Notify Command Officers',

                emoji: '🎖️',

                value:
                    settings.command_officer_role_id

            });

        }



        if (settings.staff_officer_role_id) {

            options.push({

                label: 'Staff Officers',

                description:
                    'Notify Staff Officers',

                emoji: '📋',

                value:
                    settings.staff_officer_role_id

            });

        }



        const menu =
            new StringSelectMenuBuilder()

                .setCustomId(
                    'dispatch:units'
                )

                .setPlaceholder(
                    'Select Requested Units'
                )

                .setMinValues(1)

                .setMaxValues(options.length)

                .addOptions(options);



        return new ActionRowBuilder()

            .addComponents(menu);

    }

}

module.exports =
    new DispatchUnitsSelect();