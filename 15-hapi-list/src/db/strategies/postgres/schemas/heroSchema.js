const Sequelize = require('sequelize')
const HeroesSchema = {
  schema: {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    power: {
      type: Sequelize.STRING,
      required: true,
    },
  },
  options: {
    //opcoes para base existente
    tableName: 'TB_heroes',
    freezeTableName: false,
    timestamps: false,

  }
}

module.exports = HeroesSchema