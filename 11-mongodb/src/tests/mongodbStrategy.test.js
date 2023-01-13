const assert = require('assert')
const MongoDB = require('./../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')

const MOCK_HERO_REGISTER = {
    name: 'Flash',
    power: 'bullwhip'
}


const context = new Context(new MongoDB())

describe('MongoDB tests suits', function () {
    this.beforeAll(async () => {
        await context.connect()
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
})