module.exports.run = async (client, message, args) => {
    const mongoose = require('mongoose')
    const Data = require('../models/data.js')
    const ms = require('parse-ms')
    var reward = Math.floor(Math.random() * (150 - 1 + 1) + 1)
    let timeout = 86400000

    Data.findOne({
        userID: message.author.id
    }, (err, data) => {
            if (err) console.log(err)
            if (!data) {
                const newData = new Data({
                    name: message.author.username,
                    userID: message.author.id,
                    lb: "all",
                    coins: reward,
                    daily: Date.now(),
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
                return message.channel.send(client.users.cache.get(message.author.id).username + ", ganhaste " + reward + " coins")
            } else {
                if (timeout - (Date.now() - data.daily) > 0) {
                    let time = ms(timeout - (Date.now() - data.daily))
                    
                    return message.reply(`You already collected the daily reward, you can collect again in: ${time.hours}h ${time.minutes}m ${time.seconds}s`)

                } else {
                    data.coins += reward
                    data.daily = Date.now();
                    data.save().catch(err => console.log(err))

                    return message.reply(`You collected your reward of ${reward} coins successfully!`)

                }
            }
    })
}

module.exports.help = {
    name: "Daily",
    aliases: ["daily"]
}