const mongoose = require('mongoose')

// Defining a Mongoose schema for the User collection
const userSchema= new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
})

const User=mongoose.model('User',userSchema)
module.exports= User