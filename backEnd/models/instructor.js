const { default: _default } = require('concurrently')
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
        unique:[true],
        default:''

    },
    miniBiography:{
        type: String,
        default:''
        

    },
    rate:{
        type:Number,
        min:0,
        max:10

    },
    rateArray:{
        type:[]
    }, 
    country:{
        type:String,
        default:''
        

    },
    instance:{
        type:String,
        default:'instructor'
    },
    review:{
        type:[],
    },
    acceptedTerms:{
        type:Boolean,
        default:false

    },
},
{
    timestamps:true
})



module.exports= mongoose.model('instructor',instructorSchema)