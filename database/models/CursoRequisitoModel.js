const {Model,DataTypes, Sequelize}=require('sequelize');
const sequelize=require('../db');
const Curso=require('./CursoModel');
const Requisito=require('./RequisitosModel');



class CursoRequisitoModel extends Model {}

CursoRequisitoModel.init({
    idCursoRequisito:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idCursoFK: {
        type: DataTypes.INTEGER,
       defaultValue: 3 
    },
    idRequisitosFK: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
    }
},

{
    sequelize,
    modelName:'CursoRequisito',
    timestamps: false,
     freezeTableName: true
});


CursoRequisitoModel.belongsTo(Curso, {foreignKey: "idCursoFK" });
Curso.hasMany(CursoRequisitoModel, {foreignKey: "idCursoFK" });
//mucho a mucho
CursoRequisitoModel.belongsTo(Requisito, {foreignKey: "idRequisitosFK" });
Requisito.hasMany(CursoRequisitoModel, {foreignKey: "idRequisitosFK" });
module.exports= CursoRequisitoModel;