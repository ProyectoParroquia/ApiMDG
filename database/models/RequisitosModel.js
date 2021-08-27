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
        type:DataTypes.STRING(20),
        allowNull:false
    }
},
{
    sequelize,
    modelName:'Requisito',
     timestamps: false,
     freezeTableName: true
});
CursoModel.belongsToMany(RequisitosModel, {through: "Requisito_Curso" });
RequisitosModel.belongsToMany(CursoModel, {through: "Requisito_Curso" });

module.exports=RequisitosModel ;