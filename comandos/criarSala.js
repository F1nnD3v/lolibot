module.exports.run = async (client, message, args) => {
    const mongoose = require('mongoose')
    const Discord = require('discord.js')
    const data = require('../models/data.js')
    const Data = require('../models/data.js')
    const config = require('../config.json')
    const embedCriarSala = new Discord.MessageEmbed()
        .setDescription('Aqui abaixo está explicado como podes criar uma sala...')
        .setTitle('Criar sala')
        .setColor('#FF00FF')
        .addField(`**Text channel**`, `${config.prefix}createchannel TC <name of the room>`)
        .addField(`**Voice channel**`, `${config.prefix}createchannel VC <name of the room>`)

    if (!message.member.roles.cache.some(r => r.name === "☄️Troll-Master☄️") && !message.member.roles.cache.some(r => r.name === "🛡️Premium🛡️") && !message.member.roles.cache.some(r => r.name === "💯Ultra💯") && !message.member.roles.cache.some(r => r.name === "⚜️Legend⚜️") && !message.member.roles.cache.some(r => r.name === "⭐VIP+⭐")) return message.reply('Precisas de ser VIP para usares este comando!')
    Data.findOne({
        userID: message.author.id
    }, (err, data) => {
        if (err) console.log(err)
        if (!data) {
            const newData = new Data({
                name: message.author.username,
                userID: message.author.id,
                lb: "all",
                coins: 0,
                daily: 0,
                xptime: 0,
                warns: 0,
                lvl: 0,
                premium: false,
                xp: 0,
                hasChannelVC: false,
                hasChanneltxt: false,
                hasColor: false,
                invites:0,
            })
            newData.save().catch(err => console.log(err));
        }
        else {
            if (args[0] == "VC" || args[0] == "voicechannel") {
                if (data.hasChannelVC == true) return message.reply("Sorry but you already have a voice chat created, you can't create another")
                let category = message.guild.channels.cache.find(c => c.name == "Voice-Chats VIP")
                var nomeDaSala = message.author.username + " - " + args[1];
                message.guild.channels.create(nomeDaSala, { type: 'voice' }).then(canal => canal.setParent(nomeDaSala.id))
                data.hasChannelVC = true;
                console.log(`Sala ${message.author.username + " - " + args[1]} criada por ${message.author.username}com sucesso!`)
                data.save().catch(err => console    .log(err));
            } else if (args[0] == "TC" || args[0] == "textchannel") {
                if (data.hasChanneltxt == true) return message.reply("Desculpa mas já tens uma sala de texto criada, não podes criar outra")
                message.guild.channels.create(message.author.username + " - " + args[1], {type: 'text' })   
                data.hasChanneltxt = true;
                console.log(`Sala ${message.author.username + " - " + args[1]} criada por ${message.author.username}com sucesso!`)
                data.save().catch(err => console.log(err));
            } else {
                message.reply(embedCriarSala)
            }
        }
    })
}

module.exports.help = {
    name: "CriarSala",
    aliases: ["criarsala"]
}