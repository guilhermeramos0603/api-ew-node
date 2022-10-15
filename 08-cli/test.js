const { deepEqual, ok } = require('assert')
const Database = require('./database')

const DEFAULT_ITEM_REGISTER = { name: 'Flash', power: 'Speed', id: 1 }
const DEFAULT_ITEM_UPDATE = { name: 'Green Lantern', power: 'Ring energy', id: 2 }

describe('Hero manipulation suite', () => {
    before(async () => {
        await Database.delete();
        await Database.create(DEFAULT_ITEM_REGISTER);
        await Database.create(DEFAULT_ITEM_UPDATE);
      });
    it('Create a hero using files', async () => {
        const expected = DEFAULT_ITEM_REGISTER
        const result = await Database.create(DEFAULT_ITEM_REGISTER)
        const [actual] = await Database.read(DEFAULT_ITEM_REGISTER.id)
        deepEqual(actual, expected)
    })

    it('Read a hero using files', async () => {
        const expected = DEFAULT_ITEM_REGISTER
        const [result] = await Database.read(expected.id)
        deepEqual(result, expected)
    })

    it('Update a hero by id', async () => {
        const expected = {
            ...DEFAULT_ITEM_UPDATE,
            name: 'Batman',
            power: 'Money'
        }

        await Database.update(expected.id, {
            name: expected.name,
            power: expected.power
        })

        const [realResult] = await Database.read(expected.id)
        deepEqual(realResult, expected)

    })

    it('Delete a hero by id', async () => {
        const expected = true
        const result = await Database.delete(DEFAULT_ITEM_REGISTER.id)
        deepEqual(result, expected)

    })


})