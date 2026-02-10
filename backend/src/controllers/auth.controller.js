import bcryptjs from 'bcryptjs'
import crypto from 'crypto'

import User from "../models/User.js";
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';
import { sendForgotPassword, sendForgotPasswordSuccess, sendVerificationEmail } from '../nodemailer/emails.js';


export const signup = async (req, res) => {

    const { name, email, password } = req.body

    try {
        // check fields
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });
        // check is password > 6 characters
        if (password.length < 6)
            return res.status(400).json({ message: "Password must be at least 6 characters" });

        // check is User Already Exists
        const isUserExists = await User.findOne({ email })
        if (isUserExists) return res.status(400).json({ success: false, message: 'User Already Exists' })
        // hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // generate otp
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // create user
        const user = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            verificationToken,
            verificationExpiresAt: Date.now() + 15 * 60 * 1000
        })
        // Save The New User
        await user.save()

        // Verification The User Email Before Set The Token In Cookie
        await sendVerificationEmail(email.toLowerCase(), verificationToken);
        res.clearCookie("token");
        // JWT Token
        generateTokenAndSetCookie(res, user._id)

        res.status(201).json({
            success: true, message: 'User Created Successfully', user: {
                ...user._doc,
                password: undefined
            },
        })


    } catch (error) {
        console.log('Error in signup controller', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {

        if (!code) {
            return res.status(400).json({ success: false, message: "Code is required" });
        }

        const user = await User.findOne({ verificationToken: code, verificationExpiresAt: { $gt: Date.now() } }).select('-password');

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired Verification Code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpiresAt = undefined;
        await user.save();

        // await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true, message: 'User Email Verified', user
        })

    } catch (error) {
        console.log('Error in VerifyEmail controller', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email?.toLowerCase();

        if (!normalizedEmail || !password)
            return res.status(400).json({ success: false, message: "All fields are required" });

        const user = await User.findOne({ email: normalizedEmail });

        if (!user)
            return res.status(400).json({ success: false, message: "You don't have an account, Please go to Signup" });

        const isPassword = await bcryptjs.compare(password, user.password);

        if (!isPassword)
            return res.status(400).json({ success: false, message: "Your Password is Invalid" });

        user.lastLogin = new Date();

        res.clearCookie("token");
        // JWT Token
        generateTokenAndSetCookie(res, user._id)

        // Save The New User
        await user.save()

        res.status(200).json({
            success: true, message: 'User Login Success', user: {
                ...user._doc,
                password: undefined
            },
        })


    } catch (error) {
        console.log('Error in signup controller', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const logout = async (_, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        res.status(200).json({
            success: true, message: 'Logged out Successfully',
        })

    } catch (error) {
        console.log('Error in logout controller', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const normalizedEmail = email?.toLowerCase();

        if (!normalizedEmail)
            return res.status(400).json({ success: false, message: "Email field is required" });

        const user = await User.findOne({ email: normalizedEmail });

        if (!user)
            return res.status(400).json({ success: false, message: "You don't have an account, Please go to Signup" });

        // Generate Reset Password Token
        user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
        user.resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000

        await user.save()

        await sendForgotPassword(email, `${process.env.FRONTEND_URL}/reset-password?token=${user.resetPasswordToken}`)

        res.status(200).json({
            success: true, message: 'User Forgot Password Email was sint', url: `${process.env.FRONTEND_URL}/reset-password?token=${user.resetPasswordToken}`
        })

    } catch (error) {
        console.log('Error in forgotPassword controller', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const resetPassword = async (req, res) => {
    try {

        const token = decodeURIComponent(req.query.token);
        const { newPassword } = req.body;

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } })

        if (!user)
            return res.status(400).json({ success: false, message: "resetPasswordToken may be invalid or expires" });

        // check is password exist
        if (!newPassword)
            return res.status(400).json({ success: false, message: "Please fill the password field first" });

        // check is password > 6 characters
        if (newPassword.length < 6)
            return res.status(400).json({ message: "Password must be at least 6 characters" });

        // hash password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendForgotPasswordSuccess(user.email)

        res.status(200).json({
            success: true, message: 'User reset password Successfully', user: {
                ...user._doc,
                password: undefined
            },
        })

    } catch (error) {
        console.log('Error in resetpassword controller', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) return res.status(404).json({ success: false, message: 'USER NOT FOUND!' })

        res.status(200).json({ success: true, user })

    } catch (error) {
        console.log('Error in checkAuth controller', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}