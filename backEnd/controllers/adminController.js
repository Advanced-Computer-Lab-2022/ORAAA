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
    const{userName,password,country} = req.body

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
    const hashedPassword = await bcrypt.hash(password,salt)


    //create Instructor
    const Ninstructor=await Oinstructor.create({
        userName,
        password: hashedPassword,
        country

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
    //check if Admin exists
    const adminExist = await Oadmin.findOne({userName})
    if(adminExist){
        res.status(400)
        throw new Error('Admin already Exists')

    }

     //Hash password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password,salt)


    //create admin
    const Nadmin=await Oadmin.create({
        userName,
        password: hashedPassword
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
    const{userName,password,country} = req.body
    if(!userName || !password){
        res.status(400)
        throw new Error('Please Fill All The UnFilled Fields')
    }

     //check if corporateTrainee exists
     const corporateTraineeExist = await OcorporateTrainee.findOne({userName})
     if(corporateTraineeExist){
         res.status(400)
         throw new Error('corporateTrainee already Exists')
 
     }
 
      //Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)





    //create corporateTrainee
    const NcorporateTrainee=await OcorporateTrainee.create({
        userName,
        password: hashedPassword,
        country
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