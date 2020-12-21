import mongoose from "mongoose";
import CourseInterface from "../types/Interfaces/Course.interface";
const courseSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 8,
  },
  description: {
    type: String,
    required: true,
    minlength: 9,
  },
  userID: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  price: {
    type: Number,
    default: 9.99,
  },
  categories: {
    type: String,
    enum: ['Web Development', 'IOT', 'AI', 'Back-End',],
    default: 'Web Development'
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const Course = mongoose.model<CourseInterface & mongoose.Document>(
  "Course",
  courseSchema
);

export default Course;
