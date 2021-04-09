const Discord = require('discord.js')
const mineflayer = require('mineflayer')
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
                break
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

const bot = mineflayer.createBot({
    host: process.env.HOST,
    username: process.env.EMAIL,
    password: process.env.PASSWORD
})

const delay = ms => new Promise(res => setTimeout(res, ms));

bot.on('spawn', () => {
    console.log('joined!')
    setInterval(async function() {
        bot.chat('⊽')
        await delay(2000)
        bot.chat('work that bussy mawmaw')
        bot.swingArm()
    }, 5000)
})

bot.on('messagestr', (message, username) => {
    console.log(username + ": " + message)
})

bot.on('kicked', console.log)
bot.on('error', console.log)

client.login(process.env.TOKEN)