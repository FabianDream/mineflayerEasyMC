const mc = require('minecraft-protocol')

async function easyMcAuth (client, options) {
    const fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"token":"${options.easyMcToken}"}`
    }
    try {
        const res = await fetch('https://api.easymc.io/v1/token/redeem', fetchOptions)
        const resJson = await res.json()
        if (resJson.error) throw new Error(`EasyMC: ${resJson.error}`)
        if (!resJson) throw new Error('Empty response from EasyMC.')
        if (resJson.session?.length !== 43 || resJson.mcName?.length < 3 || resJson.uuid?.length !== 36) throw new Error('Invalid response from EasyMC.')
        const session = {
            accessToken: resJson.session,
            selectedProfile: {
                name: resJson.mcName,
                id: resJson.uuid
            }
        }
        options.haveCredentials = true
        client.session = session
        options.username = client.username = session.selectedProfile.name
        options.accessToken = session.accessToken
        client.emit('session', session)
    } catch (error) {
        client.emit('error', error)
        return
    }
    options.connect(client)
}

function createClient (options) {
    if (options.auth === 'easyMc') {
        if (options.easyMcToken?.length !== 20) {
            throw new Error('EasyMC authentication requires an alt token. See https://easymc.io/get .')
        }
        options.auth = easyMcAuth
        options.sessionServer ||= 'https://sessionserver.easymc.io'
        options.username = Buffer.alloc(0)
    }

    return mc.createClient(options)
}

module.exports = createClient
