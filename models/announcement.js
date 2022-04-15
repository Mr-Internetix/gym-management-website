const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const announcementSchema =new Schema({
    title:{type:String,required:true},
    announcement:{type:String,required:true},
    time:{type:String,required:true}
})


module.exports = mongoose.model('announcement',announcementSchema);
