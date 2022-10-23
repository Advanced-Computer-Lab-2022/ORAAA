const express = require('express')
const router = express.Router()
const {getdata,setdata,updatedata,deletedata}= require('../controllers/dataController')

router.route('/').get(getdata).post(setdata)
router.route('/:id').put(updatedata).delete(deletedata)



module.exports=router