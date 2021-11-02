/*const { VoiceChannel } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const mongoose = require('mongoose');
    const data = require('../models/data.js');
    const Data = require('../models/data.js');
    const { YTSearcher } = require('ytsearcher');
    const ytdl = require('ytdl-core');
    const queue = new Map();
    const serverQueue = queue.get(message.guild.id)
    const searcher = new YTSearcher({
        key: "AIzaSyAo_9WmODEPzVZwYSUHI0vi-M8uQnsHOM8",
        revealed: true
    });

    if (!message.member.voice.channel) {
        return message.channel.send("Precisas de estar numa sala de voz para conseguires usar este comando");
    } else {
        let resultado = await searcher.search(args.join(" "), { type: "video" });
        message.channel.send(resultado.first.url);
        const info = await ytdl.getInfo(resultado.first.url)

        let musica = {
            title: info.videoDetails.title,
            url: info.videoDetails.video_url,
            duração: info.videoDetails.duration
        }

        if (!serverQueue) {
            const queueConstructor = {
                canaldeTexto: message.channel,
                canaldeVoz: VoiceChannel,
                connection: null,
                musicas: [],
                volume: 10,
                tocando: true
            }
            queue.set(message.guild.id, queueConstructor);
            queueConstructor.musicas.push(musica);

            try {
                let conn = await VoiceChannel.join;
                queueConstructor.connec = conn;
               // play(message.guild, queueConstructor.musicas[0]);
            } catch (err) {
                console.log(err)
                queue.delete(message.guild.id)
                return message.channel.send("Não foi possivel entrar nesse canal de voz")
            }
        }
    }


}

module.exports.help = {
    name: "play",
    aliases: ["play", "p"]
}
*/