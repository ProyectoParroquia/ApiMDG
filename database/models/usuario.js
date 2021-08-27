const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Credencial = require('./credenciales');
const TipoUsu = require('./tipoUsuario');
const TipoDoc = require('./tipoDoc');

class Usuarios extends Model {}
Usuarios.init({
    
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    estadoUsuario: {
        type: DataTypes.STRING(10),
        defaultValue: "Activo"
    },
    nombreUsuario: {
        type: DataTypes.STRING(25),
        validate: {
            isAlpha: {
                args: true,
               msg:"El campo Nombre solo debe tener Letras" 
            }, 
        },
        allowNull: false
    },
    apellidoUsuario: {
        type: DataTypes.STRING(25),
        validate: {
            isAlpha: {
                args: true,
               msg:"El campo Apellido solo debe tener Letras" 
            }, 
        },
        allowNull: false
    },
    
    correoUsuario: {
        type: DataTypes.STRING(40),
        validate: {
            isEmail: {
                args: true,
                msg: "El campo tiene que ser un correo valido"
            }
        },
        unique: true,
        allowNull: false
    },

    numeroDocumentoUsuario: {
        type: DataTypes.INTEGER,
        validate: {
            isNumeric:{
                 args: true,
                msg:"Solo se permiten Numeros en NumDoc"
            },
            len: {
                args: [7,11],
                msg:"NumDoc con minimo 7 y max 11 caracteres"
            }
        },
        allowNull: false
    },

    fechaNacimientoUsuario: {
        type: DataTypes.DATEONLY,
        validate: {
            isDate: {
            args: true,
            msg: "El campo de fecha esta incorrecto, ingresar fecha valida (A-M-D)"
        }
    },
        allowNull:false
    },

    idTipoUsuario_FK: {
        type: DataTypes.INTEGER,
       defaultValue: 3
    },

}, {
    sequelize,
    modelName: "Usuario",
    timestamps: false,
    freezeTableName: true
});


//Relacion con credenciales tipo 1 a 1
Usuarios.hasOne(Credencial, { foreignKey: "idUsuario_FK" });
Credencial.belongsTo(Usuarios, { foreignKey: "idUsuario_FK" });

//Relacion  con tipo usuario
 TipoUsu.hasMany(Usuarios, {as:"Usuarios", foreignKey: "idTipoUsuario_FK" });
Usuarios.belongsTo(TipoUsu, { foreignKey: "idTipoUsuario_FK" });

 //Relacion 1 a m con Tipo doc
TipoDoc.hasMany(Usuarios, {as:"Usuarios", foreignKey: "idTipoDoc_FK" });
 Usuarios.belongsTo(TipoDoc, { foreignKey: "idTipoDoc_FK" });
module.exports = Usuarios;

