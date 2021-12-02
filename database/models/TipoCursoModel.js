const {Model,DataTypes}=require('sequelize');
const sequelize=require('../db');

class TipoCursoModel extends Model {}

TipoCursoModel.init({
    idTipoCurso:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombreTipoCurso:{
        type:DataTypes.STRING(20),
        validate: {
            isAlpha: {
                args: true,
               msg:"El campo Nombre solo debe tener Letras" 
            }, 
        },
        unique:true,
        allowNull:false,
         freezeTableName: true
       
    }
},
{
    sequelize,
    modelName:'TipoCurso',
     timestamps: false,
     freezeTableName: true
});

module.exports=TipoCursoModel;