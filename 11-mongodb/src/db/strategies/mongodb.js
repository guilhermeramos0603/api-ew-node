const Mongoose = require('mongoose')
const ICrud = require('./interfaces/interfaceCrud')

const status = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando',
}


class MongoDB extends ICrud {
    constructor() {
        super()
        this._heroes = null
        this._driver = null
    }

    async isConnected() {
        const state = status[this._driver.readyState]

        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return status[this._driver.readyState]
    }

    defineModel() {
        const heroSchema = new Mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            power: {
                type: String,
                required: true
            },
            insertAt: {
                type: Date,
                default: new Date()
            },
        })

        this._heroes = Mongoose.model('heroes', heroSchema)
    }

    connect() {
        Mongoose.connect('mongodb://guilhermeramos:senha@localhost:27017/heroes', { useNewUrlParser: true }, function (err) {
            if (!err) return;
            console.log('Falha de conexão!', err)
        })

        const connection = Mongoose.connection
        connection.once('open', () => console.log('Database running!'))

        this._driver = connection
        this.defineModel()
    }

    create(item) {
        return this._heroes.create(item)
    }

    read(item, skip = 0, limit = 10) {
        return this._heroes.find(item).skip(skip).limit(limit)
    }

    update(id, item) {
        return this._heroes.updateOne({ _id: id }, { $set: item })
    }

    delete(id) {
        return this._heroes.deleteOne({ _id: id })
    }
}

module.exports = MongoDB