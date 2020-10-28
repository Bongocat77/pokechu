const { MessageEmbed } = require('discord.js')

module.exports.run = (client, message, args) => {
    if (args[0] && client.commands.has(args[0])) {
        const cmd = client.commands.get(args[0]);

        const embed = new MessageEmbed()
        .setAuthor(`${cmd.help.name} | Help`, client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(`**Name:** ${cmd.help.name}\n**Description:** ${cmd.help.description}`)

        return message.channel.send(embed)
    }
const embed = new MessageEmbed()
    .setAuthor(`Help | ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true, size: 128 }))
    .setColor("RANDOM")
    .setDescription(client.commands.map(cmd => cmd.help.name).join(", "))

    message.channel.send(embed);
}

module.exports.help = {
    name: 'help',
    description: "View available commands!"
}

module.exports.requirements = {
    ownerOnly: false,
    userPerms: [],
    clientPerms: [],
}