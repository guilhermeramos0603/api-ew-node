const BaseRoute = require('./base/baseRoute')
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const { skip, limit, name } = request.query
                    return this.db.read({ name }, parseInt(skip), parseInt(limit))
                }
                catch (err) {
                    console.error('ERRO!', err)
                    return "Internal Server Error"
                }
            }
        }
    }
}

module.exports = HeroRoutes