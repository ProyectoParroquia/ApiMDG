const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class tipoServicio extends Model {}
tipoServicio.init({
    
    idTipoServicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    denominacionServicio: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true
    },
    Estado: {
        type: DataTypes.STRING(20),
        defaultValue: "Activo"
    }
}, {
    sequelize,
    modelName: "tipoServicio",
    timestamps: false,
    freezeTableName: true
});

module.exports = tipoServicio;