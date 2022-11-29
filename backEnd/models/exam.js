const mongoose = require('mongoose')
const examSchema= mongoose.Schema({
    subTitleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subTitle'
    },
    counter:{
        type:Number,
        required:true,
        ref:'course'
    },
    subTitleCounter:{
        type:Number,
        required:true,
        ref:'subTitle'
    },
    question:{
        type:String,
        required:[true,'please enter Q'],
    },
    answers:{
        type:[String],
        required:[true,'please enter answers'],

    },
    rightAnswer:{
        type:Number,
        max:3,
        min:0,
    }

},
    {
        timestamps:true
    })
    
    
    
    module.exports= mongoose.model('exam',examSchema)