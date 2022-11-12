const ICrud = require('./interfaces/interfaceCrud')

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('The item success save in Postgres')
    }
}

module.exports = Postgres