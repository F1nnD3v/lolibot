//variáveis
const { count, error, timeStamp } = require('console')
const keepAlive = require("./server")
const Discord = require('discord.js')
const { maxHeaderSize } = require('http')
const { listenerCount, disconnect } = require('process')
const ms = require('parse-ms');
const { setTimeout } = require('timers')
const { measureMemory } = require('vm')
const client = new Discord.Client()
var canalBemVindo = '760900791451123762'
var starterRole = '760900731493810217'
var canalLvlUp = '762280997626052618'
const fs = require('fs')
const { throws } = require('assert')
const mongoose = require('mongoose')
const prefix = process.env['prefix']

var xpColdown = 3000
var canalComandos = '787407133775233035';
//Embeds

function mudarStats() {
  var SttsAleatorio = ["My owner is developing me! ^-^", "If u need my help just type B!help in chat :)", "Im being developed yet, please dont think i ill do so much :*/", "Luke, i am your father", `If you type ${prefix}owner you can see all the social media of my creator!`, "Join in my server :3 --> https://discord.gg/hDdxcq7wwT"]
  var ActivityTypeAleatorio = ["PLAYING", "STREAMING", "LISTENING", "WATCHING"]
  var nAleatorioactivity = Math.floor(Math.random() * (ActivityTypeAleatorio.length - 1 - 0 + 1) + 0)
  var nAleatorio = Math.floor(Math.random() * (SttsAleatorio.length - 1 - 0 + 1) + 0)
  client.user.setActivity(SttsAleatorio[nAleatorio], { type: ActivityTypeAleatorio[nAleatorioactivity] })
  console.log(ActivityTypeAleatorio[nAleatorioactivity], SttsAleatorio[nAleatorio])
}

//Connecting to database
mongoose.connect(process.env['dbPass'], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//ler a pasta de comandos
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./comandos/", (err, files) => {
  if (err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Não foi possivel encontrar o comando!")
    return;
  }
  jsfile.forEach((f) => {
    let props = require(`./comandos/${f}`)
    console.log(`${f} carregado!`)
    client.commands.set(props.help.name, props)

    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name)
    })
  })
});

//modelo
const Data = require('./models/data.js')
const data = require('./models/data.js')

//eventlisteners
client.on('ready', () => {
  let guild = client.guilds.cache.get('751050463079563364')
  let channel = guild.channels.cache.get('767503486870093825')
  let channelStaffsOn = guild.channels.cache.get('767503489785004042')
  let channelBotsOn = guild.channels.cache.get('767503492666884147')
  console.log('Estou on!')
  mudarStats();
  channel.setName("Members: " + guild.memberCount)
  channelStaffsOn.setName("Staff's: " + guild.roles.cache.get('760900730164609065').members.size);
  channelBotsOn.setName("Bots: " + guild.roles.cache.get('760900732487598120').members.size);
  setInterval(mudarStats, 300000);
  guild.members.cache.forEach(p => {
    console.log(client.users.cache.get(p.author.id).username + " está sendo analizando...")
    Data.findOne({
      userID: p.author.id,
    }, (err, data) => {
      if (err) console.log(err)
      if (!data) {
        const newData = new Data({
          name: client.users.cache.get(p.author.id).username,
          userID: p.author.id,
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
          invites: 0,
        })
        newData.save().catch(err => console.log(err));
        p.roles.add('760900731493810217').catch(e => {
        console.log(e);
      });
      } else {
        if(data.lvl >= 15){
        p.roles.add('760900733959929956').catch(e => {
        console.log(e);
      });
        }
      }
    });
    console.log(client.users.cache.get(p.author.id).username + " foi analizado com sucesso!")
  })
})
  client.on('guildMemberAdd', member => {
    let guild = client.guilds.cache.get('751050463079563364')
    let channel = guild.channels.cache.get('767503486870093825')
    let channelStaffsOn = guild.channels.cache.get('767503489785004042')
    let channelBotsOn = guild.channels.cache.get('767503492666884147')
    if (!member.user.bot) {
      member.guild.channels.cache.get(canalBemVindo).send('Welcome,  ' + member.user.username.toString() + "! I hope u enjoy!")
      member.roles.add(starterRole).catch(console.error);
    }
    channel.setName("Members: " + guild.memberCount)
    channelStaffsOn.setName("Staff's: " + guild.roles.cache.get('760900730164609065').members.size)
    channelBotsOn.setName("Bots: " + guild.roles.cache.get('760900732487598120').members.size)
    if (guild.memberCount >= 100) {
      message.guild.channels.cache.get(canalAnuncios).send("Hello everyone! Im here to say that the server has more than 100 members, and for that im here to give a <@&760900738409824276> to everyone for 5 days!!");
      guild.members.cache.forEach(p => {
        p.roles.add('760900738409824276').catch(e => {
          console.log(e);
        });
      });
    }
  })
  client.on('guildMemberRemove', member => {
    let guild = client.guilds.cache.get('751050463079563364')
    let channel = guild.channels.cache.get('767503486870093825')
    let channelStaffsOn = guild.channels.cache.get('767503489785004042')
    let channelBotsOn = guild.channels.cache.get('767503492666884147')
    member.guild.channels.cache.get(canalBemVindo).send('Goodbye,  ' + member.user.username + "! We will miss u T-T!")
    member.roles.add(starterRole).catch(console.error);
    channel.setName("Members: " + guild.memberCount)
    channelStaffsOn.setName("Staff's: " + guild.roles.cache.get('760900730164609065').members.size)
    channelBotsOn.setName("Bots: " + guild.roles.cache.get('760900732487598120').members.size)
  })
  client.on('message', async message => {
    console.log(message.author.username + " mandou mensagem!")
    if (!message.author.bot) {
      if (message.channel.type === "dm") return message.channel.send('I only work in my official server ^-^, if you want to join here is the invite: https://discord.gg/T7yPuWYggG');
      if (!message.content.startsWith(prefix)) {
        if (message.content.length < 3) return;
        Data.findOne({
          userID: message.author.id
        }, (err, data) => {
          if (err) console.log(err)
          if (!data) {
            let randomXP = Math.floor(Math.random() * 10);
            const newData = new Data({
              name: message.author.username,
              userID: message.author.id,
              lb: "all",
              coins: 0,
              daily: 0,
              xptime: xpColdown,
              warns: 0,
              lvl: 0,
              premium: false,
              xp: randomXP,
              hasChannelVC: false,
              hasChanneltxt: false,
              hasColor: false,
              invites:0,
            })
            newData.save().catch(err => console.log(err));
          } else {
            if (xpColdown - data.xptime > 0) {
              let time = ms(xpColdown - (Date.now() - data.xptime))

              return;

            } else {
              let randomXP = Math.floor(Math.random() * 10);
              data.xptime = xpColdown;
              data.xp += randomXP
              if (data.xp >= 50 && data.lvl == 0) {
                data.xp -= 50;
                data.lvl++;
                message.guild.channels.cache.get(canalLvlUp).send(message.author.username + " leveled up to lvl " + data.lvl + "!")
              } else if (data.xp >= 150 && data.lvl == 1) {
                data.xp -= 150;
                data.lvl++;
                message.guild.channels.cache.get(canalLvlUp).send(message.author.username + " leveled up to lvl " + data.lvl + "!")
              } else if (data.xp >= 300 && data.lvl == 2) {
                data.xp -= 300;
                data.lvl++;
                message.guild.channels.cache.get(canalLvlUp).send(message.author.username + " leveled up to lvl " + data.lvl + "!")
              } else if (data.xp >= 700 && data.lvl == 3) {
                data.xp -= 700;
                data.lvl++;
                message.guild.channels.cache.get(canalLvlUp).send(message.author.username + " leveled up to lvl " + data.lvl + "!")
              } else if (data.xp >= 1500 && data.lvl == 4) {
                data.xp -= 1500;
                data.lvl++;
                message.guild.channels.cache.get(canalLvlUp).send(message.author.username + " leveled up to lvl " + data.lvl + "!")
              } else if (data.xp >= 3000 && data.lvl == 5) {
                data.xp -= 3000;
                data.lvl++;
                message.guild.channels.cache.get(canalLvlUp).send(message.author.username + " leveled up to lvl " + data.lvl + "!")
              } else if (data.xp >= 5000 && data.lvl == 6) {
                data.xp -= 5000;
                data.lvl++;
                message.guild.channels.cache.get(canalLvlUp).send(message.author.username + " leveled up to lvl " + data.lvl + "!")
              } else if (data.xp >= 10000 && data.lvl == 7) {
                data.xp -= 10000;
                data.lvl++;
                message.guild.channels.cache.get(canalLvlUp).send(message.author.username + " leveled up to lvl " + data.lvl + "!")
              } else if (data.xp >= 15000 && data.lvl == 8) {
                data.xp -= 15000;
                data.lvl++;
                message.guild.channels.cache.get(canalLvlUp).send(message.author.username + " leveled up to lvl " + data.lvl + "!")
              } else if (data.xp >= 20000 && data.lvl == 9) {
                data.xp -= 20000;
                data.lvl++;
                message.guild.channels.cache.get(canalLvlUp).send(message.author.username + " leveled up to lvl " + data.lvl + "!")
              } else if (data.xp >= 30000 && data.lvl == 10) {
                data.xp -= 30000;
                data.lvl++;
                message.guild.channels.cache.get(canalLvlUp).send(message.author.username + " leveled up to lvl " + data.lvl + "!")
              }
              console.log(message.author.username + " recebeu " + randomXP + "xp")
              data.save().catch(err => console.log(err))

              return;

            }
          }
        })
      } else {
        if (message.channel.name != "🔰testing-bots📺" && message.channel.name != "bot-commands") {
          message.delete(3000);
          message.channel.send(`You can only use bot comands in ${message.guild.channels.cache.get(canalComandos).toString()} :D`);

          message.channel.bulkDelete(1);
          return;
        }
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd
        cmd = args.shift().toLowerCase()
        let command
        let commandFile = client.commands.get(cmd.slice(prefix.length));
        if (command) commandFile.run(client, message, args);

        if (client.commands.has(cmd)) {
          command = client.commands.get(cmd)
        }
        else if (client.aliases.has(cmd)) {
          command = client.commands.get(client.aliases.get(cmd))
        }
        try {
          command.run(client, message, args)
        } catch (e) {
          return;
        }
      }
    }
  });

client.on('roleUpdate', member => {
    let guild = client.guilds.cache.get('751050463079563364')
    let channelStaffsOn = guild.channels.cache.get('767503489785004042')
    if (guild.roles.cache.get('760900730164609065').members.size) {
        channelStaffsOn.setName("Staff's: " + guild.roles.cache.get('760900730164609065').members.size);
    }
});

  keepAlive();
  client.login(process.env['token']);