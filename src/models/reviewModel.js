const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema( {
    bookId: {
          type: ObjectId,
          required: true,
          ref: "Books"
        },
        reviewedBy: {
          type: String,
          default: "Guest",
          trim: true
        },
        reviewedAt: {
          type: String, 
          required: true,
          default: Date.now()
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            trim: true
        },
        review: {
            type: String,
            trim: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
      }, { timestamps: true });

module.exports = mongoose.model('reviews', reviewSchema)



// {
//     bookId: {ObjectId, mandatory, refs to book model},
//     reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
//     reviewedAt: {Date, mandatory},
//     rating: {number, min 1, max 5, mandatory},
//     review: {string, optional}
//     isDeleted: {boolean, default: false},
//   }
