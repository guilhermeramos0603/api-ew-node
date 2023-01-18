const Hapi = require('hapi')
const MongoDB = require('./db/strategies/mongodb/mongoDbStrategy')
const HeroSchema = require('./db/strategies/mongodb/schemas/heroSchema')
const HeroRoute = require('./routes/heroRoutes')
const Context = require('./db/strategies/base/contextStrategy')

const app = new Hapi.Server({
    port: 4000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroSchema))
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])

    await app.start()
    return app
}

module.exports = main()