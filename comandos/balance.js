module.exports.run = async (client, message, args) => {
    const data = require('../models/data.js')
    const Data = require('../models/data.js')
    Data.findOne({
        userID: message.author.id,
    }, (err, data) => {
        if (err) console.log(err)
        if (!data) {
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
            return message.channel.send(client.users.cache.get(message.author.id).username + ", you have 0 coins")
        } else {
            message.channel.send("@"+client.users.cache.get(message.author.id).username + ", you have " + data.coins + " coins")
        }
    })
}

module.exports.help = {
    name: "Balance",
    aliases: ["bal", "balance", "money", ]
}