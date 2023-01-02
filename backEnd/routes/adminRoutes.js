const express = require('express')
const router=express.Router()

const {addInstructor,addAdmin,addCorporateTrainee,getRequests}=require('../controllers/adminController')
const {protect} = require('../middleWare/authMiddleware')
router.post('/addInstructor',protect,addInstructor)
router.post('/addAdmin',protect,addAdmin)
router.post('/addCorporateTrainee',protect,addCorporateTrainee)
router.get('/getRequests',protect,getRequests)





module.exports=router