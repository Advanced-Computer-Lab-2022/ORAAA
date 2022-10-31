const express = require('express')
const router=express.Router()
const {login,selectCountry,viewCourses,filterCourses,searchForCourses,chooseCourseToView}=require('../controllers/commonControllers')
const {protect} = require('../middleWare/authMiddleware')



router.post('/login',login)
router.put('/selectCountry',protect,selectCountry)
router.get('/viewCourses',protect,viewCourses)
router.post('/filterCourses',protect,filterCourses)
router.post('/searchForCourses',protect,searchForCourses)
router.get('/chooseCourseToView',protect,chooseCourseToView)



module.exports=router