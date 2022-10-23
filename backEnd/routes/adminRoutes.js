const express = require('express')
const router=express.Router()

const {addInstructor,addAdmin,addCorporateTrainee }=require('../controllers/adminController')

router.post('/addInstructor',addInstructor)
router.post('/addAdmin',addAdmin)
router.post('/addCorporateTrainee',addCorporateTrainee)





module.exports=router