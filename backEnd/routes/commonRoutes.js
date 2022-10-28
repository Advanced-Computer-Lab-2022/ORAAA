const express = require('express')
const router=express.Router()
const {login,selectCountry,viewCourses,filterCourses,searchForCourses,chooseCourseToView}=require('../controllers/commonControllers')
const {protect} = require('../middleWare/authMiddleware')



router.post('/login',login)
router.put('/selectCountry',protect,selectCountry)
router.get('/viewCourses',protect,viewCourses)
router.get('/filterCourses',protect,filterCourses)
router.get('/searchForCourses',protect,searchForCourses)
router.get('/chooseCourseToView',protect,chooseCourseToView)



module.exports=router