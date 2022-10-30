const mongoose = require('mongoose')
const instructorSchema= mongoose.Schema({
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
        type: String,
        unique:[true]
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

    }, country:{
        type:String,
        default:''
        

    },
    instance:{
        type:String,
        default:'instructor'
    } 
},
{
    timestamps:true
})



module.exports= mongoose.model('instructor',instructorSchema)