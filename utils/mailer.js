import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
})

export const sendEmail = async (to, subj, html) => {
    await transport.sendMail({
        from: process.env.SMTP_USER,
        to: to,
        subject: subj,
        html: html,
    })
}