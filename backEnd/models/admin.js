const mongoose = require('mongoose')
const adminSchema= mongoose.Schema({
    userName: {
        type:String,
        unique:[true],
        required:[true,'please enter your userName'],
    },
    password:{
        type: String,
        required:[true,'please enter your password'],

    }
},
    {
        timestamps:true
    })
    
    
    
    module.exports= mongoose.model('admin',adminSchema)