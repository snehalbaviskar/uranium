const mongoose = require('mongoose');
const authorModel = require('./authorModel');
const Objectid = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
     title: { type : String, required : true}, 
     body: { type: String, required : true}, 
     authorId: {type : Objectid, ref : 'authorModel', required : true},
     tags:{ type: [String]}, 
     category: {type: String, required: true},  
     subcategory: { type: [String]},
     publishedAt :{type : Date, default: Date.now},
     isDeleted: {type: Boolean, default: false},  
     isPublished: {type: Boolean, default: false}


}, {timestamps : true});

module.exports = mongoose.model('Blog', blogSchema)