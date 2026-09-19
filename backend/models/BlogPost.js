import mongoose from 'mongoose';
const blogPostSchema=new mongoose.Schema({title:{type:String,required:true,trim:true,maxlength:160},slug:{type:String,required:true,unique:true,index:true,lowercase:true,trim:true},excerpt:{type:String,required:true,maxlength:360},content:{type:String,required:true},featuredImage:String,author:{type:String,trim:true},category:{type:String,trim:true},tags:[String],status:{type:String,enum:['draft','published'],default:'draft',index:true},seoTitle:{type:String,maxlength:70},seoDescription:{type:String,maxlength:170},canonicalUrl:String,publishedAt:Date},{timestamps:true});
blogPostSchema.index({status:1,publishedAt:-1});
export const BlogPost=mongoose.model('BlogPost',blogPostSchema);
