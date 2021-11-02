module.exports.run = async (client, message, args) => {
    const mongoose = require('mongoose')
    const data = require('../models/data.js')
    const Data = require('../models/data.js')
    const Discord = require('discord.js')
    Data.findOne({
        userID: message.author.id,
    }, (err, authorData) => {
            if (!args[0]) {
                if (!authorData) {
                    const newData = new Data({
                        name: client.users.cache.get(message.author.id).username,
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
                    let statusEmbed = new Discord.MessageEmbed()
                        .setTitle('Your status: ')
                        .addField(`Name:`, `${message.author.username}`)
                        .setThumbnail(message.author.displayAvatarURL())
                        .addField("lvl: ", newData.lvl)
                        .addField("xp: ", newData.xp)
                        .addField("coins", newData.coins)
                        .setColor('#0099ff')
                        .setTimestamp()
                    message.channel.send(statusEmbed);
                } else {
                    let statusEmbed = new Discord.MessageEmbed()
                        .setTitle('Your status: ')
                        .addField(`Name:`, `${message.author.username}`)
                        .setThumbnail(message.author.displayAvatarURL())
                        .addField("lvl: ", authorData.lvl)
                        .addField("xp: ", authorData.xp)
                        .addField("coins", authorData.coins)
                        .setColor('#0099ff')
                        .setTimestamp()
                    message.channel.send(statusEmbed)
                }
            } else {
                let user = message.mentions.users.first();
                    Data.findOne({
                        userID: user.id,
                    }, (err, userData) => {
                            if (!userData) {
                            const newData = new Data({
                                name: client.users.cache.get(user.id).username,
                                userID: user.id,
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
                            let statusEmbed = new Discord.MessageEmbed()
                                .setTitle('Your status: ')
                                .addField(`Name:`, `${user.username}`)
                                .setThumbnail(user.displayAvatarURL())
                                .addField("lvl: ", newData.lvl)
                                .addField("xp: ", newData.xp)
                                .addField("coins", newData.coins)
                                .setColor('#0099ff')
                                .setTimestamp()
                            message.channel.send(statusEmbed);
                            } else {
                                let statusEmbed = new Discord.MessageEmbed()
                                    .setTitle('Your status: ')
                                    .addField(`Nome:`, `${user.username}`)
                                    .setThumbnail(user.displayAvatarURL())
                                    .addField("lvl: ", userData.lvl)
                                    .addField("xp: ", userData.xp)
                                    .addField("coins", userData.coins)
                                    .setColor('#0099ff')
                                    .setTimestamp()
                                message.channel.send(statusEmbed)
                        }
                    })
                }
        })
}

module.exports.help = {
    name: "status",
    aliases: ["stts" , "status", "profile"]
}