const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:String,
    email:String,
    Password: String,
    DOB: Date
})
const User = mongoose.model('User',userSchema);
module.exports=User;