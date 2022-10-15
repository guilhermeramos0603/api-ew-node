const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor() {
        this.NAME_FILE = 'heros.json'
    }
    async getDataFile() {
        const file = await readFileAsync(this.NAME_FILE, 'utf8')
        return JSON.parse(file.toString())
    }
    async writeHere(data) {
        await writeFileAsync(this.NAME_FILE, JSON.stringify(data))
        return true
    }


    async create(hero) {
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

    async read(id) {
        const data = await this.getDataFile()
        const filterData = data.filter(item => (id ? (item.id === id) : true))
        return filterData
    }

    async update(id, changes) {
        const data = await this.getDataFile()
        const index = data.findIndex(item => item.id === parseInt(id))
        if (index === -1) {
            throw Error('Hero not found with id informed')
        }
        const actual = data[index]
        data.splice(index, 1)

        const changesObj = JSON.parse(JSON.stringify(changes))
        const attData = Object.assign({}, actual, changesObj)
        return await this.writeHere([...data, attData])
    }

    async delete(id) {
        if (!id) {
            return await this.writeHere([])
        }
        const data = await this.getDataFile()
        const index = data.findIndex(item => item.id === parseInt(id))
        if (index === -1) {
            throw Error('Hero not found with id informed')
        }
        data.splice(index, 1)
        return await this.writeHere(data)
    }
}

module.exports = new Database()