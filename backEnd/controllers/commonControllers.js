const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Oinstructor= require('../models/instructor')
const Oadmin= require('../models/admin')
const OcorporateTrainee=require('../models/corporateTrainee')
const asyncHandler = require('express-async-handler')





//@desc  login
//@route POST /api/common/Login
//@access public
const login = asyncHandler(async(req,res)=>{
    const {userName,password} = req.body

    const Ninstructor = await Oinstructor.findOne({userName})
    const Nadmin = await Oadmin.findOne({userName})
    const NcorporateTrainee = await OcorporateTrainee.findOne({userName})
      
    if(Ninstructor && (await bcrypt.compare(password,Ninstructor.password))){
        
        res.json({
            name: Ninstructor.userName,
            token: generateToken(Ninstructor._id)
        })



    }else if(Nadmin && (await bcrypt.compare(password,Nadmin.password))){
        res.json({
            name: Nadmin.userName,
            token: generateToken(Nadmin._id)
        })


    }else if(NcorporateTrainee && (await bcrypt.compare(password,NcorporateTrainee.password))){
        res.json({
            name: NcorporateTrainee.userName,
            token: generateToken(NcorporateTrainee._id)
        })


    }else{
        res.status(400)
        throw new Error('Invalid userName or password')
    }
})







// Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}


module.exports={
    login
      

}