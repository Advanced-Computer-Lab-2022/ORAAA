const express = require('express')
const router=express.Router()
const { createCourse, getCourseTitles,filterCourses}=require('../controllers/instructorController')

const {protect} = require('../middleWare/authMiddleware')
router.post('/createCourse',protect,createCourse)
router.get('/getCourseTitle',protect,getCourseTitles)
router.get('/filterCourses',filterCourses)


module.exports=router