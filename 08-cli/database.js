const {readFile, writeFile} = require('fs')
const {promisify} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor(){
        this.NAME_FILE = 'heros.json'
    }
    async getDataFile() {
        const file = await readFileAsync(this.NAME_FILE, 'utf8')
        return JSON.parse(file.toString())
    }
    async writeHere(data){
        await writeFileAsync(this.NAME_FILE, JSON.stringify(data))
        return true
    }
    async store(hero){
        const data = await this.getDataFile()
        const id = hero.id <= 2 ? hero.id : Date.now()
        const heroWithId = {
            id,
            ...hero
        }
        const finishedData = [
            ...data,
            heroWithId
        ]

        const result = await this.writeHere(finishedData)
        return result
    }
    async list(id) {
        const data = await this.getDataFile()
        const filterData = data.filter(item => (id ? (item.id === id) : true))
        return filterData
    }
}

module.exports = new Database()