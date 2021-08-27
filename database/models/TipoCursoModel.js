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
        allowNull:false
    }
},
{
    sequelize,
    modelName:'TipoCurso',
     timestamps: false
});

module.exports=TipoCursoModel;