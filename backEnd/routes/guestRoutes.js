const express = require('express')
const router=express.Router()
const {searchForCourses} = require('../controllers/commonControllers')
const {selectCountry,viewCourses,filterCourses}=require('../controllers/guestControllers')



router.post('/selectCountry',selectCountry)
router.get('/viewCourses',viewCourses)
router.get('/filterCourses',filterCourses)
router.get('/searchForCourses',searchForCourses)



module.exports=router