const {
    Client,
    GatewayIntentBits,
    Collection,
    Partials,
    ActivityType
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ],

    partials: [
        Partials.Channel
    ]
});

/*
|--------------------------------------------------------------------------
| Collections
|--------------------------------------------------------------------------
|
| Runtime collections used throughout the bot.
| These are populated automatically by the loaders.
|
*/

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

/*
|--------------------------------------------------------------------------
| Runtime Statistics
|--------------------------------------------------------------------------
*/

client.loadStats = {
    events: 0,
    commands: 0,
    buttons: 0,
    selectMenus: 0,
    modals: 0
};

/*
|--------------------------------------------------------------------------
| Default Presence
|--------------------------------------------------------------------------
*/

client.defaultPresence = {
    activities: [
        {
            name: 'SAPD Dispatch Console',
            type: ActivityType.Watching
        }
    ],
    status: 'online'
};

module.exports = client;