const {Model,DataTypes, Error}=require('sequelize');
const sequelize=require('../db');
const TipoCurso = require('./TipoCursoModel');

class CursoModel extends Model {}

CursoModel.init({
    idCurso:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    estadoCurso:{
        type:DataTypes.STRING,
        defaultValue: "Activo"
    },
    nombreCurso:{
        type:DataTypes.STRING,
        unique : true,
        allowNull:false,
        
    },
     descriCurso:{
        type:DataTypes.STRING,
        unique : true,
        allowNull:false,
        
    },
    fechaInicialCurso:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        unique : false,
        validate:{
            isDate:{
                args:true,
                msg:"la fecha debe estar en formato yy-mm-dd"
            },
           }
    },
    fechaFinalCurso:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        unique : false,
        validate:{
            isDate:{
                args:true,
                msg:"la fecha debe estar en formato yy-mm-dd"

            },
           
           
        }
    },
    costoCurso:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            isFloat:{
                args:true,
                msg:"El COSTO DEL CURSO tiene que ser un numero",
                
            },
             min:{
             args:60000,
             msg:"El COSTO DEL CURSO debe ser mayor a 60mil"
         },
        
         }
        
    },
    imagenCurso:{
        type:DataTypes.STRING,
        allowNull:false
    },
    idTipoCursoFK: {
        type: DataTypes.INTEGER,
       defaultValue: 1 
    }
},

{
    sequelize,
    modelName:'Curso',
    timestamps: false,
     freezeTableName: true
});


CursoModel.belongsTo(TipoCurso, {foreignKey: "idTipoCursoFK" });
TipoCurso.hasMany(CursoModel, {foreignKey: "idTipoCursoFK" });
//mucho a mucho
module.exports=CursoModel;