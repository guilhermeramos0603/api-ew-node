const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())

const MOCK_HERO_STORE = {
    name: 'Gaviao Negro',
    power: 'Arrows'
}

const MOCK_HERO_UPDATE = {
    name: 'Batman',
    power: 'Money'
}

describe('Postgres Strategy', function (){
    this.timeout(Infinity)
    this.beforeAll(async function (){
        await context.connect()
        await context.delete()
        await context.create(MOCK_HERO_UPDATE)
    })

    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('Store', async function (){
        const result = await context.create(MOCK_HERO_STORE)
        delete result.id
        assert.deepEqual(result, MOCK_HERO_STORE)
    })

    it('Read', async function (){
        const [result] = await context.read({name: MOCK_HERO_STORE.name})
        delete result.id
        assert.deepEqual(result, MOCK_HERO_STORE)
    })

    it('Update', async function (){
        const [itemUpdate] = await context.read({ name: MOCK_HERO_UPDATE.name})
        const newItem = {
            ...MOCK_HERO_UPDATE,
            name: 'Super-girl'
        }

        const [result] = await context.update(itemUpdate.id, newItem)

        const [itemUpdated] = await context.read({id: itemUpdate.id})
        assert.deepEqual(result, 1)
        assert.deepEqual(itemUpdated.name, newItem.name)

    })

    it('Delete by id', async function (){
        const [item] = await context.read({})
        const result = await context.delete(item.id)


        assert.deepEqual(result, 1)
    })
})