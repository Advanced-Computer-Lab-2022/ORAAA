//ask in private and public
//const { text } = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const OCourse = require('../models/course')
const Oinstructor= require('../models/instructor')
const { findByIdAndUpdate } = require('../models/course')
const OsubTitle=require('../models/subTitle')
const Oexam=require('../models/exam')









//@desc Instructor creates a course
//@route POST /api/instructor/createCourse
//@access private
const createCourse= asyncHandler(async(req,res)=>{
    const {_id} = await Oinstructor.findById(req.user.id)
    const instructorId = _id
    const{title, price,shortSummery ,subject,totalHoursOfCourse,rating,link,subTitleName,subTitleHours,subTitleDesc,flag,question,answer1,answer2,answer3,answer4,rightAnswer,examflag,previewLink} = req.body
    var counter= Number(((await OCourse.find()).length)+1)
    var subTitleCounter= Number(((await OsubTitle.find({'counter':counter})).length)+1)
    if(examflag){
        if(!question || !answer1 || !answer2  || !answer3 || !answer4 || !rightAnswer){
            res.status(400)
            throw new Error('Please Fill All The UnFilled Fields')
        }
        var answers=[]
        answers.push(answer1)
        answers.push(answer2)
        answers.push(answer3)
        answers.push(answer4)
        
        const Nexam=await Oexam.create({
            counter,
            subTitleCounter,
            question,
            answers,
            rightAnswer,


        })

        if(Nexam){
            res.status(201).json('Done')
        }else{
            res.status(400)
            throw new Error('Invalid Exam Data')
        }



    }else if(!flag){
    if(!title || !price || !shortSummery  || !subject || !totalHoursOfCourse || !previewLink){
        res.status(400)
        throw new Error('Please Fill All The UnFilled Fields')
    }
    
    
    const Ncourse=await OCourse.create({
        instructorId,
        counter,
        title, 
        price,
        shortSummery, 
        subject,
        totalHoursOfCourse,
        rating,
        previewLink
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
}else{
    if(!link || !subTitleName || !subTitleHours || !subTitleDesc){
        res.status(400)
        throw new Error('Please Fill All The UnFilled Fields')
    }
    const NsubTitle=await OsubTitle.create({
        counter,
        subTitleCounter,
        link,
        subTitleName,
        subTitleHours,
        subTitleDesc,
    })
    if(NsubTitle){
        res.status(201).json('Done')
    }else{
        res.status(400)
        throw new Error('Invalid Course Data')
    }

}
   
})

//@desc Instructor gets all his course titles
//@route get /api/instructor/getCourseTitle
//@access private
const getCourseTitles= asyncHandler(async(req,res)=>{
    const {_id} = await Oinstructor.findById(req.user.id)
    const Ctitles = await OCourse.find({'instructorId':_id},{title:1,rating:1,review:1,_id:0 })
    res.status(200).json(Ctitles)
})

//@desc Instructor filters a course based on price or subject
//@route get /api/instructor/filterCourses
//@access private
const filterCourses= asyncHandler(async(req,res)=>{
    const {_id} = await Oinstructor.findById(req.user.id)
    const Ccourses = await OCourse.find({$and:[{$or:[{'subject':req.body.subject} ,{'price':req.body.price}]},{'instructorId':_id}]} )
    if(Ccourses.length===0){
        res.status(404)
        throw new Error('Course Not Found')
    }else{
    res.status(200).json(Ccourses)
    }
})

//@desc Instructor searches for his courses based on title or subject
//@route get /api/instructor/searchInstructorCourses
//@access private
const searchInstructorCourses= asyncHandler(async(req,res)=>{
    const {_id} = await Oinstructor.findById(req.user.id)
    const Ccourses = await OCourse.find({$and:[{$or:[{'subject':req.body.keyword} ,{'title':req.body.keyword}]},{'instructorId':_id}]} )
  
    if(Ccourses.length!==0){
        res.status(200).json(Ccourses)
    }else{
        res.status(400)
        throw new Error('Course Not Found')
    }
    
})


//@desc Instructor edits his/her email or mini bio
//@route PUT /api/instructor/searchInstructorCourses
//@access private
const editEmailOrMiniBio= asyncHandler(async(req,res)=>{
    const _id =req.user.id
    
   if(_id && (req.body.email || req.body.miniBio)){
      const Ninstructor= await Oinstructor.findById(_id)
      if(req.body.email!=="")
      Ninstructor.email=req.body.email
      if(req.body.miniBio!=="")
      Ninstructor.miniBiography=req.body.miniBio
      await Oinstructor.findByIdAndUpdate(_id,Ninstructor,{new:true})
      res.status(200).json('Done')
     }else{
      res.status(400)
      throw new Error('not working')
   }

    
})


module.exports={
    createCourse,
    getCourseTitles,
    filterCourses,
    searchInstructorCourses,
    editEmailOrMiniBio
    
}