const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const usu = require('./usuario');
const serv = require('./servicio');

class servicioUsuarios extends Model {}
servicioUsuarios.init({
    
    idServicioUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    montoDonacion: {
        type: DataTypes.FLOAT,
        validate:{
            isFloat:{
                args:true,
                msg:"El monto donado tiene que ser un numero"
            },
        },
        allowNull: false,
    },
    idServicios_FK: {
        type: DataTypes.INTEGER
    },
    idUsuario_FK: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: "servicioUsuario",
    timestamps: false,
    freezeTableName: true
});

//relacion 1 a m 
servicioUsuarios.usu = servicioUsuarios.belongsTo(usu, { foreignKey: "idUsuario_FK" });
usu.servicioUsuarios = usu.hasOne(servicioUsuarios, { foreignKey: "idUsuario_FK" });


//Relacion  con tipo usuario
servicioUsuarios.serv = servicioUsuarios.belongsTo(serv, { foreignKey: "idServicio_FK" });
serv.servicioUsuarios = serv.hasOne(servicioUsuarios, { foreignKey: "idServicio_FK" });

module.exports = servicioUsuarios;