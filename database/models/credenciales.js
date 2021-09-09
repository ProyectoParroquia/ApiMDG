const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Credenciales extends Model {}
Credenciales.init({
     idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: {
            args: true,
            msg: "El dato Usuario ya existe"
        } 
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    sequelize,
    modelName: "credencial",
    timestamps: false,
    freezeTableName: true
});

module.exports = Credenciales;