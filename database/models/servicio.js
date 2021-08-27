const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const TipoServicio = require('./tipoServicio');

class servicio extends Model {}
servicio.init({
    
    idServicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    estadoServicio: {
        type: DataTypes.STRING(25),
        defaultValue:"En proceso"
    },
    fechaServicio: {
      type: DataTypes.DATE,
        allowNull:false  
    },
    peticionServicio: {
        type: DataTypes.STRING(40),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "servicio",
    timestamps: false,
    freezeTableName: true
});

servicio.TipoServicio = servicio.belongsTo(TipoServicio, { foreignKey: "idTipoServicio_FK" });

module.exports = servicio;