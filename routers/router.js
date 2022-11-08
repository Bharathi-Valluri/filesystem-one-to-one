const student_controller =require('../controllers/student_controller')
const router=require('express').Router()
router.post('/saveData',student_controller.addData)
router.get('/createExcelFile',student_controller.createExcelsheet)

module.exports =router