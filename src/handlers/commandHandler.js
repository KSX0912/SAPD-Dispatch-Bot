const fg = require('fast-glob');
const path = require('node:path');

const logger = require('../utils/logger');

async function loadCommands(client) {
    const files = await fg('src/commands/**/*.js');

    client.commands.clear();

    let loaded = 0;

    for (const file of files) {
        const normalizedFile = path.normalize(file);
        const command = require(path.resolve(normalizedFile));

        // Skip disabled commands
        if (command.disabled === true) {
            logger.info(`Skipped disabled command: ${normalizedFile}`);
            continue;
        }

        // Validate command structure
        if (
            !command.data ||
            typeof command.execute !== 'function'
        ) {
            logger.warn(`Skipped invalid command: ${normalizedFile}`);
            continue;
        }

        client.commands.set(command.data.name, {
            name: command.data.name,
            category: path.basename(path.dirname(normalizedFile)),
            file: normalizedFile,
            ...command
        });

        loaded++;
    }

    logger.info(`Loaded ${loaded} command(s).`);

    return loaded;
}

module.exports = {
    loadCommands
};