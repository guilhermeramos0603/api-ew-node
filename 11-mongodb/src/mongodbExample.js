const Mongoose = require('mongoose')

Mongoose.connect('mongodb://guilhermeramos:senha@localhost:27017/heroes', { useNewUrlParser: true }, function (err) {
    if (!err) return;
    console.log('Falha de conexão!', err)
})

const connection = Mongoose.connection

connection.once('open', () => console.log('Database running!'))
