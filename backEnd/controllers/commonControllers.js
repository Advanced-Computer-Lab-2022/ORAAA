const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Oinstructor= require('../models/instructor')
const Oadmin= require('../models/admin')
const Ocourse= require('../models/course')
const OcorporateTrainee=require('../models/corporateTrainee')
const OindividualTrainee=require('../models/individualTrainee')

const asyncHandler = require('express-async-handler')





//@desc  login
//@route POST /api/common/Login
//@access public
const login = asyncHandler(async(req,res)=>{
    const {userName,password} = req.body

    const Ninstructor = await Oinstructor.findOne({userName})
    const Nadmin = await Oadmin.findOne({userName})
    const NcorporateTrainee = await OcorporateTrainee.findOne({userName})
    const NindividualTrainee = await OindividualTrainee.findOne({userName})
      
    if(Ninstructor && (await bcrypt.compare(password,Ninstructor.password))){
        
        res.json({
            name: Ninstructor.userName,
            token: generateToken(Ninstructor._id),
            typee: Ninstructor.instance
        })



    }else if(Nadmin && (await bcrypt.compare(password,Nadmin.password))){
        res.json({
            name: Nadmin.userName,
            token: generateToken(Nadmin._id),
            typee: Nadmin.instance
        })


    }else if(NcorporateTrainee && (await bcrypt.compare(password,NcorporateTrainee.password))){
        res.json({
            name: NcorporateTrainee.userName,
            token: generateToken(NcorporateTrainee._id),
            typee: NcorporateTrainee.instance
        })


    }else if(NindividualTrainee && (await bcrypt.compare(password,NindividualTrainee.password))){
        res.json({
            name: NindividualTrainee.userName,
            token: generateToken(NindividualTrainee._id),
            typee: NindividualTrainee.instance
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
    const _id=req.user.id
     const NcorporateTrainee = await OcorporateTrainee.findOne({_id})
     const Ninstructor = await Oinstructor.findOne({_id})
     const NindividualTrainee = await OindividualTrainee.findOne({_id})
    
    if(Ninstructor){

        const updateCountry= await Oinstructor.findByIdAndUpdate(_id,req.body,{new:true})
        res.status(200).json(updateCountry)

    }else if(NcorporateTrainee){

        const updateCountry= await OcorporateTrainee.findByIdAndUpdate(_id,req.body,{new:true})
        res.status(200).json(updateCountry)

    }else if(NindividualTrainee){
        
        const updateCountry= await OindividualTrainee.findByIdAndUpdate(_id,req.body,{new:true})
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
        if(Ccourses.length===0){
            res.status(404)
            throw new Error('Their is no Course with these properties')
        }else{
            res.status(200).json(Ccourses)
        }
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
        if(Ccourses.length===0){
            res.status(404)
            throw new Error('Their is no Course with these properties')
        }else{
            res.status(200).json(Ccourses)
        }
    }


}

})


//@desc  search for availble courses
//@route post /api/common/searchForCourses
//@access private
const searchForCourses = asyncHandler(async(req,res)=>{
    const {keyword} = req.body
    let _id
    let Ccourses
    if(!keyword){
        res.status(400)
        throw new Error('please fill the unfilled fields')
    }
    
    Ccourses = await Ocourse.find({$or:[{'subject':keyword} ,{'title':keyword}]})
       
   
    if(Ccourses.length===0){
    const Ninstructor = await Oinstructor.findOne({'userName':keyword})
       if(Ninstructor){
        _id =Ninstructor._id
        Ccourses = await Ocourse.find({'instructorId':_id})
       }
    }
    
    
    if(Ccourses.length!==0){
        res.status(200).json(Ccourses)
    }else{
        res.status(404)
        throw new Error('Course not found')
    }

})


//@desc  Viewing specific course detail
//@route get /api/common/chooseCourseToView
//@access private
const chooseCourseToView = asyncHandler(async(req,res)=>{
    
        const Ncourse= await Ocourse.find()
       
    if(Ncourse){
        res.status(200).json(Ncourse)
    
    }else{
       res.status(404)
       throw new Error('course not found')
    }

})


//@desc  rating a course
//@route get /api/common/rateCourse
//@access private
const rateCourses = async(req,res) => {
 
 
    const courseId = req.query.courseId;

    // check if userId is not empty
    if(courseId){
     var avg  =0
     const arr= await Ocourse.findById(courseId)
     arr.rateArray.push(req.body.rating)
    for(var i=0;i<arr.rateArray.length;i++){
        avg=avg+Number(arr.rateArray[i])
    }    
    avg=avg/arr.rateArray.length
    arr.rating=Math.floor(avg)
    if(req.body.review && req.body.review!==""){
        arr.review.push(req.body.review)
        }
    const Ncourse = await Ocourse.findByIdAndUpdate(courseId,arr,{new:true});
    
    if(Ncourse){ 
        
    res.status(200).json(Ncourse.rating)
    }else{
        res.status(404)
        throw new Error('course not found')
    }
    }
}


//@desc  rating an instructor
//@route get /api/common/rateInstructor
//@access private
const rateInstructor = async(req,res) => {
 
 
    const instructorId = req.query.instructorId;


    // check if userId is not empty
    if(instructorId){
     var avg  =0
     const arr= await Oinstructor.findById(instructorId)
     arr.rateArray.push(req.body.rating)
    for(var i=0;i<arr.rateArray.length;i++){
        avg=avg+Number(arr.rateArray[i])
    }    
    avg=avg/arr.rateArray.length
    arr.rate=Math.floor(avg)
    
    if(req.body.review && req.body.review!==""){
    arr.review.push(req.body.review)
    }
    const Ninstructor = await Oinstructor.findByIdAndUpdate(instructorId,arr,{new:true});
    
    if(Ninstructor){ 
        
    res.status(200).json('hi')
    }else{
        res.status(404)
        throw new Error('could not rate instructor')
    }
    }
}

// @desc    user changes his password
// @route   PUT /api/common/changePassword
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
    const {oldPassword,newPassword} = req.body
  
    if (!oldPassword || !newPassword) {
      res.status(400)
      throw new Error('Please fill all the required fields')
    }

   const _id=req.user.id

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)


   if(_id){
    var Ninstructor = await Oinstructor.findOne({_id})
    var NcorporateTrainee = await OcorporateTrainee.findOne({_id})
    var NindividualTrainee = await OindividualTrainee.findOne({_id})
   
      
    if(Ninstructor && (await bcrypt.compare(oldPassword,Ninstructor.password))){
        const replace = await Oinstructor.findById(_id)
        replace.password=hashedPassword
        Ninstructor= await Oinstructor.findByIdAndUpdate(_id,replace,{new:true})
        res.status(200).json(Ninstructor.password)
       
    }else if(NcorporateTrainee && (await bcrypt.compare(oldPassword,NcorporateTrainee.password))){
        const replace = await OcorporateTrainee.findById(_id)
        replace.password=hashedPassword
        NcorporateTrainee= await OcorporateTrainee.findByIdAndUpdate(_id,replace,{new:true})
        res.status(200).json(NcorporateTrainee.password)


    }else if(NindividualTrainee && (await bcrypt.compare(oldPassword,NindividualTrainee.password))){
        const replace = await OindividualTrainee.findById(_id)
        replace.password=hashedPassword
        NindividualTrainee= await OindividualTrainee.findByIdAndUpdate(_id,replace,{new:true})
        res.status(200).json(NindividualTrainee.password)


    }else{
        res.status(400)
        throw new Error('Invalid Password')
    }

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
    searchForCourses,
    chooseCourseToView,
    rateCourses,
    rateInstructor,
    changePassword

}