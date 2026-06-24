import nodemailer from "nodemailer";

/**
 * @param to -
 * @param html 
 */
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SENDER_SMTP_HOST,
    port: Number(process.env.EMAIL_SENDER_SMTP_PORT),
    secure: false, 
    auth: {
      user: process.env.EMAIL_SENDER_SMTP_USER,
      pass: process.env.EMAIL_SENDER_SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${process.env.EMAIL_SENDER_SMTP_FROM}" <${process.env.EMAIL_SENDER_SMTP_USER}>`,
    to,
    subject: "Reset Your Password",
    html,
  });
};