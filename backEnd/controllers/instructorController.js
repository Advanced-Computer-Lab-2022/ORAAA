//ask in private and public

const asyncHandler = require('express-async-handler')
const OCourse = require('../models/course')









//@desc Instructor creates a course
//@route POST /api/instructor
//@access private
const createCourse= asyncHandler(async(req,res)=>{
    const{title, price,shortSummery , subTitle} = req.body
    if(!title || !price || !shortSummery || !subTitle){
        res.status(400)
        throw new Error('Please Fill All The UnFilled Fields')
    }
    const Ncourse=await OCourse.create({
        title, 
        price,
        shortSummery, 
        subTitle
    })
    if(Ncourse){
        res.status(201).json({
            title:Ncourse.title,
            price:Ncourse.price,
            shortSummery:Ncourse.shortSummery, 
            subTitle:Ncourse.subTitle
        })
    }else{
        res.status(400)
        throw new Error('Invalid Course Data')
    }
   
})

const getCourseTitles= asyncHandler(async(req,res)=>{
    const Ctitles = await OCourse.find() 
    res.status(200).json(Ctitles)
})


module.exports={
    createCourse,
    getCourseTitles,
}