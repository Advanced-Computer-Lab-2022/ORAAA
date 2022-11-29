const express = require('express')
const router=express.Router()
const {login,selectCountry,viewCourses,filterCourses,searchForCourses,chooseCourseToView,rateCourses,rateInstructor,changePassword}=require('../controllers/commonControllers')
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



module.exports=router