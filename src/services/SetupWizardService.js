const ChannelSetup =
    require('../interactions/setup/ChannelSetup');

const RoleSetup =
    require('../interactions/setup/RoleSetup');

const SettingsRepository =
    require('../repositories/SettingsRepository');

const DispatchConsoleService =
    require('./DispatchConsoleService');

class SetupWizardService {


    constructor() {

        this.sessions = new Map();

    }



    /**
     * Start setup wizard
     */
    async start(interaction) {


        const guildId =
            interaction.guild.id;



        this.sessions.set(
            guildId,
            {}
        );



        await interaction.editReply({

            content:
                'SAPD PagerDispatch Setup\n\nSelect the Dispatch Alert Channel:',

            components: [

                ChannelSetup.createDispatchAlertChannelMenu()

            ]

        });


    }





    /**
     * Handle channel selection
     */
    async handleChannelSelect(interaction) {


        const guildId =
            interaction.guild.id;


        const session =
            this.sessions.get(guildId);



        if (!session) {

            return interaction.reply({

                content:
                    '❌ Setup session expired. Run /setup_dispatch again.',

                ephemeral:
                    true

            });

        }




        if (
            interaction.customId ===
            'setup_dispatch_alert_channel'
        ) {


            session.dispatchAlertChannelId =
                interaction.values[0];



            await interaction.update({

                content:
                    'Select Evaluation Log Channel:',


                components: [

                    ChannelSetup.createEvaluationLogChannelMenu()

                ]

            });


            return;

        }





        if (
            interaction.customId ===
            'setup_evaluation_log_channel'
        ) {


            session.evaluationLogChannelId =
                interaction.values[0];



            await interaction.update({

                content:
                    'Select Staff Officers Role:',


                components: [

                    RoleSetup.createStaffRoleMenu()

                ]

            });


        }


    }





    /**
     * Handle role selections
     */
    async handleRoleSelect(interaction) {


        const guildId =
            interaction.guild.id;



        const session =
            this.sessions.get(guildId);



        if (!session) {

            return interaction.reply({

                content:
                    '❌ Setup session expired.',

                ephemeral:
                    true

            });

        }





        const role =
            interaction.values[0];




        switch(interaction.customId) {


            case 'setup_staff_officer_role':

                session.staffOfficerRoleId = role;


                await interaction.update({

                    content:
                        'Select Command Officers Role:',

                    components: [

                        RoleSetup.createCommandRoleMenu()

                    ]

                });

            break;





            case 'setup_command_officer_role':

                session.commandOfficerRoleId = role;


                await interaction.update({

                    content:
                        'Select Supervisor Role:',

                    components: [

                        RoleSetup.createSupervisorRoleMenu()

                    ]

                });

            break;





            case 'setup_supervisor_role':

                session.supervisorRoleId = role;


                await interaction.update({

                    content:
                        'Select Police Officers Role:',

                    components: [

                        RoleSetup.createOfficerRoleMenu()

                    ]

                });

            break;





            case 'setup_police_officer_role':

                session.policeOfficerRoleId = role;


                await interaction.update({

                    content:
                        'Select Detective Role:',

                    components: [

                        RoleSetup.createDetectiveRoleMenu()

                    ]

                });

            break;





            case 'setup_detective_role':

                session.detectiveRoleId = role;


                await interaction.update({

                    content:
                        'Select SWAT Role:',

                    components: [

                        RoleSetup.createSwatRoleMenu()

                    ]

                });

            break;





            case 'setup_swat_role':

                session.swatRoleId = role;


                await interaction.update({

                    content:
                        'Select Traffic Division Role:',

                    components: [

                        RoleSetup.createTrafficRoleMenu()

                    ]

                });

            break;





            case 'setup_traffic_role':

                session.trafficRoleId = role;


                await this.finish(
                    interaction,
                    session
                );

            break;


        }


    }





    /**
     * Save configuration
     */
    async finish(
        interaction,
        session
    ) {


        const guildId =
            interaction.guild.id;




        SettingsRepository.updateDispatchConfiguration(

            guildId,


            session.dispatchAlertChannelId,

            session.evaluationLogChannelId,


            session.staffOfficerRoleId,

            session.commandOfficerRoleId,

            session.supervisorRoleId,


            session.policeOfficerRoleId,

            session.detectiveRoleId,


            session.swatRoleId,

            session.trafficRoleId

        );




        this.sessions.delete(
            guildId
        );




        await interaction.update({

            content:
                '✅ Configuration saved.\n\nCreating Dispatch Console...',

            components: []

        });



        /*
            Create console
        */

        await DispatchConsoleService.createConsole(
            interaction
        );


    }


}


module.exports =
    new SetupWizardService();