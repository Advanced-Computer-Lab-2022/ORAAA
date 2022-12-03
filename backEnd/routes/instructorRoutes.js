const express = require('express')
const router=express.Router()
const { createCourse, getCourseTitles,filterCourses,searchInstructorCourses,editEmailOrMiniBio,viewRateReview}=require('../controllers/instructorController')

const {protect} = require('../middleWare/authMiddleware')
router.post('/createCourse',protect,createCourse)
router.get('/getCourseTitle',protect,getCourseTitles)
router.post('/filterCourses',protect,filterCourses)
router.post('/searchInstructorCourses',protect,searchInstructorCourses)
router.put('/editEmailOrMiniBio',protect,editEmailOrMiniBio)
router.get('/viewRateReview',protect,viewRateReview)


module.exports=router