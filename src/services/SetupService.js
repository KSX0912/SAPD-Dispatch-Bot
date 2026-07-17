const SettingsRepository =
    require('../repositories/SettingsRepository');

const SetupWizardService =
    require('./SetupWizardService');

const DispatchConsoleService =
    require('./DispatchConsoleService');

const logger =
    require('../utils/logger');

class SetupService {

    async execute(
        interaction,
        options = {}
    ) {

        const guildId =
            interaction.guild.id;

        const {
            reset = false
        } = options;

        try {

            SettingsRepository.createGuild(
                guildId
            );

            /*
                Reset console only
            */

            if (reset) {

                SettingsRepository.clearConsole(
                    guildId
                );

                logger.info(
                    { guildId },
                    'Dispatch console reset'
                );

                return await DispatchConsoleService.createConsole(
                    interaction
                );

            }

            /*
                Existing console?
            */

            const existing =
                SettingsRepository.getConsole(
                    guildId
                );

            if (

                existing &&
                existing.console_channel_id &&
                existing.console_message_id

            ) {

                return interaction.editReply({

                    content:
                        '❌ Dispatch Console already exists.\nUse `/setup_dispatch reset:true` to recreate.'

                });

            }

            /*
                Launch setup wizard
            */

            return await SetupWizardService.start(
                interaction
            );

        } catch (error) {

            logger.error(
                {
                    error: error.message
                },
                'Setup Service Error'
            );

            if (
                interaction.deferred ||
                interaction.replied
            ) {

                return interaction.editReply({

                    content:
                        '❌ Setup failed.'

                });

            }

            return interaction.reply({

                content:
                    '❌ Setup failed.',

                flags: 64

            });

        }

    }

}

module.exports =
    new SetupService();