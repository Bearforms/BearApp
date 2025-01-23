import nodemailer from "nodemailer";
import { EmailConfig, EmailOptions } from "@/types/email";

function createTransporter(config: any) {
    const transporter = nodemailer.createTransport(config);
    return transporter;
}

const defaultConfig: EmailConfig = {
    host: process.env.SMTP_HOST!,
    port: process.env.SMTP_PORT!,
    auth: {
        user: process.env.SMTP_EMAIL!,
        pass: process.env.SMTP_PASSWORD!,
    },
};

const sendMail = async (options: EmailOptions) => {

    const mailOptions = {
        from: `${options.senderName || "Bearforms"} <${process.env.SMTP_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: options.html,
    };
    try {
        const transporter = createTransporter(defaultConfig);
        await transporter.verify();
        await transporter.sendMail(mailOptions);

        return { success: true, message: "Email sent successfully", error: null };
    } catch (err: any) {
        console.log("Error sending email: ", err.message);
        return { success: false, message: "Error sending email", error: err.message };
    }
};

export default sendMail;
