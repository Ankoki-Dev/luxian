const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client()
let prefix = '-'

client.on('ready', async () => {
    await client.user.setActivity('I\'m here for emotional support')
    console.log('Luxian loaded.')
})

client.on('message', msg => {
    let content = msg.content
    if (content.startsWith(prefix)) {
        let commandName = content.split(' ')[0]
        commandName = commandName.substring(prefix.length, commandName.length)
        let arguments = content.substring(commandName.length + 2, content.length).split(' ')

        switch (commandName) {
            case 'echo':
                msg.channel.send(arguments.join(" "))
                break
            case 'embed':
                const testEmbed = new Discord.MessageEmbed()
                    .setColor('#AACCDD')
                    .setTitle('This is a cute embed!')
                    .setURL('https://www.ankoki.com')
                    .setAuthor('Ankoki')
                    .setDescription('This is the description!')
                    .addFields(
                        { name: 'My first field', value: 'Value of first field' },
                        { name: 'My second field', value: 'Value of second field' }
                    )
                    .setTimestamp()
                msg.channel.send(testEmbed)
            case 'reply':
                msg.reply('If you insist :p')
                break
            case 'prefix':
                if (arguments.length !== 1) {
                    msg.channel.send('You need to specify a new prefix!')
                    return
                }
                prefix = arguments[0].toLowerCase()
                msg.channel.send(`My new prefix is ${prefix}!`)
                break
            case 'activity':
                if (arguments.length < 1) {
                    msg.channel.send('You need to give a new activity!')
                    return
                }
                client.user.setActivity(arguments.join(' '))
                msg.channel.send(`You have set the new activity of Luxian to ${arguments.join(" ")}!`)
                break
        }
    }
})

client.login(process.env.TOKEN)