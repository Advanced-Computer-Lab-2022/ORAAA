const mongoose = require('mongoose')
const corporateTraineeSchema= mongoose.Schema({
    userName: {
        type:String,
        unique:[true],
        required:[true,'please enter your userName'],
    },
    password:{
        type: String,
        required:[true,'please enter your password'],

    },
    email:{
        type:String,
        unique:[true]

    },
    country:{
        type:String,
        

    },
    instance:{
        type:String,
        default:'corporateTrainee'
    },
    inrolledCourses:{
        type:[]
    }  
},
    {
        timestamps:true
    })
    
    
    
    module.exports= mongoose.model('corporateTrainee',corporateTraineeSchema)