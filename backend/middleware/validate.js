import { validationResult } from 'express-validator'; import sanitizeHtml from 'sanitize-html'; import { AppError } from './error.js';
export function validate(req,res,next){const errors=validationResult(req);if(!errors.isEmpty())return next(new AppError('Please correct the highlighted information.',422,errors.array().map(({path,msg})=>({field:path,message:msg}))));next();}
export function sanitizeBody(req,res,next){for(const [key,value] of Object.entries(req.body||{})){if(typeof value==='string')req.body[key]=sanitizeHtml(value,{allowedTags:[],allowedAttributes:{}}).trim();}next();}
