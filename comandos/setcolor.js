module.exports.run = async (client, message, args) => {
    const mongoose = require('mongoose')
    const Discord = require('discord.js')
    const data = require('../models/data.js')
    const Data = require('../models/data.js')
    const RoleAzul = message.guild.roles.cache.find(role => role.name === 'Blue')
    const RoleAmarela = message.guild.roles.cache.find(role => role.name === 'Yellow')
    const RoleVerde = message.guild.roles.cache.find(role => role.name === 'Green')
    const RoleVermelha = message.guild.roles.cache.find(role => role.name === 'Red')
    const RoleBranca = message.guild.roles.cache.find(role => role.name === 'White')    
    const RolePreta = message.guild.roles.cache.find(role => role.name === 'Black')
    const RoleAzulEmoji = '🔵';
    const RoleAmarelaEmoji = '🟡';
    const RoleVerdeEmoji = '🟢';
    const RoleVermelhaEmoji = '🔴'
    const RoleBrancaEmoji = '⚪';
    const RolePretaEmoji = '⚫';
    const ColorEmbed = new Discord.MessageEmbed()
        .setTitle(message.author.username + ', here are all the avaliable colors:')
        .setDescription('You can also react to add a color(Coming soon)')
        .addField(RoleAzulEmoji + ' - Blue', `${process.env['prefix']}setcolor blue`)
        .addField(RoleAmarelaEmoji + ' - Yellow', `${process.env['prefix']}setcolor yellow`)
        .addField(RoleVerdeEmoji + ' - Green', `${process.env['prefix']}setcolor green`)
        .addField(RoleVermelhaEmoji + ' - Red', `${process.env['prefix']}setcolor red`)
        .addField(RoleBrancaEmoji + ' - White', `${process.env['prefix']}setcolor white`)
        .addField(RolePretaEmoji + ' - Black', `${process.env['prefix']}setcolor black`)
        .setColor('#FF00FF')

    if (!message.member.roles.cache.some(r => r.name === "☄️Troll-Master☄️") && !message.member.roles.cache.some(r => r.name === "🛡️Premium🛡️") && !message.member.roles.cache.some(r => r.name === "💯Ultra💯") && !message.member.roles.cache.some(r => r.name === "⭐VIP+⭐") && !message.member.roles.cache.some(r => r.name === "⚜️Legend⚜️")) return message.reply('Precisas de ser VIP para usares este comando!')
    if (!args[0]) return message.reply("You should specify a color")
    if (args[0] != "yellow" && args[0] != "blue" && args[0] != "green" && args[0] != "red" && args[0] != "white" && args[0] != "black") {
        message.reply("You should only chose the avaliable colors")
        return message.channel.send(ColorEmbed)
    }
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
                    hasColor: true,
                    invites:0,
                })
                newData.save().catch(err => console.log(err));
                if (args[0] == "blue") {
                    message.member.roles.add(RoleAzul)
                } else if (args[0] == "yellow") {
                    message.member.roles.add(RoleAmarela)
                } else if (args[0] == "green") {
                    message.member.roles.add(RoleVerde)
                } else if (args[0] == "red") {
                    message.member.roles.add(RoleVermelha)
                } else if (args[0] == "white") {
                    message.member.roles.add(RoleBranca)
                } else if (args[0] == "black") {
                    message.member.roles.add(RolePreta)
                }
                message.reply("The color " + args[0] + " as been set successfully!")
            } else if (data.hasColor == true) {
                return message.reply("You should remove the current color 1st.")
            } else {
                if (args[0] == "blue") {
                    message.member.roles.add(RoleAzul)
                } else if (args[0] == "yellow") {
                    message.member.roles.add(RoleAmarela)
                } else if (args[0] == "green") {
                    message.member.roles.add(RoleVerde)
                } else if (args[0] == "red") {
                    message.member.roles.add(RoleVermelha)
                } else if (args[0] == "white") {
                    message.member.roles.add(RoleBranca)
                } else if (args[0] == "black") {
                    message.member.roles.add(RolePreta)
                }
                data.hasColor = true;
                data.save().catch(err => console.log(err));
                message.reply("The color " + args[0] + " as been set successfully!")
            }
        })

}

module.exports.help = {
    name: "setcolor",
    aliases: ["setColor", "setcolor", "SetColor" , "Setcolor"]
}