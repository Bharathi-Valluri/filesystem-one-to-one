const Sequelize = require('sequelize')
const sequelize = require('../database')
const Mark =require('../models/marks')
const Student = sequelize.define('Students',{
    id :{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull :true
    },
    Name:{
        type : Sequelize.STRING,
        allowNull:false
    },
},{
    freezeTableName:true,
    timestamps:false
    
    
  });
Student.hasOne(Mark,{foreignKey:"studentId",allowNull:false}),

Mark.belongsTo(Student,{foreignKey:"studentId",allowNull:false})

module.exports = Student