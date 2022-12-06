const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super(),
            this._driver = null,
            this._heroes = null
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        }
        catch (err) {
            console.log('ERROR!', err)
            return false
        }
    }

    async defineModel() {
        this._heroes = this._driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                required: true,
            },
            power: {
                type: Sequelize.STRING,
                required: true,
            }
        }, {
            tableName: 'TB_HEROES',
            freezeTableName: false,
            timestamps: false
        })

        await this._heroes.sync()

    }


    async create(item) {
        const { dataValues } = await this._heroes.create(item)

        return dataValues
    }

    async read(data) {
        const result = await this._heroes.findAll({
            where: data,
            raw: true
        })

        return result
    }

    async update(id, data) {
        const result = await this._heroes.update(data,
            {
                where: { id: id }
            }
        )
        return result
    }

    async delete(id){
        let result;
        
        if(id){
            result = await this._heroes.destroy({
                where: {id: id }
            })
        }
        else{
            result = await this._heroes.destroy({where: {}})
        }


        return result
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'guilhermeramos',
            'senha',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
        await this.defineModel()
    }
}

module.exports = Postgres