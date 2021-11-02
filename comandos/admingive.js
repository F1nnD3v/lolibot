module.exports.run = async (client, message, args) => {
    const mongoose = require('mongoose')
    const Data = require('../models/data.js')
    const prefix = process.env['prefix'];
    let user = message.mentions.users.first()
    Data.findOne({
        userID: message.author.id,
    }, (err, authorData) => {
        if (!authorData) {
            return
        } else {
            if (!args[0]) return message.reply('You should specify the type of status that you want to give')
            if (!args[1]) return message.reply('You should specify a user')
            if (!user) return message.reply('Error! User not found!')
            if (!args[2]) return message.reply('You should say quantity to give')
            Data.findOne({
                userID: user.id,
            }, (err, userData) => {
                    if (err) console.log(err)
                    if (!message.member.roles.cache.some(r => r.name === "✔ServerTeam✔")) return message.reply('Sorry but only Admins can use this command.')

                    if (err) console.log(err)
                    if (args[0] == "coins") {
                        if (!userData) {
                            const newData = new Data({
                                name: client.users.cache.get(user.id).username,
                                userID: user.id,
                                lb: "all",
                                coins: parseInt(args[2]),
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
                            message.channel.send(`${args[1]} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username}.`)
                            console.log(`${args[1]} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username}.`)
                            authorData.coins += parseInt(args[2])
                            newData.save().catch(err => console.log(err));
                        } else {
                            if (args[2] < 0) {
                                message.channel.send(`The admin ${client.users.cache.get(message.author.id).username} took ${Math.abs(args[2])} ${args[0]} from ${args[1]}.`)
                                console.log(`The admin ${client.users.cache.get(message.author.id).username} took ${Math.abs(args[2])} ${args[0]} from ${args[1]}.`)
                                userData.coins += parseInt(args[2])
                                userData.save().catch(err => console.log(err));
                            } else {
                                message.channel.send(`${args[1]} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username.toString()}.`)
                                console.log(`${args[1].toString()} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username}.`)
                                userData.coins += parseInt(args[2])
                                userData.save().catch(err => console.log(err));
                            }
                            
                        }
                    } else if (args[0] == "xp") {
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
                                xp: parseInt(args[2]),
                                hasChannelVC: false,
                                hasChanneltxt: false,
                                hasColor: false,
                                invites: 0,
                            })
                            message.channel.send(`${args[1]} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username.toString()}.`)
                            console.log(`${args[1]} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username}.`)
                            authorData.xp += parseInt(args[2])
                            newData.save().catch(err => console.log(err));
                        } else {
                            if (args[2] < 0) {
                                message.channel.send(`The admin ${client.users.cache.get(message.author.id).username} took ${Math.abs(args[2])} ${args[0]} from ${args[1]}.`)
                                console.log(`The admin ${client.users.cache.get(message.author.id).username} took ${Math.abs(args[2])} ${args[0]} from ${args[1]}.`)
                                userData.xp += parseInt(args[2])
                                userData.save().catch(err => console.log(err));
                            } else {
                                message.channel.send(`${args[1]} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username}.`)
                                console.log(`${args[1]} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username}.`)
                                userData.xp += parseInt(args[2])
                                userData.save().catch(err => console.log(err));
                            }
                        }
                    } else if (args[0] == "lvl") {
                        if (!userData) {
                            const newData = new Data({
                                name: client.users.cache.get(user.id).username,
                                userID: user.id,
                                lb: "all",
                                coins: 0,
                                daily: 0,
                                xptime: 0,
                                warns: 0,
                                lvl: parseInt(args[2]),
                                premium: false,
                                xp: 0,
                                hasChannelVC: false,
                                hasChanneltxt: false,
                                hasColor: false,
                                invites: 0,
                            })
                            message.channel.send(`${args[1]} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username}.`)
                            console.log(`${args[1]} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username}.`)
                            authorData.lvl += parseInt(args[2])
                            newData.save().catch(err => console.log(err));
                        } else {
                            if (args[2] < 0) {
                                message.channel.send(`The admin ${client.users.cache.get(message.author.id).username} took ${Math.abs(args[2])} ${args[0]} from ${args[1]}.`)
                                console.log(`The admin ${client.users.cache.get(message.author.id).username} took ${Math.abs(args[2])} ${args[0]} from ${args[1]}.`)
                                userData.lvl += parseInt(args[2])
                                userData.save().catch(err => console.log(err));
                            } else {
                                message.channel.send(`${args[1]} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username}.`)
                                console.log(`${args[1]} recived ${args[2]} ${args[0]} from the admin ${client.users.cache.get(message.author.id).username}.`)
                                userData.lvl += parseInt(args[2])
                                userData.save().catch(err => console.log(err));
                            }
                        }
                    } else {
                        message.reply('Please choose a correct parameter(coins,xp,lvl) / Ex: ' + prefix + `give coins @user 1000`)
                    }
        });
        }
    })
}


module.exports.help = {
    name: "Admin Give",
    aliases: ["ag" , "admingive" , "give"]
}