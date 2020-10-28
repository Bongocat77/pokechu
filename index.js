const { token, prefix } = require('./config.json')
const { Client, Collection } = require('discord.js')
const { VultrexDB } = require('vultrex.db');

const client = new Client({
    disableEveryone: true,
    disabledEvents: ["TYPING_START"]
});

const db = new VultrexDB({
    provider: "sqlite",
    table: "main",
    fileName: "main"
})

db.connect().then(() => {
client.commands = new Collection();
client.limits = new Map()
client.prefix = new Object();
client.prefix["default"] = prefix;
client.db = db;

const commands = require('./structures/command');
commands.run(client);

const events = require('./structures/event');
events.run(client);

client.login(token);
})