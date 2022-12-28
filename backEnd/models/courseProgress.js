
const mongoose = require('mongoose')
const courseProgressSchema= mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,

    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,

    },
    progress:{
        type:Number,
        default:0

    },


    



},{
    timestamps:true
})

module.exports= mongoose.model('courseProgress',courseProgressSchema)