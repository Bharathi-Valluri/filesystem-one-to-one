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
      const fileName = "student";
      const filePath = "./student.xlsx";
      let workbook = xlsx1.utils.book_new();
      var resp = [{}];
      resp = await Student.findAll({
        include: {
          model: Mark,
        },
      });
        const data = resp.map((user) => {
        return [user.Name, user.Mark.Marks1,user.Mark.Marks2];
      });
  
      console.log(data);
      let sheetData = xlsx1.utils.json_to_sheet(data);
  
      xlsx1.utils.book_append_sheet(workbook, sheetData, "Sheet 1", fileName);
  
      xlsx1.writeFile(workbook, path.resolve(filePath));
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
        
      });
    }
  };
  






module.exports = {
  addData,createExcelsheet
}
