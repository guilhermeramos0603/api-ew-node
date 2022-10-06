const { deepEqual, ok } = require('assert')
const Database = require('./database')

const DEFAULT_ITEM_REGISTER = {name:'Flash', power: 'Speed', id: 1} 

describe('Hero manipulation suite', () => {
    it('Search a hero using files', async () => {
        const expected = DEFAULT_ITEM_REGISTER 
        const [result] = await Database.list(expected.id)
        deepEqual(result, expected)
    })
})