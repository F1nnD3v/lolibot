module.exports.run = (client, message, args) => {
const Discord = require('discord.js')
    message.channel.send(`O teu ping é de ${Date.now() - message.createdTimestamp}ms, o ping do bot é de ${client.ws.ping}ms`)
}

module.exports.help = {
    name: "ping",
    aliases: ["ping"]
}