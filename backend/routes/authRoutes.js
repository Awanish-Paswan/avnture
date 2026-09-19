import { Router } from 'express'; import rateLimit from 'express-rate-limit'; import { body } from 'express-validator'; import { login,logout,me } from '../controllers/authController.js'; import { requireAuth } from '../middleware/auth.js'; import { validate } from '../middleware/validate.js';
export const authRouter=Router();
const loginLimiter=rateLimit({windowMs:15*60*1000,limit:10,standardHeaders:'draft-8',legacyHeaders:false,message:{success:false,message:'Too many sign-in attempts. Please wait and try again.'}});
authRouter.post('/login',loginLimiter,[body('email').isEmail().normalizeEmail(),body('password').isLength({min:8,max:200})],validate,login);
authRouter.post('/logout',logout); authRouter.get('/me',requireAuth,me);
