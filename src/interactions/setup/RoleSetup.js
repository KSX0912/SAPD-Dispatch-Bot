const {
    ActionRowBuilder,
    RoleSelectMenuBuilder
} = require('discord.js');



class RoleSetup {



    createStaffRoleMenu() {


        const menu =
            new RoleSelectMenuBuilder()

                .setCustomId(
                    'setup_staff_officer_role'
                )

                .setPlaceholder(
                    'Select Staff Officers Role'
                )

                .setMinValues(1)

                .setMaxValues(1);



        return new ActionRowBuilder()
            .addComponents(menu);

    }





    createCommandRoleMenu() {


        const menu =
            new RoleSelectMenuBuilder()

                .setCustomId(
                    'setup_command_officer_role'
                )

                .setPlaceholder(
                    'Select Command Officers Role'
                )

                .setMinValues(1)

                .setMaxValues(1);



        return new ActionRowBuilder()
            .addComponents(menu);

    }





    createSupervisorRoleMenu() {


        const menu =
            new RoleSelectMenuBuilder()

                .setCustomId(
                    'setup_supervisor_role'
                )

                .setPlaceholder(
                    'Select Police Supervisors Role'
                )

                .setMinValues(1)

                .setMaxValues(1);



        return new ActionRowBuilder()
            .addComponents(menu);

    }





    createOfficerRoleMenu() {


        const menu =
            new RoleSelectMenuBuilder()

                .setCustomId(
                    'setup_police_officer_role'
                )

                .setPlaceholder(
                    'Select Police Officers Role'
                )

                .setMinValues(1)

                .setMaxValues(1);



        return new ActionRowBuilder()
            .addComponents(menu);

    }





    createDetectiveRoleMenu() {


        const menu =
            new RoleSelectMenuBuilder()

                .setCustomId(
                    'setup_detective_role'
                )

                .setPlaceholder(
                    'Select Detectives Role'
                )

                .setMinValues(1)

                .setMaxValues(1);



        return new ActionRowBuilder()
            .addComponents(menu);

    }





    createSwatRoleMenu() {


        const menu =
            new RoleSelectMenuBuilder()

                .setCustomId(
                    'setup_swat_role'
                )

                .setPlaceholder(
                    'Select SWAT Division Role'
                )

                .setMinValues(1)

                .setMaxValues(1);



        return new ActionRowBuilder()
            .addComponents(menu);

    }





    createTrafficRoleMenu() {


    const menu =
        new RoleSelectMenuBuilder()

            .setCustomId(
                'setup_traffic_role'
            )

            .setPlaceholder(
                'Select Traffic Division Role'
            )

            .setMinValues(1)

            .setMaxValues(1);



    return new ActionRowBuilder()
        .addComponents(menu);

}



}



module.exports =
    new RoleSetup();