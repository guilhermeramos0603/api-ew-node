const ICrud = require('./interfaces/interfaceCrud')

class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item){
        console.log('The item success save in Mongo')
    }
}

module.exports = MongoDB