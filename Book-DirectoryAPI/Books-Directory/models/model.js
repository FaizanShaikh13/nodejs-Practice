const mongoose =  require('mongoose')
const { type } = require('os')

const schema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'please provide a name'],
        maxlength:[20,"Name can not be more than 20 characters"],
    },
     price:{
         type:Number,
         required:true,
     }
})

module.exports = mongoose.model('Books',schema)