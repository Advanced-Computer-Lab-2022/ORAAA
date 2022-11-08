const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Oguest = require('../models/guest')
const Ocourse = require('../models/course')
const OindividualTrainee= require('../models/individualTrainee')



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
    
    let Ccourses
    const {subject,rating,price} = req.body
    if(!subject && !rating && !price){
        res.status(400)
        throw new Error('please fill the unfilled fields')
    }

    if((!subject && rating && !price) || (subject && !rating && !price) || (!subject && !rating && price)){
         Ccourses = await Ocourse.find({$or:[{'subject':req.body.subject} ,{'rating':req.body.rating},{'price':req.body.price}]} )
        res.status(200).json(Ccourses)

    }else if(!subject && rating && price){
         Ccourses = await Ocourse.find({$and:[{'rating':req.body.rating},{'price':req.body.price}]} )
        res.status(200).json(Ccourses)
    }else if(subject && rating && !price){
         Ccourses = await Ocourse.find({$and:[{'subject':req.body.subject} ,{'rating':req.body.rating}]})
        res.status(200).json(Ccourses)
    }else if(subject && !rating && price){
         Ccourses = await Ocourse.find({$and:[{'subject':req.body.subject} ,{'price':req.body.price}]} )
        res.status(200).json(Ccourses)
    }else{
         Ccourses = await Ocourse.find({$and:[{'subject':req.body.subject} ,{'rating':req.body.rating},{'price':req.body.price}]} )
         if(Ccourses.length===0){
            res.status(404)
            throw new Error('Their is no Course with these properties')
        }else{
            res.status(200).json(Ccourses)
        }
        
    }
 


})


// @desc    Register new user
// @route   POST /api/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
    const { userName,firstName,lastName,gender,country, email, password } = req.body
  
    if (!userName || !email || !password || !firstName || !lastName || !gender) {
      res.status(400)
      throw new Error('Please fill all the required fields')
    }
  
    // Check if user exists
    const userExists = await OindividualTrainee.findOne({$or:[{ email },{userName}]})
  
    if (userExists) {
      res.status(400)
      throw new Error('userName or emailAddress already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create individualtrainee
    const NindividualTrainee = await OindividualTrainee.create({
      userName,
      firstName,
      lastName,
      gender,
      country,
      email,
      password: hashedPassword,
    })
  
    if (NindividualTrainee) {
      res.status(201).json({
        _id: NindividualTrainee.id,
        name: NindividualTrainee.userName,
        email: NindividualTrainee.email,
        token: generateToken(NindividualTrainee._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })




// Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}







module.exports={
    
    selectCountry,
    viewCourses,
    filterCourses,
    signup

}