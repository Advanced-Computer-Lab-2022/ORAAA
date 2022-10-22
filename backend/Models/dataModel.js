const mongoose = require('mongoose')
const dataSchema= mongoose.Schema({
    text: {
        type:String,
        required:[true,'please enter data']
    }

},{
    timestamps:true
})

module.exports= mongoose.model('DataModel',dataSchema)