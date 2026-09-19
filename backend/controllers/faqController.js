import { FAQ } from '../models/FAQ.js'; import { AppError } from '../middleware/error.js';
export async function listFAQs(req,res,next){try{const data=await FAQ.find(req.user&&req.query.admin==='true'?{}:{published:true}).sort({order:1}).lean();res.json({success:true,message:'FAQs retrieved.',data});}catch(e){next(e);}}
export async function createFAQ(req,res,next){try{const data=await FAQ.create(req.body);res.status(201).json({success:true,message:'FAQ created.',data});}catch(e){next(e);}}
export async function updateFAQ(req,res,next){try{const data=await FAQ.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!data)throw new AppError('FAQ not found.',404);res.json({success:true,message:'FAQ updated.',data});}catch(e){next(e);}}
export async function deleteFAQ(req,res,next){try{const data=await FAQ.findByIdAndDelete(req.params.id);if(!data)throw new AppError('FAQ not found.',404);res.json({success:true,message:'FAQ deleted.',data:null});}catch(e){next(e);}}
