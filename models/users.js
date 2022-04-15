const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usersSchema = new Schema({
    uid:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    age:{type:String,required:true},
    image:{type:String,required:true}
})


module.exports = mongoose.model('users',usersSchema);