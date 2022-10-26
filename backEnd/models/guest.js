const mongoose = require('mongoose')
const guestSchema= mongoose.Schema({
    country: {
        type:String,
        
    },
},
{
    timestamps:true
})



module.exports= mongoose.model('guest',guestSchema)