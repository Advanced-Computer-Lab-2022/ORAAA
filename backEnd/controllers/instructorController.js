//ask in private and public
//const { text } = require('express')
const asyncHandler = require('express-async-handler')
const OCourse = require('../models/course')










//@desc Instructor creates a course
//@route POST /api/instructor
//@access private
const createCourse= asyncHandler(async(req,res)=>{
    const{title, price,shortSummery , subTitle,instructorId,subject} = req.body
    if(!title || !price || !shortSummery || !subTitle || !instructorId || !subject){
        res.status(400)
        throw new Error('Please Fill All The UnFilled Fields')
    }
    const Ncourse=await OCourse.create({
        instructorId,
        title, 
        price,
        shortSummery, 
        subject,
        subTitle
    })
    if(Ncourse){
        res.status(201).json({
            title:Ncourse.title,
            price:Ncourse.price,
            shortSummery:Ncourse.shortSummery, 
            subject:Ncourse.subject,
            subTitle:Ncourse.subTitle
        })
    }else{
        res.status(400)
        throw new Error('Invalid Course Data')
    }
   
})

const getCourseTitles= asyncHandler(async(req,res)=>{
    const Ctitles = await OCourse.find({'instructorId':req.body.ID},{title:1,_id:0 })
    res.status(200).json(Ctitles)
})

const filterCourses= asyncHandler(async(req,res)=>{
    
    const Ccourses = await OCourse.find({$and:[{$or:[{'subject':req.body.subject} ,{'price':req.body.price}]},{'instructorId':req.body.ID}]} )
    res.status(200).json(Ccourses)
    
})


module.exports={
    createCourse,
    getCourseTitles,
    filterCourses
}