import mongoose from "mongoose";
import { User, UserRoles } from './User.interface'
// interface
const userSchema: mongoose.Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,

    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            // This only works CREATE on SAVE !!
            validator: function (el: string) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    nickName: {
        type: String,
        required: true,
        // minlength: 5
    },
    role: {
        type: UserRoles,
        required: true,
        default: 'user'
    },
    createAt: {
        type: Date,
        default: new Date(),
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },

    ],
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
});

const User = mongoose.model<User & mongoose.Document>("User", userSchema);

export default User;
