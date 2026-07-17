module.exports = {

    name: 'interactionCreate',

    async execute(interaction) {

        try {

            /*
                Slash Commands
            */
            if (
                interaction.isChatInputCommand()
            ) {

                const command =
                    interaction.client.commands.get(
                        interaction.commandName
                    );

                if (!command) return;

                await command.execute(
                    interaction
                );

                return;

            }

            /*
                Modal Submissions
            */
            if (
                interaction.isModalSubmit()
            ) {

                /*
                    Dispatch Modal
                */
                if (
                    interaction.customId ===
                    'dispatch:create_modal'
                ) {

                    const DispatchService =
                        require('../services/DispatchService');

                    await DispatchService.handleModalSubmit(
                        interaction
                    );

                    return;

                }

                /*
                    Panic Modal
                */
                if (
                    interaction.customId ===
                    'panic:modal'
                ) {

                    const PanicService =
                        require('../services/PanicService');

                    await PanicService.handleModal(
                        interaction
                    );

                    return;

                }

            }

            /*
                Setup Channel Select
            */
            if (
                interaction.isChannelSelectMenu()
            ) {

                const SetupWizardService =
                    require('../services/SetupWizardService');

                await SetupWizardService.handleChannelSelect(
                    interaction
                );

                return;

            }

            /*
                Setup Role Select
            */
            if (
                interaction.isRoleSelectMenu()
            ) {

                const SetupWizardService =
                    require('../services/SetupWizardService');

                await SetupWizardService.handleRoleSelect(
                    interaction
                );

                return;

            }

            /*
                Dispatch Select Menus
            */
            if (
                interaction.isStringSelectMenu()
            ) {

                const DispatchService =
                    require('../services/DispatchService');

                if (

                    interaction.customId ===
                    'dispatch:priority'

                    ||

                    interaction.customId ===
                    'dispatch:units'

                ) {

                    await DispatchService.handleSelectMenu(
                        interaction
                    );

                    return;

                }

            }

            /*
                Buttons
            */
            if (
                interaction.isButton()
            ) {

                /*
                    Dispatch Response Buttons
                    dispatch:respond:15
                    dispatch:enroute:15
                    dispatch:onscene:15
                    dispatch:clear:15
                    dispatch:close:15
                */
                if (
                    interaction.customId.startsWith(
                        'dispatch:'
                    )
                    &&
                    interaction.customId.split(':').length === 3
                ) {

                    const DispatchResponseService =
                        require('../services/DispatchResponseService');

                    await DispatchResponseService.handle(
                        interaction
                    );

                    return;

                }

                /*
                    Panic Response Buttons
                    panic:respond:15
                    panic:enroute:15
                    panic:onscene:15
                    panic:secure:15
                    panic:close:15
                */
                if (
                    interaction.customId.startsWith(
                        'panic:'
                    )
                    &&
                    interaction.customId.split(':').length === 3
                ) {

                    const PanicResponseService =
                        require('../services/PanicResponseService');

                    await PanicResponseService.handle(
                        interaction
                    );

                    return;

                }

                /*
                    Console Create Dispatch Button
                */
                if (
                    interaction.customId ===
                    'dispatch:create'
                ) {

                    const DispatchService =
                        require('../services/DispatchService');

                    await DispatchService.handleCreateButton(
                        interaction
                    );

                    return;

                }

                /*
                    Console Panic Alarm Button
                */
                if (
                    interaction.customId ===
                    'panic:create'
                ) {

                    const PanicService =
                        require('../services/PanicService');

                    await PanicService.handleButton(
                        interaction
                    );

                    return;

                }

            }

        }

        catch(error) {

            console.error(
                'Interaction Error:',
                error
            );

            if (
                interaction.replied ||
                interaction.deferred
            ) {

                await interaction.followUp({

                    content:
                        '❌ An error occurred.',

                    ephemeral:
                        true

                });

            }

            else {

                await interaction.reply({

                    content:
                        '❌ An error occurred.',

                    ephemeral:
                        true

                });

            }

        }

    }

};