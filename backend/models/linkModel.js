import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  title: String,
  url: String,
  user: {type:mongoose.Schema.Types.ObjectId,ref:"User"}
});

export const Link = mongoose.model("Link", LinkSchema);