module.exports.run = async (client, message, args) => {
    const mongoose = require('mongoose')
    const data = require('../models/data.js')
    const Data = require('../models/data.js')
    const RoleAzul = message.guild.roles.cache.find(role => role.name === 'Blue')
    const RoleAmarela = message.guild.roles.cache.find(role => role.name === 'Yellow')
    const RoleVerde = message.guild.roles.cache.find(role => role.name === 'Green')
    const RoleVermelha = message.guild.roles.cache.find(role => role.name === 'Red')
    const RoleBranca = message.guild.roles.cache.find(role => role.name === 'White')
    const RolePreta = message.guild.roles.cache.find(role => role.name === 'Black')
    
    if (!message.member.roles.cache.some(r => r.name === "☄️Troll-Master☄️") && !message.member.roles.cache.some(r => r.name === "🛡️Premium🛡️") && !message.member.roles.cache.some(r => r.name === "💯Ultra💯") && !message.member.roles.cache.some(r => r.name === "⚜️Legend⚜️") && !message.member.roles.cache.some(r => r.name === "⭐VIP+⭐")) return message.reply('You need VIP to use this command!')
    if (message.member.roles.cache.has(RoleAzul) && message.member.roles.cache.has(RoleAmarela) && message.member.roles.cache.has(RoleVerde) && message.member.roles.cache.has(RoleVermelha) && message.member.roles.cache.has(RoleBranca) && message.member.roles.cache.has(RolePreta)) {
        console.log("nao tem nenhuma cor")
        return message.reply("You need to choose a color 1st")
    } else {
        Data.findOne({
            userID: message.author.id,
        }, (err, data) => {
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
                }
                else {
                        message.member.roles.remove(RoleAzul)
                        message.member.roles.remove(RoleAmarela)
                        message.member.roles.remove(RoleVerde)
                        message.member.roles.remove(RoleVermelha)
                        message.member.roles.remove(RoleBranca)
                        message.member.roles.remove(RolePreta)   
                        data.hasColor = false;
                        data.save().catch(err => console.log(err));
                }
        })
    }
}

module.exports.help = {
    name: "removecolor",
    aliases: ["removecolor", "rc", "removercor", "Removercor", "RemoveColor"]
}