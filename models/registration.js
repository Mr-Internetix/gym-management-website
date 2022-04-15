const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const registration = Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    gender: { type: String, required: true },
})


module.exports = mongoose.model('registration', registration)