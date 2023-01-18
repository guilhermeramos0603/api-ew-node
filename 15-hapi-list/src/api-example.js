const Hapi = require('hapi')
const MongoDB = require('./db/strategies/mongodb/mongoDbStrategy')
const HeroSchema = require('./db/strategies/mongodb/schemas/heroSchema')
const Context = require('./db/strategies/base/contextStrategy')

const app = new Hapi.Server({
    port: 4000
})

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroSchema))

    app.route([{
        path: '/heroes',
        method: 'GET',
        handler: (request, head) => {
            return context.read()
        }
    }])

    await app.start()
    console.log('Servidor Rodando na porta ', app.info.port)
}

main()