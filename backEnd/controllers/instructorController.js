//ask in private and public
//const { text } = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const OCourse = require('../models/course')
const Oinstructor= require('../models/instructor')









//@desc Instructor creates a course
//@route POST /api/instructor/createCourse
//@access private
const createCourse= asyncHandler(async(req,res)=>{
    const {_id} = await Oinstructor.findById(req.user.id)
    const instructorId = _id
    const{title, price,shortSummery , subTitle,subject,totalHoursOfCourse,rating} = req.body
    if(!title || !price || !shortSummery || !subTitle || !subject || !totalHoursOfCourse){
        res.status(400)
        throw new Error('Please Fill All The UnFilled Fields')
    }
    const Ncourse=await OCourse.create({
        instructorId,
        title, 
        price,
        shortSummery, 
        subject,
        subTitle,
        totalHoursOfCourse,
        rating
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

//@desc Instructor gets all his course titles
//@route get /api/instructor/getCourseTitle
//@access private
const getCourseTitles= asyncHandler(async(req,res)=>{
    const {_id} = await Oinstructor.findById(req.user.id)
    const Ctitles = await OCourse.find({'instructorId':_id},{title:1,_id:0 })
    res.status(200).json(Ctitles)
})

//@desc Instructor filters a course based on price or subject
//@route get /api/instructor/filterCourses
//@access private
const filterCourses= asyncHandler(async(req,res)=>{
    const {_id} = await Oinstructor.findById(req.user.id)
    const Ccourses = await OCourse.find({$and:[{$or:[{'subject':req.body.subject} ,{'price':req.body.price}]},{'instructorId':_id}]} )
    res.status(200).json(Ccourses)
    
})

//@desc Instructor searches for his courses based on title or subject
//@route get /api/instructor/searchInstructorCourses
//@access private
const searchInstructorCourses= asyncHandler(async(req,res)=>{
    const {_id} = await Oinstructor.findById(req.user.id)
    const Ccourses = await OCourse.find({$and:[{$or:[{'subject':req.body.keyword} ,{'title':req.body.keyword}]},{'instructorId':_id}]} )
    res.status(200).json(Ccourses)
    
})


module.exports={
    createCourse,
    getCourseTitles,
    filterCourses,
    searchInstructorCourses
    
}