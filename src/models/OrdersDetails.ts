import mongoose from "mongoose";

const orderDetailSchema: mongoose.Schema = new mongoose.Schema({
  orderID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Order",
  },
  courseID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Course",
  },
  price: {
    type: Number,
    required: [true, "Order must have price"],
  },
  discount: {
    type: Number,
  },
});

const OrderDetail = mongoose.model<mongoose.Document>(
  "OrderDetail",
  orderDetailSchema
);
export default OrderDetail;
