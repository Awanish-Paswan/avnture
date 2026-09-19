import slugify from 'slugify'; import { AppError } from '../middleware/error.js';
export function createContentController(Model,label){return {
  list:async(req,res,next)=>{try{const filter=req.user&&req.query.admin==='true'?{}:{status:'published'};const data=await Model.find(filter).sort({featured:-1,publishedAt:-1,createdAt:-1}).lean();res.json({success:true,message:`${label} retrieved.`,data});}catch(e){next(e);}},
  getBySlug:async(req,res,next)=>{try{const filter={slug:req.params.slug,...(req.user?{}:{status:'published'})};const data=await Model.findOne(filter).lean();if(!data)throw new AppError(`${label} not found.`,404);res.json({success:true,message:`${label} retrieved.`,data});}catch(e){next(e);}},
  create:async(req,res,next)=>{try{const slug=req.body.slug||slugify(req.body.title,{lower:true,strict:true});const data=await Model.create({...req.body,slug});res.status(201).json({success:true,message:`${label} created.`,data});}catch(e){next(e);}},
  update:async(req,res,next)=>{try{const update={...req.body};if(update.title&&!update.slug)update.slug=slugify(update.title,{lower:true,strict:true});const data=await Model.findByIdAndUpdate(req.params.id,update,{new:true,runValidators:true});if(!data)throw new AppError(`${label} not found.`,404);res.json({success:true,message:`${label} updated.`,data});}catch(e){next(e);}},
  remove:async(req,res,next)=>{try{const data=await Model.findByIdAndDelete(req.params.id);if(!data)throw new AppError(`${label} not found.`,404);res.json({success:true,message:`${label} deleted.`,data:null});}catch(e){next(e);}}
};}
