const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
        title: {
          type: String,
          required: true,
          enum: ["Mr", "Mrs", "Miss"],
        },
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: Number,
          required: true,
          unique: true,
          minlength: 10,
          maxlength: 10
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
          minlength: 8,
          maxlength: 15
        },
        address: {
          street: { type: String },
          city: { type: String },
          pincode: { type: String },
        },
      }, 
{ timestamps: true });

module.exports = mongoose.model('Users', userSchema)

