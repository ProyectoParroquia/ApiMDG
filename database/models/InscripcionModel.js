const {Model,DataTypes}=require('sequelize');
const sequelize=require('../db');
const CursoModel = require('./CursoModel');
const Estado = require('./EstadoModel');
const Usuarios = require('./usuario');



class InscripcionModel  extends Model {}

InscripcionModel.init({
    idInscripcion:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idEstadoFK:{
      type:DataTypes.INTEGER,
      defaultValue: 1
  },

    fechaInscripcion:{
      type:'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
    idCursoFK: {
      type: DataTypes.INTEGER,
  }
},

{
    sequelize,
    modelName:'Inscripcion',
    timestamps: false,
    freezeTableName: true
});
 InscripcionModel.belongsTo(CursoModel, {foreignKey: "idCursoFK" });
  CursoModel.hasMany(InscripcionModel, {foreignKey: "idCursoFK" });
  
  InscripcionModel.belongsTo(Estado, {foreignKey: "idEstadoFK" });
Estado.hasMany(InscripcionModel, { foreignKey: "idEstadoFK" });

InscripcionModel.belongsTo(Usuarios, {foreignKey: "idUsuarioFK" });
Usuarios.hasMany(InscripcionModel, { foreignKey: "idUsuarioFK" });


module.exports=InscripcionModel;