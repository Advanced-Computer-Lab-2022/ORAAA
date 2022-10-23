const mongoose = require('mongoose')
const instructorSchema= mongoose.Schema({
    userName: {
        type:String,
        required:[true,'please enter your userName'],
    },
    password:{
        type: String,
        required:[true,'please enter your password'],

    },
    email:{
        type: String,
        //required:[true,'please enter your email address'],

    },
    miniBiography:{
        type: String,
        //required:[true,'please enter a short Summery'],

    },
    rate:{
        type:Number,
        min:0,
        max:10

    },reviews:{
        type:Number,
        min:0,
        max:10

    }, 
},
{
    timestamps:true
})



module.exports= mongoose.model('instructor',instructorSchema)