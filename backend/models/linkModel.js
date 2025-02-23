import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  title: String,
  url: String,
  user: mongoose.Schema.Types.ObjectId,
});

export const Link = mongoose.model("Link", LinkSchema);