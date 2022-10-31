const express = require('express')
const router=express.Router()
const { createCourse, getCourseTitles,filterCourses,searchInstructorCourses}=require('../controllers/instructorController')

const {protect} = require('../middleWare/authMiddleware')
router.post('/createCourse',protect,createCourse)
router.get('/getCourseTitle',protect,getCourseTitles)
router.get('/filterCourses',protect,filterCourses)
router.post('/searchInstructorCourses',protect,searchInstructorCourses)


module.exports=router