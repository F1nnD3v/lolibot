module.exports.run = async (client, message, args) => {
    const mongoose = require('mongoose')
    const Discord = require('discord.js')
    const data = require('../models/data.js')
    const Data = require('../models/data.js')
    let ownerEmbed = new Discord.MessageEmbed()
        .setTitle('Owner links & soscial media: ')
        .addField("---",`[Steam](https://steamcommunity.com/id/F1nnS/)`)
        .addField("---",`League of Legends nickname: F1ññ`)
        .addField("---",`[Twitch](https://www.twitch.tv/finn21)`)
        .addField("---",`[Donate](https://streamlabs.com/finn212/tip)`)
        .setColor('#009127')
        .setTimestamp()
    message.channel.send(ownerEmbed);
}

module.exports.help = {
    name: "Owner",
    aliases: ["owner"]
}