import mongoose from "mongoose";

const orderSchema: mongoose.Schema = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: [true, "Must have user order Course"],
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const Order = mongoose.model<mongoose.Document>("Order", orderSchema);

export default Order;
