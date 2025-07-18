import mongoose from "mongoose";
import { nanoid } from "nanoid";


const LinkSchema = new mongoose.Schema({
  title:{type:String,required:true,unique:true},
  url: {type:String,required:true,unique:true},
  user: {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  tags:{type:mongoose.Schema.Types.ObjectId,ref:"Tag"},
  shortUrl:{type:String,default:()=>nanoid(6)},
  clicks:{type:Number,default:0}
},{
  timestamps:true
});

const Link = mongoose.model("Link", LinkSchema);

export default Link