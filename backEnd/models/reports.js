
const mongoose = require('mongoose')
const reportsSchema= mongoose.Schema({
    courseId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
  

    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
  

    },
    type:{
        type:String,
        
    },
    body:{
        type:String,
        
    }
},
{
    timestamps:true
})



module.exports= mongoose.model('report',reportsSchema)