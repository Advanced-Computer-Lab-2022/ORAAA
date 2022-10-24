const jwt = require('jsonwebtoken')
const asyncHandler= require('express-async-handler')
const Oinstructor = require('../models/instructor')

const protect = asyncHandler(async(req,res,next)=>{
let token

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
       //get token from header
       token = req.headers.authorization.split(' ')[1]
       
       //verifytoken
       const decoded = jwt.verify(token, process.env.JWT_SECRET)

       //get user from token
       req.Ninstructor= await Oinstructor.findById(decoded.id).select('-password')
       
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