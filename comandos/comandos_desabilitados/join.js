module.exports.run = async (client, message, args) => {
    const Discord = require('discord.js')
    const mongoose = require('mongoose')
    const data = require('../../models/data.js')
    const Data = require('../../models/data.js')
    const config = require('../../config.json')


    if (message.member.voice.channel) {
        const conn = await message.member.voice.channel.join();
    } else {
        return message.channel.send("Precisas de estar num canal de voz para eu conseguir conectar me!")
    }
}

module.exports.help = {
    name: "join",
    aliases: ["join", "j"]
}