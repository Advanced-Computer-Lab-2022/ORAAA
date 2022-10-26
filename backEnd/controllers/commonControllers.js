const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Oinstructor= require('../models/instructor')
const Oadmin= require('../models/admin')
const Ocourse= require('../models/course')
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



//@desc  select your country
//@route PUT /api/common/selectCountry
//@access private
const selectCountry = asyncHandler(async(req,res)=>{
    const {country} = req.body
    const _id=req.user.id
     const NcorporateTrainee = await OcorporateTrainee.findOne({_id})
     const Ninstructor = await Oinstructor.findOne({_id})
    
    if(Ninstructor){
        console.log('hi')
        const updateCountry= await Oinstructor.findByIdAndUpdate(_id,req.body,{new:true})
        res.status(200).json(updateCountry)

    }else if(NcorporateTrainee){
        console.log('hi')
        const updateCountry= await OcorporateTrainee.findByIdAndUpdate(_id,req.body,{new:true})
        res.status(200).json(updateCountry)

    }else{
        res.status(400)
        throw new Error('not working')
    }
})


//@desc  Viewing availble courses
//@route get /api/common/viewCourses
//@access private
const viewCourses = asyncHandler(async(req,res)=>{
    
    const _id=req.user.id
    console.log(_id)
     const NcorporateTrainee = await OcorporateTrainee.findOne({_id})
     
     if(NcorporateTrainee){
        console.log('hi')
        const Ncourse= await Ocourse.find({},{title:1,rating:1,totalHoursOfCourse:1 })
        res.status(200).json(Ncourse)

    }else{
        const Ncourse= await Ocourse.find({},{title:1,rating:1,totalHoursOfCourse:1,price:1 })
        res.status(200).json(Ncourse)
    }
})



//@desc  filtiring availble courses
//@route get /api/common/filterCourses
//@access private
const filterCourses = asyncHandler(async(req,res)=>{
    
    const _id=req.user.id
    
    
     const NcorporateTrainee = await OcorporateTrainee.findOne({_id})
     
     if(NcorporateTrainee){
       const {subject,rating} = req.body
       if(!subject && !rating){
        res.status(400)
        throw new Error('please fill the unfilled fields')
    }

    if((!subject && rating) || (subject && !rating)){
        const Ccourses = await Ocourse.find({$or:[{'subject':req.body.subject} ,{'rating':req.body.rating}]} )
        res.status(200).json(Ccourses)
    }else{
        const Ccourses = await Ocourse.find({$and:[{'subject':req.body.subject} ,{'rating':req.body.rating}]} )
        res.status(200).json(Ccourses)
    }
}else{
    const {subject,rating,price} = req.body
    if(!subject && !rating && !price){
        res.status(400)
        throw new Error('please fill the unfilled fields')
    }

    if((!subject && rating && !price) || (subject && !rating && !price) || (!subject && !rating && price)){
        const Ccourses = await Ocourse.find({$or:[{'subject':req.body.subject} ,{'rating':req.body.rating},{'price':req.body.price}]} )
        res.status(200).json(Ccourses)

    }else if(!subject && rating && price){
        const Ccourses = await Ocourse.find({$and:[{'rating':req.body.rating},{'price':req.body.price}]} )
        res.status(200).json(Ccourses)
    }else if(subject && rating && !price){
        const Ccourses = await Ocourse.find({$and:[{'subject':req.body.subject} ,{'rating':req.body.rating}]})
        res.status(200).json(Ccourses)
    }else if(subject && !rating && price){
        const Ccourses = await Ocourse.find({$and:[{'subject':req.body.subject} ,{'price':req.body.price}]} )
        res.status(200).json(Ccourses)
    }else{
        const Ccourses = await Ocourse.find({$and:[{'subject':req.body.subject} ,{'rating':req.body.rating},{'price':req.body.price}]} )
        res.status(200).json(Ccourses)
    }


}

})


//@desc  search for availble courses
//@route get /api/common/searchForCourses
//@access private
const searchForCourses = asyncHandler(async(req,res)=>{
    const {subject,title,userName} = req.body
    let _id
    if(userName){
    const Ninstructor = await Oinstructor.findOne({userName})
        _id =Ninstructor._id
    }
    
    
    if(!subject && !title && !_id){
        res.status(400)
        throw new Error('please fill the unfilled fields')
    }

    if((!subject && title && !_id) || (subject && !title && !_id) || (!subject && !title && _id)){
        const Ccourses = await Ocourse.find({$or:[{'subject':req.body.subject} ,{'title':req.body.title},{'instructorId':_id}]} )
        if(Ccourses.length!==0){
            res.status(200).json(Ccourses)
        }else{
            res.status(404)
            throw new Error('Course not found')
        }
       
    }else{
        res.status(400)
        throw new Error('Please choose only one search method')

    }

})







// Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}


module.exports={
    login,
    selectCountry,
    viewCourses,
    filterCourses,
    searchForCourses

}