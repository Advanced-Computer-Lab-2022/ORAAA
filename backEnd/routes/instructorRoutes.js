const express = require('express')
const router=express.Router()
const { createCourse, getCourseTitles,filterCourses }=require('../controllers/instructorController')

router.post('/createCourse',createCourse)
router.get('/getCourseTitle',getCourseTitles)
router.get('/filterCourses',filterCourses)

module.exports=router