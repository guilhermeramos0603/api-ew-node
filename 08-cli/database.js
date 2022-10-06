const {readFile} = require('fs')
const {promisify} = require('util')

const readFileAsync = promisify(readFile)

class Database {
    constructor(){
        this.NAME_FILE = 'heros.json'
    }
    async getDataFile() {
        const file = await readFileAsync(this.NAME_FILE, 'utf8')
        return JSON.parse(file.toString())
    }
    writeHere(){

    }
    async list(id) {
        const data = await this.getDataFile()
        const filterData = data.filter(item => (id ? (item.id === id) : true))
        return filterData
    }
}

module.exports = new Database()