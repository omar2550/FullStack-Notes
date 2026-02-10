import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import axios from "axios";
// import { transporter } from "./nodemailer.cong.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const res = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Notes App",
                    email: "omr222000@gmail.com",
                },
                to: [
                    {
                        email: email,
                    },
                ],
                subject: "Verify Your Email",
                htmlContent: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Email sent successfully")

    } catch (error) {
        console.log('Error in sendVerificationEmail', error);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    try {
        const res = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Notes App",
                    email: "omr222000@gmail.com",
                },
                to: [
                    {
                        email: email,
                        name,
                    },
                ],
                subject: "Welcome Email",
                htmlContent: VERIFICATION_EMAIL_TEMPLATE,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Email sent successfully")

    }
    catch (error) {
        console.log('Error in sendWelcomeEmail', error);
    }
}

export const sendForgotPassword = async (email, resetURL) => {
    try {

        const res = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Notes App",
                    email: "omr222000@gmail.com",
                },
                to: [
                    {
                        email: email,
                    },
                ],
                subject: "Reset Password",
                htmlContent: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Email sent successfully");
        return info;

    } catch (error) {
        console.log('Error in sendVerificationEmail', error);
    }
}

export const sendForgotPasswordSuccess = async (email) => {
    try {

        const res = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Notes App",
                    email: "omr222000@gmail.com",
                },
                to: [
                    {
                        email: email,
                    },
                ],
                subject: "Password Reset Successfully",
                htmlContent: PASSWORD_RESET_SUCCESS_TEMPLATE,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Email sent successfully");

    } catch (error) {
        console.log('Error in sendVerificationEmail', error);
    }
}