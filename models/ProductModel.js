import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    store: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    newArival:{
      type:Boolean,
      default:false,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

let Product =
  mongoose.models.product || mongoose.model("product", productSchema);
export default Product;
