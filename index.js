const createClient = require('./easyMcClient')
const readline = require('readline-sync')
const rl = require('node:readline')

var server = readline.question("Please give the ip of the server: ")
var token = readline.question("Please give the token for the bot: ")

const bot = createClient({
    host: server,
    auth: 'easyMc',
    version: '1.18',
    easyMcToken: token
})

bot.on('connect', function () {
    console.info('connected')
})
bot.on('disconnect', function (packet) {
    console.log('disconnected: ' + packet.reason)
})
bot.on('end', function () {
    console.log('Connection lost')
})
bot.on('error', function (error) {
    console.log('Client Error', error)
})
bot.on('kick_disconnect', (reason) => {
    console.log('Kicked for reason', reason)
})
bot.on('chat', function (packet) {
    const jsonMsg = JSON.parse(packet.message)
    console.log(jsonMsg)
})

const rel = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rel.on('line', (input) => {
    bot.chat(input);
});
