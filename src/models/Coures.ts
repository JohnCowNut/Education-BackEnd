import mongoose from "mongoose";
import CourseInterface from '../types/Course.interface';
const courseSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 8
    },
    description: {
        type: String,
        required: true,
        minlength: 9
    },
    idUser: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        }
    ],
    price: {
        type: Number,
        required: true,
        default: 9.99
    },
    categories: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Categories'
    },
    createAt: {
        type: Date,
        default: new Date()
    },
})

const Course = mongoose.model<CourseInterface & mongoose.Document>('Course', courseSchema)

export default Course