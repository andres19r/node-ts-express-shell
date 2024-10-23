import mongoose, { Schema } from "mongoose";

const orderItemSchema = new mongoose.Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
});

orderItemSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const OrderItemModel = mongoose.model("OrderItem", orderItemSchema);
