const {Model,DataTypes}=require('sequelize');
const sequelize=require('../db');
const CursoModel = require('./CursoModel');

class RequisitosModel extends Model {}

RequisitosModel.init({
    idRequisitos:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombreRequisitos:{
        type:DataTypes.STRING(100),
       
        unique:true,
        allowNull:false
    }
},
{
    sequelize,
    modelName:'Requisito',
     timestamps: false,
     freezeTableName: true
});


module.exports=RequisitosModel ;