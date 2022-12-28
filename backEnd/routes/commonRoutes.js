const express = require('express')
const router=express.Router()
const {login,selectCountry,viewCourses,filterCourses,searchForCourses,chooseCourseToView,rateCourses,rateInstructor,changePassword,getCourseInfo,getCourse,getSubTitleExam,forgotPassword,changePasswordF,getProgress,checkout,addEnrolledCourse}=require('../controllers/commonControllers')
const {protect} = require('../middleWare/authMiddleware')



router.post('/login',login)
router.put('/selectCountry',protect,selectCountry)
router.get('/viewCourses',protect,viewCourses)
router.post('/filterCourses',protect,filterCourses)
router.post('/searchForCourses',protect,searchForCourses)
router.get('/chooseCourseToView',protect,chooseCourseToView)
router.put('/rateCourses',protect,rateCourses)
router.put('/rateInstructor',protect,rateInstructor)
router.put('/changePassword',protect,changePassword)
router.get('/getCourseInfo',protect,getCourseInfo)
router.get('/getCourse',protect,getCourse)
router.get('/getSubTitleExam',protect,getSubTitleExam)
router.post('/forgotPassword',forgotPassword)
router.put('/changePasswordF',changePasswordF)
router.get('/getProgress',protect,getProgress)
router.post('/checkout',protect,checkout)
router.put('/addEnrolledCourse',protect,addEnrolledCourse)


module.exports=router