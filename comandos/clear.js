    module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args[0] <= 0) return message.reply('You have to insert a number bigger than 0')
        message.channel.messages.fetch()
            .then(function (list) {
                message.channel.bulkDelete(list)
                message.channel.send(`Some messages as been cleared by ${client.users.cache.get(message.author.id).username}`)
                console.log(`Várias mensagens foram apagadas por ${client.users.cache.get(message.author.id).username}`)
            })
        }
    }

module.exports.help = {
    name: "ClearChat",
    aliases: ["cc"]
}