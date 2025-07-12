import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tag:{
        type:String,
        required:true,
        unique:true
    }
})

export const Tag = mongoose.model("Tag",tagSchema);
