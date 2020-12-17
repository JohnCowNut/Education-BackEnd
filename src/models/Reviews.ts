
import mongoose from 'mongoose';
import ReviewInterface from '../types/Review.interface'
const reviewSchema: mongoose.Schema = new mongoose.Schema({
    idUser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: new Date()
    },
    idCourse: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course'
    }
})

const Review = mongoose.model<ReviewInterface & mongoose.Document>('Review', reviewSchema)
export default Review;