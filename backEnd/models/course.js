//exercises?/subtitles?/
const mongoose = require('mongoose')
const courseSchema= mongoose.Schema({
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'instructor'
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
    subTitle:{
        type: String,
        required:[true,'please enter the course subtitle'],

    },
    totalHoursOfEachSubtitle:{
        type: String,
        required:[false],
        
    },
    subject:{
        type:String,
        required:[true,'please enter the course subject']
    },
    rating:{
        type:Number,
        max:10,
        min:1
    }



},{
    timestamps:true
})

module.exports= mongoose.model('course',courseSchema)