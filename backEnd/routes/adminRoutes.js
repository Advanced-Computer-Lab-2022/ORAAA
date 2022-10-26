const express = require('express')
const router=express.Router()

const {addInstructor,addAdmin,addCorporateTrainee }=require('../controllers/adminController')
const {protect} = require('../middleWare/authMiddleware')
router.post('/addInstructor',protect,addInstructor)
router.post('/addAdmin',protect,addAdmin)
router.post('/addCorporateTrainee',protect,addCorporateTrainee)





module.exports=router