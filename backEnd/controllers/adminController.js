//const { text } = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler=require('express-async-handler')
const Oinstructor =require('../models/instructor')
const Oadmin=require('../models/admin')
const OcorporateTrainee=require('../models/corporateTrainee')

//@desc  admin adds an instructor
//@route POST /api/admin/addInstructor
//@access private
const addInstructor= asyncHandler(async(req,res)=>{
    const{userName,password} = req.body

    //make sure that the fields are filled
    if(!userName || !password){
        res.status(400)
        throw new Error('Please Fill All The UnFilled Fields')
    }
    
    //check if instructor exists
    const instructorExist = await Oinstructor.findOne({userName})
    if(instructorExist){
        res.status(400)
        throw new Error('Instructor already Exists')

    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPaasword = await bcrypt.hash(password,salt)


    //create Instructor
    const Ninstructor=await Oinstructor.create({
        userName,
        password: hashedPaasword
    })

    if(Ninstructor){
        res.status(201).json({
            userName:Ninstructor.userName,
            
                        
        })
    }else{
        res.status(400)
        throw new Error('Invalid Instructor Data')
    }
   
})


//@desc  admin adds another admin
//@route POST /api/admin/addAdmin
//@access private
const addAdmin= asyncHandler(async(req,res)=>{
    const{userName,password} = req.body
    if(!userName || !password){
        res.status(400)
        throw new Error('Please Fill All The UnFilled Fields')
    }
    const Nadmin=await Oadmin.create({
        userName,
        password
    })
    if(Nadmin){
        res.status(201).json({
            userName:Nadmin.userName,
                        
        })
    }else{
        res.status(400)
        throw new Error('Invalid Instructor Data')
    }
   
})

//@desc  admin adds a CorporateTrainee
//@route POST /api/admin/addCorporateTrainee
//@access private
const addCorporateTrainee= asyncHandler(async(req,res)=>{
    const{userName,password} = req.body
    if(!userName || !password){
        res.status(400)
        throw new Error('Please Fill All The UnFilled Fields')
    }
    const NcorporateTrainee=await OcorporateTrainee.create({
        userName,
        password
    })
    if(NcorporateTrainee){
        res.status(201).json({
            userName:NcorporateTrainee.userName,
                        
        })
    }else{
        res.status(400)
        throw new Error('Invalid Instructor Data')
    }
   
})





module.exports={
    addInstructor,addAdmin,addCorporateTrainee
}