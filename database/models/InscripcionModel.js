const {Model,DataTypes}=require('sequelize');
const sequelize=require('../db');
const CursoModel = require('./CursoModel');
const RequisitosModel = require('./RequisitosModel');
const Usuarios = require('./usuario');


class InscripcionModel  extends Model {}

InscripcionModel.init({
    idInscripcion:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    estadoInscripcion: {
      type:DataTypes.STRING,
      allowNull:false
    },
    idCursoFK: {
      type: DataTypes.INTEGER,
     defaultValue: 3 
  },
    idUsuarioFK: {
      type: DataTypes.INTEGER,
    defaultValue: 3 
  }
},
{
    sequelize,
    modelName:'Inscripcion',
     timestamps: false
});
InscripcionModel.CursoModel = InscripcionModel.belongsTo(CursoModel, {foreignKey: "idCursoFK" });

//mucho a mucho
const InsRequi= sequelize.define('InsRequi', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  urlRequisito: DataTypes.STRING(2500)
}, 
{ timestamps: false });


InscripcionModel.Usuarios = InscripcionModel.belongsTo(Usuarios, {foreignKey: "idUsuarioFK" });

InscripcionModel.belongsToMany(RequisitosModel, {through: "InsRequi" });

RequisitosModel.belongsToMany(InscripcionModel, {through: "InsRequi" });


module.exports=InscripcionModel;