const { equal, deepEqual, ok } = require('assert');
const PostgresStrategy = require('../../src/db/strategies/postgres/postgresSQLStrategy');
const heroeschema = require('../../src/db/strategies/postgres/schemas/heroeschema');
const Context = require('../../src/db/strategies/base/contextStrategy');
const MOCK_HERO_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flexas' };
const MOCK_HERO_ATUALIZAR = { nome: 'Mulher Gavião', poder: 'grito' };

let context = {}

describe('PostgreSQL Strategy', function () {
  this.timeout(Infinity);
  before(async () => {
    const connection = await PostgresStrategy.connect()
    const model = await PostgresStrategy.defineModel(connection, heroeschema)
    context = new Context(new PostgresStrategy(connection, model));

    await context.delete();
    await context.create(MOCK_HERO_CADASTRAR);
    await context.create(MOCK_HERO_ATUALIZAR);
  });

  it('PostgresSQL connection', async () => {
    const result = await context.isConnected();
    equal(result, true);
  });

  it('cadastrar', async () => {
    const result = await context.create(MOCK_HERO_CADASTRAR);
    delete result.dataValues.id;
    deepEqual(result.dataValues, MOCK_HERO_CADASTRAR);
  });

  it('listar', async () => {
    const [result] = await context.read(MOCK_HERO_CADASTRAR);
    delete result.id;
    deepEqual(result, MOCK_HERO_CADASTRAR);
  });

  it('atualizar', async () => {
    const [result] = await context.read({});

    const novoItem = {
      ...MOCK_HERO_CADASTRAR,
      nome: 'Mulher Maravilha',
    };
    const [update] = await context.update(result.id, novoItem);

    deepEqual(update, 1);
  });

  it('remover', async () => {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    deepEqual(result, 1);
  });
});
