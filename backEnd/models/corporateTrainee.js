const mongoose = require('mongoose')
const corporateTraineeSchema= mongoose.Schema({
    userName: {
        type:String,
        required:[true,'please enter your userName'],
    },
    password:{
        type: String,
        required:[true,'please enter your password'],

    },
    email:{
        type:String

    }
},
    {
        timestamps:true
    })
    
    
    
    module.exports= mongoose.model('corporateTrainee',corporateTraineeSchema)