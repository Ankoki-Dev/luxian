const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client()
const prefix = '-'

client.on('ready', async () => {
    console.log('Luxian loaded.')
})

client.on('message', msg => {
    let content = msg.content
    if (content.startsWith(prefix)) {
        let commandName = content.split(' ')[0]
        commandName = commandName.substring(1, commandName.length)
        msg.reply(`You executed the command ${commandName}!`)
        let arguments = content.substring(commandName.length + 2, content.length).split(' ')

        switch (commandName) {
            case 'echo':
                msg.channel.send(arguments.join(" "))
                break;
        }
    }
})

client.login(process.env.TOKEN)