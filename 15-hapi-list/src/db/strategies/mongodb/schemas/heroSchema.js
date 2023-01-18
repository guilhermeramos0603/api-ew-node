const Mongoose = require('mongoose')
const HeroesSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

//mocha workaround
module.exports = Mongoose.models.heroes || Mongoose.model('heroes', HeroesSchema)