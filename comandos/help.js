const { disconnect } = require('mongoose');

module.exports.run = async (client, message, args) => {
    const Discord = require('discord.js');
    const prefix = process.env['prefix'];
    const comandoStatus = require('../comandos/status.js');
    const comandoHelp = require('../comandos/help.js');
    const comandoPing = require('./ping.js');
    const comandoDaily = require('../comandos/daily.js');
    const comandoBalance = require('../comandos/balance.js');
    const comandoColor = require('../comandos/setcolor.js');
    const comandoClear = require('../comandos/clear.js');
    const comandoCriarSala = require('../comandos/criarSala.js');
    const comandoAdminGive = require('../comandos/admingive.js');
    const canalDeAjuda = '787407133775233035';
     var teste = message.mentions.members.first();
    //Embeds
    //HelpEmbed
    let helpEmbed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Here are all the avaliable commands:')
            .addFields(
            { name: `Tools`, value: `${prefix}help tools`, inline: true },
            {name: `Fun`, value: `${prefix}help fun`, inline: true},            
            {name: `Games`, value: `${prefix}help games`, inline: true},
                { name: `Music`, value: `${prefix}help music`, inline: true })
    .setColor("#F0F0F0")
    if (message.member.roles.cache.some(r => r.name === "5€ - vip")) {
        helpEmbed.addFields({ name: `VIP tools`, value: `${prefix}help viptools`, inline: true },)
    }if (message.member.roles.cache.some(r => r.name === "Rei Cigano - Admin")) {
        helpEmbed.addFields({ name: `Admin tools`, value: `${prefix}help admintools`, inline: true },)
    }
    //ToolsEmbed
    const embedTools = new Discord.MessageEmbed()
        .setTitle('Tools')
        .setDescription('Here are all the tools avaliable in this server')
        .addFields(
            { name: "```" + prefix + comandoStatus.help.name + "```", value: 'By using this command you can see you status in the server. \n Aliases: ' + comandoStatus.help.aliases, inline: false },
            { name: "```" + prefix + comandoHelp.help.name + "```", value: "By using this command you can see all the avaliable commands in the server. \n Aliases: " + comandoHelp.help.aliases, inline: false },
            {name:"```" + prefix + comandoBalance.help.name + "```", value: "By using this command you can your balance in this server. \n Aliases: " + comandoBalance.help.aliases, inline: false},
            { name: "```" + prefix + comandoPing.help.name + "```", value: "By using this command you can see your ping(not recomended) \n Aliases: " + comandoPing.help.aliases, inline: false },
    )
        .setColor('#00FFFF')
    
    //FunEmbed
    const embedFun = new Discord.MessageEmbed()
        .setTitle('Fun')
        .setDescription('Here you can see all the funny commands of this server:')
        .addFields(
            {name: "⚠️Area under contruction⚠️", value:"⚠️Area under contruction⚠️"}
            //comando de gifs(vai ter gif diário e um gif aleatorio) {name: "```" + prefix + }
        )   
        .setColor("#00FF00")
    
    //JogosEmbed
    const embedJogos = new Discord.MessageEmbed()
        .setTitle('Games')
        .setDescription('Here are all the games commands of this server: ')
        .addFields(
            { name: "```" + prefix + comandoBalance.help.name + "```", value: "By using this command you can see your balance of the server. \n Aliases: " + comandoBalance.help.aliases, inline: false },
            
    )
        .setColor("#FF0000")
    //EmbedMusica
    const embedMusica = new Discord.MessageEmbed()
        .setTitle('Music')
        .setDescription('Here are all the music commands of this server')
        .addFields(
            {name: "⚠️Area under contruction⚠️", value:"⚠️Area under contruction⚠️"}
       //comando "play" {name:"```" + prefix + comando}
       //comando "queue"
       //comando "now playing" 
    )
        .setColor("#FF00C4")

    //EmbedVip
    const embedVipTools = new Discord.MessageEmbed()
        .setTitle("VIP Menu")
        .setDescription("Here you can see all the VIP commands!")
        .addFields(
        {name:"```" + prefix + comandoColor.help.name + "```", value: "Change your nickname color on this server \n Aliases: " + comandoColor.help.aliases, inline: false}
    )
        .setColor("#5A73F2")
    //EmbedAdmin
    const embedAdminTools = new Discord.MessageEmbed()
        .setTitle("Menu ADMIN")
        .setDescription("Here you can see all the ADMIN commands!")
        .addFields(
            { name: "```" + prefix + comandoAdminGive.help.name + "```", value: "Modify any profile status in the server \n Aliases" + comandoAdminGive.help.aliases, inline: false },
            { name: "```" + prefix + comandoClear.help.name + "```", value: "Clear the chat messages \n Aliases: " + comandoClear.help.aliases, inline: false},
    )
        .setColor("#23F76B")

    if (message.channel.id == canalDeAjuda) {
        if (!args[0]) {
            message.channel.send(helpEmbed)
        } else if (args[0] == "tools" || args[0] == "Tools") {
            message.channel.send(embedTools)
        } else if (args[0] == "fun" || args[0] == "Fun") {
            message.channel.send(embedFun)
        } else if (args[0] == "games" || args[0] == "Games") {
            message.channel.send(embedJogos)
        } else if (args[0] == "music" || args[0] == "Music") {
            message.channel.send(embedMusica)
        } else if (args[0] == "vip" || args[0] == "Vip") {
            if (message.member.roles.cache.some(r => r.name === "5€ - vip"))
                message.channel.send(embedVipTools)
            else
                return message.reply("You need to be VIP to execute this command!")
        } else if (args[0] == "admin" || args[0] == "Admin") {
            if (message.member.roles.cache.some(r => r.name === "Rei Cigano - Admin"))
                message.channel.send(embedAdminTools)
            else
                return message.reply("You need to be Admin to execute this command!")
        }
    } else {
        message.reply(`Porfavor usa o ${message.guild.channels.cache.get(canalDeAjuda).toString()} para obteres ajuda!`)
    }

}

module.exports.help = {
    name: "help",
    aliases: ["ajuda"]
}