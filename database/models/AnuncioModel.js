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

    tituloAnuncio:{
        type: DataTypes.STRING(25),
        allowNull:false,
        unique : true,
    },
    
    estadoAnuncio: {
        type: DataTypes.STRING(10),
        defaultValue: "Activo"
    },

    mensajeAnuncio: {
        type: DataTypes.STRING(500),
        allowNull: false

    },

    fechaInicio: {
        type:'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    
    fechaFinal: {
        type: DataTypes.DATEONLY,
        allowNull: false   
    },
   UsuarioFK: {
       type: DataTypes.INTEGER,
       defaultValue:1, 
    },
    imagenAnuncio:{
        type:DataTypes.STRING,
    },

}, {
    sequelize,
    modelName: "Anuncio",
    timestamps: false,
    freezeTableName: true
});

Usuarios.hasMany(Anuncio, {as:"Anuncio", foreignKey: "UsuarioFK" });
Anuncio.belongsTo(Usuarios, { foreignKey: "UsuarioFK" });



module.exports = Anuncio;