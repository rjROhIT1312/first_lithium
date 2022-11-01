const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    
name:String,
headQuarter: String

}) 

module.exports = mongoose.model('newPublisher', authorSchema)