const Sequelize = require('sequelize')
const heroeschema = {
  schema: {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING,
      required: true,
    },
    poder: {
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

module.exports = heroeschema