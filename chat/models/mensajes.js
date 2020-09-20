const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Mensajes extends Model {}

Mensajes.init(
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ts: 
    {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Mensajes",
  }
);

Mensajes.sync();

module.exports = Mensajes;