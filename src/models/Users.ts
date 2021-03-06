import mongoose from "mongoose";
import { IUser } from "../types/Interfaces/User.interface";
import bcrypt from "bcrypt";
// interface
const userSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,

    required: [true, "Please provide your password"],
  },
  confirmPassword: {
    type: String,
    minlength: 6,
    validate: {
      // This only works CREATE on SAVE !!
      validator: function (el: string) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  nickName: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },

  role: {
    type: String,
    enum: ["user", "instructors", "admin"],
    default: "user",
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
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  return next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp: string) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      `${this.passwordChangedAt.getTime() / 1000}`,
      10
    );
    return +JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default User;
