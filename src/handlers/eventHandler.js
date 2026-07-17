const fg = require('fast-glob');
const path = require('node:path');

const logger = require('../utils/logger');

async function loadEvents(client) {
    const files = await fg('src/events/**/*.js');

    let loaded = 0;

    for (const file of files) {
        const event = require(path.resolve(file));

        if (!event.name || typeof event.execute !== 'function') {
            logger.warn(`Skipped invalid event: ${file}`);
            continue;
        }

        if (event.once) {
            client.once(event.name, (...args) =>
                event.execute(...args)
            );
        } else {
            client.on(event.name, (...args) =>
                event.execute(...args)
            );
        }

        loaded++;
    }

    logger.info(`Loaded ${loaded} event(s).`);

    return loaded;
}

module.exports = {
    loadEvents
};