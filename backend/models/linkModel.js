import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  title: String,
  url: String,
});

export const Link = mongoose.model("Link", LinkSchema);