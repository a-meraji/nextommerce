import mongoose from "mongoose";

const refreshSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    ownerId:{
      type:String,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

let RefreshToken =
  mongoose.models.refreshtoken || mongoose.model("refreshtoken", refreshSchema);
export default RefreshToken;
