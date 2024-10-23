import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  shippingAddress: {
    type: String,
  },
  updatedAt: {
    type: Date,
  },
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const OrderModel = mongoose.model("Order", orderSchema);
