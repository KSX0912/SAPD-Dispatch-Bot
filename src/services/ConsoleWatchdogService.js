const cron = require('node-cron');

const SettingsRepository =
    require('../repositories/SettingsRepository');

const logger =
    require('../utils/logger');


class ConsoleWatchdogService {


    start(client) {


        logger.info(
            'Console Watchdog started (1 minute interval)'
        );


        cron.schedule('* * * * *', async () => {

            try {

                await this.checkConsoles(client);

            } catch (error) {

                logger.error(
                    {
                        error: error.message
                    },
                    'Console Watchdog failed'
                );

            }

        });


    }




    async checkConsoles(client) {


        const consoles =
            SettingsRepository.getAllConsoles();



        logger.info(
            `Watchdog checking ${consoles.length} console(s)`
        );



        for (const consoleData of consoles) {


            try {


                logger.info(
                    {
                        guildId:
                            consoleData.guild_id,

                        channelId:
                            consoleData.console_channel_id,

                        messageId:
                            consoleData.console_message_id
                    },

                    'Checking stored console'
                );



                const guild =
                    await client.guilds.fetch(
                        consoleData.guild_id
                    );



                const channel =
                    await guild.channels.fetch(
                        consoleData.console_channel_id
                    );



                if (!channel) {

                    throw new Error(
                        'Console channel missing'
                    );

                }



                logger.info(
                    {
                        channel:
                            channel.name
                    },

                    'Console channel found'
                );



                const message =
                    await channel.messages.fetch(
                        consoleData.console_message_id,
                        {
                            force: true
                        }
                    );



                logger.info(
                    {
                        storedMessageId:
                            consoleData.console_message_id,

                        fetchedMessageId:
                            message?.id,

                        author:
                            message?.author?.tag,

                        deleted:
                            message?.deleted

                    },

                    'Message fetch result'
                );



                if (!message) {

                    throw new Error(
                        'Console message missing'
                    );

                }



                logger.debug(
                    {
                        guild:
                            guild.name,

                        messageId:
                            message.id
                    },

                    'Console verified'
                );



            } catch(error) {



                logger.warn(
                    {
                        guildId:
                            consoleData.guild_id,

                        messageId:
                            consoleData.console_message_id,

                        error:
                            error.message
                    },

                    'Broken dispatch console detected'
                );



                const result =
                    SettingsRepository.clearConsole(
                        consoleData.guild_id
                    );



                logger.info(
                    {
                        guildId:
                            consoleData.guild_id,

                        changes:
                            result.changes
                    },

                    'Console database cleared'
                );


            }


        }


    }


}


module.exports = new ConsoleWatchdogService();