
const mongoose = require('mongoose')
const requestsSchema= mongoose.Schema({
    courseId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
  

    },
    studentId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
  

    },
    studentName:{
        type:String,
        required:true,
    },
    courseTitle:{
        type:String,
        required:true,
    },
    type:{
        type:String,
    }
    
},
{
    timestamps:true
})



module.exports= mongoose.model('requests',requestsSchema)