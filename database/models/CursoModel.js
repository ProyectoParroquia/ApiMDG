const {Model,DataTypes}=require('sequelize');
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
        allowNull:false
    },
    nombreCurso:{
        type:DataTypes.STRING,
        allowNull:false,
        unique : true
    },
    fechaInicialCurso:{
        type:DataTypes.DATE,
        allowNull:false,
        unique : false
    },
    fechaFinalCurso:{
        type:DataTypes.DATE,
        allowNull:false,
        unique : false
    },
    costoCurso:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            isFloat:{
                args:true,
                msg:"El COSTO DEL CURSO tiene que ser un numero"
            },
            // min:{
            //     args:1000
            // }
        }
    },
    imagenCurso:{
        type:DataTypes.STRING,
        allowNull:false,
        unique : true
    },
    idTipoCursoFK: {
        type: DataTypes.INTEGER,
       defaultValue: 3 
    }
},

{
    sequelize,
    modelName:'Curso',
    timestamps: false,
    
});


CursoModel.TipoCurso = CursoModel.belongsTo(TipoCurso, {foreignKey: "idTipoCursoFK" });
//mucho a mucho


module.exports=CursoModel;