import express from 'express'
import { forgotPassword, login, logout, resetPassword, signup, verifyEmail, checkAuth } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';


const authRoutes = express.Router();

authRoutes.get('/check-auth', verifyToken, checkAuth)
authRoutes.post('/signup', signup)
authRoutes.post('/verify-email', verifyEmail)
authRoutes.post('/login', login)
authRoutes.post('/logout', logout)
authRoutes.post('/forgot-password', forgotPassword)
authRoutes.post('/reset-password', resetPassword)

export default authRoutes;