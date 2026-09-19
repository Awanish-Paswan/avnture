import mongoose from 'mongoose';
const faqSchema=new mongoose.Schema({question:{type:String,required:true,trim:true,maxlength:240},answer:{type:String,required:true,maxlength:2000},category:{type:String,trim:true},order:{type:Number,default:0},published:{type:Boolean,default:false,index:true}},{timestamps:true});
export const FAQ=mongoose.model('FAQ',faqSchema);
