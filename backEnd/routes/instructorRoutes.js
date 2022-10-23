const express = require('express')
const router=express.Router()
const { createCourse, getCourseTitles }=require('../controllers/instructorController')

router.route('/').get(getCourseTitles).post(createCourse)

module.exports=router