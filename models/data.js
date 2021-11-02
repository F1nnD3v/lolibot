const mongoose = require('mongoose')

const esquemaDosDados = mongoose.Schema({
    name: String,
    userID: String,
    lb: String,
    coins: Number,
    daily: Number,
    xptime: Number,
    xp: Number,
    lvl: Number,
    premium: Boolean,
    warns: Number,
    hasChannelVC: Boolean,
    hasChanneltxt: Boolean,
    hasColor: Boolean,
})

module.exports = mongoose.model("Data", esquemaDosDados)