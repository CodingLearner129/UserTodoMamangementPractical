import express from 'express';
import { router as adminRouter } from './admin.js';
import { router as authRouter } from './auth.js';
import { router as userRouter } from './user.js';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);

export { router };