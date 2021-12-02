const {Model,DataTypes}=require('sequelize');
const sequelize=require('../db');
const Inscripcion=require('./InscripcionModel');
const CursoRequisito=require('./CursoRequisitoModel');




class InscriRequiModel extends Model {}

InscriRequiModel.init({
    idInscriRequi:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    urlRequisito:{
        type:DataTypes.STRING,
        
        allowNull:false
    },
   
    idInscripcionFK: {
        type: DataTypes.INTEGER,
       defaultValue: 3 
    },
    idCursoRequisitoFK: {
        type: DataTypes.INTEGER,
       defaultValue: 3 
    }
},

{
    sequelize,
    modelName:'InscriRequi',
    timestamps: false,
     freezeTableName: true
});


InscriRequiModel.belongsTo(Inscripcion, {foreignKey: "idInscripcionFK" });
Inscripcion.hasMany(InscriRequiModel, {foreignKey: "idInscripcionFK" });
//mucho a mucho
InscriRequiModel.belongsTo(CursoRequisito, {foreignKey: "idCursoRequisitoFK" });
CursoRequisito.hasMany(InscriRequiModel, {foreignKey: "idCursoRequisitoFK" });


module.exports= InscriRequiModel ;