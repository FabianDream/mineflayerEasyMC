const createClient = require('./easyMcClient')

// example usage
const client = createClient({
    host: 'continental-mc.net',
    auth: 'easyMc',
    version: '1.18',
    easyMcToken: 'UNhXfLlzz7MI7hOO5KdR'
})

client.on('connect', function () {
    console.info('connected')
})
client.on('disconnect', function (packet) {
    console.log('disconnected: ' + packet.reason)
})
client.on('end', function () {
    console.log('Connection lost')
})
client.on('error', function (error) {
    console.log('Client Error', error)
})
client.on('kick_disconnect', (reason) => {
    console.log('Kicked for reason', reason)
})
client.on('chat', function (packet) {
    const jsonMsg = JSON.parse(packet.message)
    console.log(jsonMsg)
})
