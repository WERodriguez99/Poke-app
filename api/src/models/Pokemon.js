const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    /* id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }, */

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    sprite_front: {
      type: DataTypes.TEXT,
      get() {
        return this.getDataValue('sprite_front') || "https://img.icons8.com/color/50/000000/egg-pokemon.png"
      }
    },

    hp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    attack: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    defense: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    special_attack: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    special_defense: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    speed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    height: {
      type: DataTypes.FLOAT,
      allowNull: true
    },

    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },

    mine: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }

  });
};
