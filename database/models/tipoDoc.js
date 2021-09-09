const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class tipoDoc extends Model {}
tipoDoc.init({
    
    idTipoDocumento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    denominacionTipoDocumento: {
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
            msg:"El Tipo de Documento ingresado ya existe"
        } ,
    }
}, {
    sequelize,
    modelName: "tipoDoc",
    timestamps: false,
    freezeTableName: true
});

module.exports = tipoDoc;