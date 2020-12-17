import mongoose from "mongoose";
import { IUser, UserRoles } from './User.interface'
import bcrypt from 'bcrypt'
// interface
const userSchema: mongoose.Schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,

    },
    confirmPassword: {
        type: String,

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

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    return next();
})

userSchema.methods.correctPassword = async function (candidatePassword: string,
    userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default User;
