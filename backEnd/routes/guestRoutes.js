const express = require('express')
const router=express.Router()
const {searchForCourses,chooseCourseToView} = require('../controllers/commonControllers')
const {selectCountry,viewCourses,filterCourses,signup}=require('../controllers/guestControllers')



router.post('/selectCountry',selectCountry)
router.get('/viewCourses',viewCourses)
router.get('/filterCourses',filterCourses)
router.get('/searchForCourses',searchForCourses)
router.get('/chooseCourseToView',chooseCourseToView)
router.post('/signup',signup)




module.exports=router