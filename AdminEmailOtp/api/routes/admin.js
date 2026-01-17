import express from 'express'
import { login, register, verifyOtp } from '../controllers/admin.js';

const router= express.Router();


router.post("/register",register)
router.post("/login",login)
router.post("/verifyOtp",verifyOtp)

export default router;