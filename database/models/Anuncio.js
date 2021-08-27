const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuarios = require('./usuario');

class Anuncio extends Model {}
Anuncio.init({
    
    idAnuncio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    
    estadoAnuncio: {
        type: DataTypes.STRING(10),
        defaultValue: "Activo"
    },

    mensajeAnuncio: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    fechaInicio: {
        type: DataTypes.DATE,
        validate:{
            isDate: true,
            isAfter: "2021-08-12",
        },
        allowNull: false
    },
    
    fechaFinal: {
        type: DataTypes.DATE,
        validate:{
            isDate: true,
            isAfter: "2021-08-12",
        },
        allowNull: false   
    },
    UsuarioFK: {
        type: DataTypes.INTEGER,
       defaultValue: 1 
    }

}, {
    sequelize,
    modelName: "Anuncio",
    timestamps: false,
    freezeTableName: true
});

Anuncio.Usuarios = Anuncio.belongsTo(Usuarios, {foreignKey: "UsuarioFK" });

module.exports = Anuncio;
