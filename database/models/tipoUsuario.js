const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class tipoUsuario extends Model {}
tipoUsuario.init({
    
    idTipoUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreTipoUsuario: {
        type: DataTypes.STRING(25),
        validate: {
            isAlpha: {
                args: true,
               msg:"El campo Nombre solo debe tener Letras" 
            }, 
        },
        allowNull: false,
        unique: {
            args: true,
            msg:"El Tipo de Usuario ingresado ya existe"
        } ,
    }
}, {
    sequelize,
    modelName: "tipoUsuario",
    timestamps: false,
    freezeTableName: true
});

module.exports = tipoUsuario;