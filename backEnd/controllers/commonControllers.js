const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Oinstructor= require('../models/instructor')
const Oadmin= require('../models/admin')
const Ocourse= require('../models/course')
const OcorporateTrainee=require('../models/corporateTrainee')
const OindividualTrainee=require('../models/individualTrainee')
const OcourseProgress=require('../models/courseProgress')
const OsubTitle=require('../models/subTitle')
const Oexam= require('../models/exam')
const nodemailer=require('nodemailer')
const asyncHandler = require('express-async-handler')
const { strip } = require('colors')
const { default: Stripe } = require('stripe')





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
            typee: Ninstructor.instance,
            acceptedTerms:Ninstructor.acceptedTerms
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

    console.log(instructorId)
    // check if userId is not empty
    if(instructorId){
     var avg  =0
     const arr= await Oinstructor.findById(instructorId)
     arr.rateArray.push(req.body.instructorRate)
    for(var i=0;i<arr.rateArray.length;i++){
        avg=avg+Number(arr.rateArray[i])
    }    
    avg=avg/arr.rateArray.length
    arr.rate=Math.floor(avg)
    console.log(req.body.instructorReview)
    if(req.body.instructorReview && req.body.instructorReview!==""){
    arr.review.push(req.body.instructorReview)
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



//@desc  geting course info when opening
//@route get /api/common/getCourseInfo
//@access private
const getCourseInfo = asyncHandler(async(req,res)=>{
    
    const courseId = req.query.courseId;
     const Ncourse = await Ocourse.findOne({'_id':courseId})
     
     if(Ncourse){
        
        const NsubTitle= await OsubTitle.find({'counter':Ncourse.counter})
        res.status(200).json(NsubTitle)

    }else{
        res.status(404)
        throw new Error('course not found')
    }
})



//@desc  get a certain course
//@route get /api/common/getCourse
//@access private
const getCourse = asyncHandler(async(req,res)=>{
    
    const courseId = req.query.courseId;
    
     const Ncourse = await Ocourse.findOne({'_id':courseId})
     
     if(Ncourse){
        const replace = Ncourse
        replace.views=replace.views+1
        await Ocourse.findByIdAndUpdate(courseId,replace,{new:true})
        res.status(200).json(Ncourse)

    }else{
        res.status(404)
        throw new Error('course not found')
    }
})




//@desc  getting subTitle exams
//@route get /api/common/getSubTitleExam
//@access private
const getSubTitleExam = asyncHandler(async(req,res)=>{
    
    const subTitleId = req.query.subTitleId;
    
     const NsubTitle = await OsubTitle.findOne({'_id':subTitleId})
     
     if(NsubTitle){
        const Nexam = await Oexam.find({$and:[{'counter':NsubTitle.counter} ,{'subTitleCounter':NsubTitle.subTitleCounter}]})
        if(Nexam){
            res.status(200).json(Nexam)
        }else{
            res.status(404)
            throw new Error('no exams')
        }
        

    }else{
        res.status(404)
        throw new Error('subtitle not found')
    }
})


//@desc  forgot password send the user an email to change password
//@route get /api/common/forgotPassword
//@access public
const forgotPassword = asyncHandler(async(req,res)=>{
    const {userName} = req.body
    var flag1=false
    var flag2=false
    var flag3=false
    let email
    const Ninstructor = await Oinstructor.findOne({userName})
    const NcorporateTrainee = await OcorporateTrainee.findOne({userName})
    const NindividualTrainee = await OindividualTrainee.findOne({userName})
    const transporter = nodemailer. createTransport({
        service:'gmail',
        auth: {
        user: `${process.env.EMAIL}`,
        pass:`${process.env.PASSWORD}`
       }
    })
    console.log(`${process.env.EMAIL}`)
    console.log(`${process.env.PASSWORD}`)
    if(Ninstructor){
        flag1=true
        email=Ninstructor.email

    }else if(NcorporateTrainee){
        flag2=true
        email=NcorporateTrainee.email

    }else if(NindividualTrainee ){
        flag3=true
        email=NindividualTrainee.email
    }

    if(flag1 || flag2 || flag3){
        const mailOptions = {
            from:'oraaa30@gmail.com', 
            to:email ,
            subject: 'Link To Reset Password',
             text:`You are receiving this because you (or someone else) have requested the reset of the password for your account. \n\n`+
            
            `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n`+
            `http://localhost:3000/ForgotPasswod\n\n`+
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        }


        transporter.sendMail(mailOptions, function (err, response) {
            if (err) {
            console.error ('there was an error: ', err);
            } else {
            console. log( 'here is the res: ', response);
            }
          })

          if(flag1){
            res.status(200).json(Ninstructor._id)
          }else if(flag2){
            res.status(200).json(NcorporateTrainee._id)
          }else{
            res.status(200).json(NindividualTrainee._id)
          }
    
    }else{
        res.status(400)
        throw new Error('Invalid userName')
    }


    
    

})

// @desc    user changes his password
// @route   PUT /api/common/changePassword
// @access  Private
const changePasswordF = asyncHandler(async (req, res) => {
    const {newPassword} = req.body
  
    if (!newPassword) {
      res.status(400)
      throw new Error('Please fill all the required fields')
    }

    const _id = req.query.userId;

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)


   if(_id){
    var Ninstructor = await Oinstructor.findOne({_id})
    var NcorporateTrainee = await OcorporateTrainee.findOne({_id})
    var NindividualTrainee = await OindividualTrainee.findOne({_id})
   
      
    if(Ninstructor){
        const replace = await Oinstructor.findById(_id)
        replace.password=hashedPassword
        Ninstructor= await Oinstructor.findByIdAndUpdate(_id,replace,{new:true})
        res.status(200).json(Ninstructor.password)
       
    }else if(NcorporateTrainee){
        const replace = await OcorporateTrainee.findById(_id)
        replace.password=hashedPassword
        NcorporateTrainee= await OcorporateTrainee.findByIdAndUpdate(_id,replace,{new:true})
        res.status(200).json(NcorporateTrainee.password)


    }else if(NindividualTrainee){
        const replace = await OindividualTrainee.findById(_id)
        replace.password=hashedPassword
        NindividualTrainee= await OindividualTrainee.findByIdAndUpdate(_id,replace,{new:true})
        res.status(200).json(NindividualTrainee.password)


    }else{
        res.status(400)
        throw new Error('Change Password Failed')
    }

}
  })

  

 
//@desc  adds a new course to the course array of a student
//@route PUT /api/common/addEnrolledCourse
//@access private
const addEnrolledCourse = asyncHandler(async(req,res)=>{

    const {courseId} = req.body
    const userId=req.user.id
    console.log(courseId)
    console.log(userId)
    let flag
    let Ncourse
    if(courseId){
        Ncourse = await Ocourse.findById(courseId)
    }
    if(userId){
    var NcorporateTrainee = await OcorporateTrainee.findOne({userId})
    var NindividualTrainee = await OindividualTrainee.findOne({userId})
    }
     

    if(NindividualTrainee){
        flag =  NindividualTrainee.inrolledCourses.includes(`${courseId}`)
    }
     
    if(!flag){
    if(userId && courseId){
        const studentId=userId  
        await OcourseProgress.create({
            studentId,
            courseId
        })
    }
     
     if(Ncourse && NindividualTrainee){
        const replace = await OindividualTrainee.findById(userId)
        replace.inrolledCourses.push(courseId)
        NindividualTrainee= await OindividualTrainee.findByIdAndUpdate(userId,replace,{new:true})
        res.status(200).json('Done')
     }else if(Ncourse && NcorporateTrainee){
        const replace = await OcorporateTrainee.findById(userId)
        replace.inrolledCourses.push(courseId)
        NcorporateTrainee= await OcorporateTrainee.findByIdAndUpdate(userId,replace,{new:true})
        res.status(200).json('Done')
    }else{
        res.status(404)
        throw new Error('Not a student')
    }
}else{
    res.status(400).json('Already enrolled')
}
})
  




//!!!!not complete 
//@desc  getting a student progress for a certain course
//@route get /api/common/getProgress
//@access private
const getProgress = asyncHandler(async(req,res)=>{
    
    const courseId = req.query.courseId
    const _id=req.user.id
    const NcourseProgress= await OcourseProgress.find({$and:[{'studentId':_id},{'courseId':courseId}]})
     
     if(NcourseProgress){
        
        

    }else{
        res.status(404)
        throw new Error('course not found')
    }
})



//@desc  checkout 
//@route POST /api/common/checkout
//@access private
const checkout = asyncHandler(async(req,res)=>{

    const courseId = req.query.courseId;
    const Ncourse = await Ocourse.findOne({'_id':courseId})

    if(Ncourse){
    const priceInCents = Ncourse.price*100
    const courseData = [{ 
                price_data: {
                 currency: "usd",
                 product_data: {
                     name: Ncourse.title,
                 },
                 unit_amount: priceInCents,
              },
                 quantity:1,
             }]
    const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items:courseData,
        success_url: `http://localhost:3000/PaymentSuccess?courseId=${courseId}`,
        cancel_url: 'http://localhost:4000',
          

    })
    
    res.status(200).json({url:session.url})

}else{
    res.json('failed')
}




})


//@desc  getting all courses in a sorted order
//@route get /api/getSortedCourses
//@access public
const getSortedCourses = asyncHandler(async(req,res)=>{
    
    const Ncourse= await Ocourse.find()
    Ncourse.sort((a, b) => (a.views > b.views) ? -1 : 1)
   
if(Ncourse){
    res.status(200).json(Ncourse)

}else{
   res.status(404)
   throw new Error('no availble courses')
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
    changePassword,
    getCourseInfo,
    getCourse,
    getSubTitleExam,
    forgotPassword,
    changePasswordF,
    getProgress,
    checkout,
    addEnrolledCourse,
    getSortedCourses

}