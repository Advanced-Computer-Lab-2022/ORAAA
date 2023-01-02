const mongoose = require('mongoose')
const course = require('../models/course')
const individualTraineeSchema= mongoose.Schema({
    userName: {
        type:String,
        unique:[true],
        required:[true,'please enter your userName'],
    },
    firstName: {
        type:String,
        required:[true,'please enter your firstName'],
    },
    lastName: {
        type:String,
        required:[true,'please enter your lastName'],
    },
    gender: {
        type:String,
        required:[true,'please select your gender'],
    },
    password:{
        type: String,
        required:[true,'please enter your password'],

    },
    email:{
        type: String,
        unique:[true],
        required:[true,'please enter your email address'],

    },
    country:{
        type:String,
        

    }, 
    inrolledCourses:{
        type:[],
        default:[]
        
     
    }, instance:{
        type:String,
        default:'individualTrainee'
    },
    wallet:{
        type:Number,
        default:0
    } 

    
  

},
{
    timestamps:true
})



module.exports= mongoose.model('individualTrainee',individualTraineeSchema)