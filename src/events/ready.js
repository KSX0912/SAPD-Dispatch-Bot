const logger =
    require('../utils/logger');

const PresenceService =
    require('../services/PresenceService');


module.exports = {

    name: 'clientReady',

    once: true,


    async execute(client) {


        logger.info(
            `Logged in as: ${client.user.tag}`
        );

        logger.info(
            `Connected Guilds: ${client.guilds.cache.size}`
        );

        logger.info(
            `Gateway Ping: ${client.ws.ping}ms`
        );


        /*
            Initialize Presence Service

            Updates the bot status every
            30 seconds and immediately
            when dispatches are created
            or closed.
        */

        PresenceService.initialize(
            client
        );


        logger.info(
            'Presence Service initialized.'
        );


    }


};