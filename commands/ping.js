module.exports.run = (client, message, args) => {
    message.channel.send(`Pong! ${client.ws.ping.toFixed(2)}ms`);
}

module.exports.help = {
    name: "ping",
    description: "Example command!"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}