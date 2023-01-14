const assert = require('assert')
const MongoDB = require('./../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')

const MOCK_HERO_REGISTER = {
    name: 'Flash',
    power: 'bullwhip'
}

const MOCK_HERO_UPDATE = {
    name: 'Patolino',
    power: 'Speed'
}

let MOCK_HERO_ID;

const context = new Context(new MongoDB())

describe('MongoDB tests suits', function () {
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HERO_REGISTER)
        const result = await context.create(MOCK_HERO_UPDATE)
        MOCK_HERO_ID = result._id
    })
    it('MongoDB Connection', async function () {
        const result = await context.isConnected()
        console.log('RESULT', result)
        assert.equal(result, 'Conectado')
    })

    it('Create', async () => {
        const { name, power } = await context.create(MOCK_HERO_REGISTER)

        assert.deepEqual({ name, power }, MOCK_HERO_REGISTER)
    })

    it('List ', async () => {
        const [{ name, power }] = await context.read({ name: MOCK_HERO_REGISTER.name })
        const result = {
            name, power
        }
        assert.deepEqual(result, MOCK_HERO_REGISTER)
    })

    it('Update ', async () => {
        const result = await context.update(MOCK_HERO_ID, { name: 'Pernalonga' })

        assert.deepEqual(result.modifiedCount, 1)
    })

    it('Delete ', async () => {
        const result = await context.delete(MOCK_HERO_ID)

        assert.deepEqual(result.deletedCount, 1)
    })
})