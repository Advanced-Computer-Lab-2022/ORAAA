const asyncHandler = require('express-async-handler')
const Oguest = require('../models/guest')
const Ocourse = require('../models/course')



//@desc  guest select his country
//@route POST /api/selectCountry
//@access public
const selectCountry = asyncHandler(async(req,res)=>{
    const {country} = req.body
    if(!country){
        res.status(400)
        throw new Error('Please select your country')
    }
    
    const Nguest = await Oguest.create({
        country
    })
    
    if(Nguest){
        res.status(201).json({
            ID:Nguest._id,
            country:Nguest.country
        })

    }


    
})



//@desc  guest Viewing availble courses
//@route get /api/guest/viewCourses
//@access public
const viewCourses = asyncHandler(async(req,res)=>{
     const Ncourse= await Ocourse.find({},{title:1,rating:1,totalHoursOfCourse:1,price:1 })
     res.status(200).json(Ncourse)
    
})



//@desc  filtiring availble courses
//@route get /api/common/filterCourses
//@access private
const filterCourses = asyncHandler(async(req,res)=>{
    
    
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


})











module.exports={
    
    selectCountry,
    viewCourses,
    filterCourses

}