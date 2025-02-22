import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model("Link", LinkSchema);