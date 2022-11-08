const express= require('express')
const students=require('./models/student')
const marks=require('./models/marks')
const router =require('./routers/router')
const sequelize=require('./database')
const xlsx1=require('xlsx')
const path=require('path')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
sequelize.sync()
async function run(){
    try {
        await sequelize.authenticate()
        console.log('connected to the database')
        app.use('/',router)
        app.listen(process.env.PORT,()=>{
            console.log(`serveris running on port no:${process.env.PORT}`)
        })
    } catch (error) {
        console.log('server is not running at port 8080'+error)
    }
    }
run()
