const jwt = require('jsonwebtoken')
const asyncHandler= require('express-async-handler')
const Oinstructor = require('../models/instructor')
const Oadmin= require('../models/admin')
const OcorporateTrainee=require('../models/corporateTrainee')
const OindividualTrainee=require('../models/individualTrainee')


const protect = asyncHandler(async(req,res,next)=>{
let token

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
       //get token from header
       token = req.headers.authorization.split(' ')[1]
       
       //verifytoken
       const decoded = jwt.verify(token, process.env.JWT_SECRET)

       //get user from token
       req.user= await Oinstructor.findById(decoded.id).select('-password')
       if(!req.user){
        req.user= await Oadmin.findById(decoded.id).select('-password')
       }
       if(!req.user){
        req.user= await OcorporateTrainee.findById(decoded.id).select('-password')
       }
       if(!req.user){
        req.user= await OindividualTrainee.findById(decoded.id).select('-password')
       }
       
       
       
       next()
    } catch (error) {
        res.status(401)
        throw new Error('Not authorized')

    }
}
if(!token){
    res.status(401)
    throw new Error('Not Authorized')
}


})


module.exports = {protect}