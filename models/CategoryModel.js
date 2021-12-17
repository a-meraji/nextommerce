import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Category = mongoose.models.category || mongoose.model("category", categorySchema);
export default Category;
