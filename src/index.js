const client = require('./client');
const env = require('./config/env');
const logger = require('./utils/logger');

//Database
const { runMigrations } = require('./database/migrations');

// Handlers
const { loadEvents } = require('./handlers/eventHandler');
const { loadCommands } = require('./handlers/commandHandler');
//Services
const ConsoleWatchdogService = require('./services/ConsoleWatchdogService');
const CommandDeploymentService = require('./services/CommandDeploymentService');

async function start() {
    try {
        logger.info('========================================');
        logger.info('Starting SAPD PagerDispatch Bot...');
        logger.info('========================================');
        await runMigrations();
        // Load Framework
        client.loadStats.events = await loadEvents(client);
        client.loadStats.commands = await loadCommands(client);
        await CommandDeploymentService.deploy();
        // Login
        await client.login(env.TOKEN);
        //Check Message
        ConsoleWatchdogService.start(client);

    } catch (error) {
        logger.fatal(error);
        process.exit(1);
    }
}

// Global Error Handlers
process.on('unhandledRejection', (error) => {
    logger.error('Unhandled Promise Rejection');
    logger.error(error);
});

process.on('uncaughtException', (error) => {
    logger.fatal('Uncaught Exception');
    logger.fatal(error);
    process.exit(1);
});

start();