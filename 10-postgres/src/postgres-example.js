// npm install sequelize pg-hstore pg

const Sequelize = require('sequelize')



async function main() {

    const read = await Heroes.findAll({
        raw: true,
    })

    console.log('result', read)
}

main()