const SettingsRepository =
    require('../repositories/SettingsRepository');

const buildConsoleEmbed =
    require('../builders/embeds/ConsoleEmbed');

const buildConsoleButtons =
    require('../builders/components/buttons/ConsoleButtons');

const logger =
    require('../utils/logger');

class DispatchConsoleService {

    async createConsole(interaction) {

        const guildId =
            interaction.guild.id;

        try {

            const settings =
                SettingsRepository.getSettings(
                    guildId
                );

            const embed =
                buildConsoleEmbed({

                    departmentName:
                        settings.department_name,

                    departmentLogo:
                        settings.department_logo,

                    footer:
                        settings.footer_text,

                    embedColor:
                        settings.embed_color

                });

            const buttons =
                buildConsoleButtons();

            const message =
                await interaction.channel.send({

                    embeds: [embed],

                    components: [buttons]

                });

            SettingsRepository.updateConsole(

                guildId,

                interaction.channel.id,

                message.id

            );

            logger.info(
                {
                    guildId,
                    messageId: message.id
                },
                'Dispatch console created'
            );

            if (interaction.deferred || interaction.replied) {

                return interaction.editReply({

                    content:
                        '✅ Dispatch Console created successfully.'

                });

            }

            return interaction.reply({

                content:
                    '✅ Dispatch Console created successfully.',

                flags: 64

            });

        } catch (error) {

            logger.error(
                {
                    error: error.message
                },
                'Dispatch Console Creation Failed'
            );

            throw error;

        }

    }

}

module.exports =
    new DispatchConsoleService();