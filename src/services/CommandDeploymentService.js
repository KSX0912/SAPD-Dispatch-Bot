const {
    REST,
    Routes
} = require('discord.js');

const fs = require('fs');
const path = require('path');

const env =
    require('../config/env');

const logger =
    require('../utils/logger');


class CommandDeploymentService {


    constructor() {

        this.commands = [];

    }



    loadCommands() {


        this.commands = [];


        const commandsPath =
            path.join(
                __dirname,
                '../commands'
            );


        this.walk(commandsPath);


        return this.commands;

    }



    walk(directory) {


        const files =
            fs.readdirSync(directory);


        for (const file of files) {


            const filePath =
                path.join(
                    directory,
                    file
                );


            if (
                fs.statSync(filePath).isDirectory()
            ) {


                this.walk(filePath);


            }
            else if (
                file.endsWith('.js')
            ) {


                const command =
                    require(filePath);



                if(command.data) {


                    this.commands.push(
                        command.data.toJSON()
                    );


                }


            }

        }


    }




    async deploy() {


        this.loadCommands();



        const rest =
            new REST({
                version: '10'
            })
            .setToken(
                env.TOKEN
            );



        try {


            logger.info(
                `Deploying ${this.commands.length} slash commands...`
            );



            await rest.put(

                Routes.applicationGuildCommands(

                    env.CLIENT_ID,

                    env.GUILD_ID

                ),

                {
                    body:
                        this.commands
                }

            );



            logger.info(
                'Slash commands deployed successfully.'
            );


        } catch(error) {


            logger.error(
                error,
                'Command deployment failed'
            );


        }


    }


}


module.exports =
    new CommandDeploymentService();