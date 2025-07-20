import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    title:{type:String},
    content:{type:String,required:true},
    isPublic:{type:Boolean,required:true}
},{timestamps:true})

const Note = mongoose.model("note",noteSchema);

export default Note;