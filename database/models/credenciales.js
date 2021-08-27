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
        unique: true
    },
    password: {
        type: DataTypes.STRING(250),
        validate: {
            is: {
                args: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                msg:"La contraseña debe tener min 8 caracteres, 1 Letra mayuscula, 1 Minuscula y un simbolo"
            },
        },
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