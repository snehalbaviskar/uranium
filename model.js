const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            unique:[true]
        },
        mobile: {
            type: Number,
            required: true,
            unique: true,

        },
        collegeName: {
            type: String,
            required: true
        },
        gender:{
            type:String,
            required:true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);   