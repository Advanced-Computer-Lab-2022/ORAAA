const mongoose = require('mongoose')
const subTitleSchema= mongoose.Schema({
    counter:{
        type:Number,
        required:true,
        ref:'course'
    },
    subTitleCounter:{
        type:Number,
        required:true,
    },
    subTitleName:{
        type:String,
        required:true,

    },  
    link:{
        type:String,
        default:'',
    },
    subTitleDesc:{
        type:String,
        default:''
    },
    subTitleHours:{
        type: String,
        required:[false],
        
    }

},
    {
        timestamps:true
    })
    
    
    
    module.exports= mongoose.model('subTitle',subTitleSchema)