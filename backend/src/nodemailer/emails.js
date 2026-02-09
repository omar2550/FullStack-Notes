import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { transporter } from "./nodemailer.cong.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const info = await transporter.sendMail({
            from: `"Notes App" <omr222000@gmail.com>`,
            to: email,
            subject: 'Verify Your Email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        })

        console.log("Email sent successfully")
        return info;

    } catch (error) {
        console.log('Error in sendVerificationEmail', error);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    try {
        const info = await transporter.sendMail({
            from: `"Notes App" <omr222000@gmail.com>`,
            to: email,
            subject: 'Welcome Email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        })

        console.log("Email sent successfully")
        return info;

    }
    catch (error) {
        console.log('Error in sendWelcomeEmail', error);
    }
}

export const sendForgotPassword = async (email, resetURL) => {
    try {
        const info = await transporter.sendMail({
            from: `"Notes App" <omr222000@gmail.com>`,
            to: email,
            subject: 'Reset Password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
        })

        console.log("Email sent successfully");
        return info;

    } catch (error) {
        console.log('Error in sendVerificationEmail', error);
    }
}

export const sendForgotPasswordSuccess = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: `"Notes App" <omr222000@gmail.com>`,
            to: email,
            subject: 'Password Reset Successfully',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
        })

        console.log("Email sent successfully");
        return info;

    } catch (error) {
        console.log('Error in sendVerificationEmail', error);
    }
}