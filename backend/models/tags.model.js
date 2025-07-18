import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: [true, 'Tag is required'],
    unique: true,
  }
});

const Tag = mongoose.model("Tag",tagSchema);

export default Tag