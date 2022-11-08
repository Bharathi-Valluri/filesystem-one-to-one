const Sequelize =require('sequelize')
const sequelize  = require('../database')
const Student =require('../models/student')
const Mark = sequelize.define('Marks',{
    // tableName: 'Address',
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull : true
    },
    Marks1:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    Marks2:{
        type:Sequelize.INTEGER,
        allowNull:false
    }       
    }, {
        freezeTableName:true,
        timestamps:false
        
      })
      
    
    module.exports = Mark