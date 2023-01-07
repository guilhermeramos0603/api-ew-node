// Databases
// show dbs

// Mudando o contexto para uma database
// use heroes

// mostrar a table
// show collections

// CRUD

// create

db.heroes.insert({
    name: 'Teste',
    power: 'Speed',
    birthDate: '1993-01-23'
})

for (let i = 0; i < 10000; i++) {
    db.heroes.insert({
        name: `Teste ${i}`,
        power: 'Speed',
        birthDate: '1993-01-23'
    })
}

// read
db.heroes.find()
db.heroes.find().pretty()
db.heroes.findOne()
db.heroes.find().limit(1000).sort({ nome: -1 })
db.heroes.find({}, { poder: 1, _id: 0 })

// update
//se rodar esse comando a tabela perde os outros dados que nao sao name
db.heroes.update({ _id: ObjectId("ID") },
    { name: 'Teste de Update' })

// Corrigido
db.heroes.update({ _id: ObjectId("ID") },
    { $set: { name: 'Teste de Update' } })

// delete
//todo o db
db.heroes.remove({})
db.heroes.remove({ name: 'fulano' })