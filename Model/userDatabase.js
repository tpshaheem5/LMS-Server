const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
  
    firstname:{
        type:String,
        required:true
    },
    username: {
        type: String,
        required: true,
        // unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
    },
    image:{
        type:String,
      },
    address:{
        type:String,
        required:true,
    },
    reserveBooks:[],
    borrowBooks:[]
   
})
module.exports = mongoose.model("user",userSchema)