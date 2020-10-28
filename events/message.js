const { owners, prefix } = require('../config.json');

module.exports = async (client, message) => {
    if(!message.guild || message.author.bot) return;

    if(!client.prefix[message.guild.id]) {
        client.prefix[message.guild.id] = await client.db.get(`prefix-${message.guild.id}`, client.prefix["default"]);
    }

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(client.prefix.length).toLowerCase();
    const cmd = client.commands.get(command);

    if(!message.content.toLowerCase().startsWith(prefix)) return;

    if(!cmd) return;
    if(!message.channel.permissionsFor(message.guild.me).toArray().includes("SEND_MESSAGES")) return;

    if(cmd.requirements.ownerOnly && !owners.includes(message.author.id))
    return message.channel.send("Only the bot owner can use this command!");

    if(cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
    return message.channel.send(`You must have the foloowing permissions: ${missingPerms(message.member, cmd.requirements.userPerms)}`);

    if(cmd.requirements.clientPerms && !message.member.permissions.has(cmd.requirements.clientPerms))
    return message.channel.send(`I am missing the following permissions: ${missingPerms(message.guild.me, cmd.requirements.clientPerms)}`);

    cmd.run(client, message, args);
}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
    .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``)

    return missingPerms.length > 1 ?
    `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
    missingPerms[0];
}