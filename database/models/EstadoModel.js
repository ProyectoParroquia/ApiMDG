const {Model,DataTypes}=require('sequelize');
const sequelize=require('../db');

class EstadoModel extends Model {}

EstadoModel.init({
    idEstado:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombreEstado:{
        type:DataTypes.STRING(20),
        
        unique:true,
        allowNull:false,
         freezeTableName: true
       
    }
},
{
    sequelize,
    modelName:'Estado',
     timestamps: false,
     freezeTableName: true
});

module.exports=EstadoModel;