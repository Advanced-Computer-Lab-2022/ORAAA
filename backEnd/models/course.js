//exercises?/subtitles?/
const mongoose = require('mongoose')
const courseSchema= mongoose.Schema({
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'instructor'
    },
    counter:{
        type:Number,
        

    },
    title: {
        type:String,
        required:[true,'please enter title'],
    },
    price:{
        type: Number,
        required:[true,'please enter price'],

    },
    totalHoursOfCourse:{
        type: String,
        required:[false],

    },
    shortSummery:{
        type: String,
        required:[true,'please enter a short Summery'],

    }, 
    subject:{
        type:String,
        required:[true,'please enter the course subject']
    },
    rating:{
        type:Number,
        max:10,
        min:1
    },
    rateArray:{
        type:[],
    },
    review:{
        type:[],
    },
    previewLink:{
        type:String,
        required:[true]
    },
    views:{
        type:Number,
        default:0,     
    }



},{
    timestamps:true
})

module.exports= mongoose.model('course',courseSchema)