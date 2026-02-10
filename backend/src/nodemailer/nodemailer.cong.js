import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: `${process.env.MAILER_HOST}`,
    port: process.env.MAILER_PORT,
    secure: false,
    auth: {
        user: `${process.env.MAILER_USER}`,
        pass: `${process.env.MAILER_PASS}`,
    },
});
transporter.verify((err) => {
    if (err) console.log("Email server not ready:", err);
    else console.log("Email server ready to send messages");
});

