import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Order =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default Order;
