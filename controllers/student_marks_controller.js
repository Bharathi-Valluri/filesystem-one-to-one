const Student=require('../models/student')
const Mark = require('../models/marks')
const appConst = require('../routers/constants')
const xlsx1 =require('xlsx')
const path=require('path')
21

const addData = async (req, res) => {
  try {
    const resp = await Student.create(req.body, {
      include: [
        {
          model: Mark
        }
      ]
    })

    res.status(202).json({
      status: appConst.status.success,
      response: resp,
      message: 'success'
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      status: appConst.status.fail,
      response: null,
      message: 'failed!...'
    })
  }
}
const createExcelsheet = async (req, res) => {
    try {
      const fileName = "student"
      const filePath = "./student_marks.xlsx"
      var resp = [{}];
      resp = await Student.findAll({
        include: {
          model: Mark,
        },
      });
      const data =resp.map((user) =>{
        return [user.Name,user.Mark.Marks1,user.Mark.Marks2]

      })

      let Headings = [['Name', 'Marks1', 'Marks2']]
      const workBook = xlsx1.utils.book_new()
      const ws =xlsx1.utils.json_to_sheet([])
      xlsx1.utils.sheet_add_aoa(ws, Headings)

      xlsx1.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true })
      xlsx1.utils.book_append_sheet(workBook, ws,fileName)

      xlsx1.writeFile(workBook,filePath);;
      res.status(203).json({
        status:appConst.status.success,
        response: resp,
        message:"Data inserted into excel file successfully",
      });
    } catch (error) {
      res.status(404).json({
        status:appConst.status.fail,
        response:null,
        message:"Failed to inserted the date successfully"
        
      })
    }
  }

module.exports = {
  addData,createExcelsheet
}
