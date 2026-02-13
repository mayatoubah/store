import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'localhost',
  port: Number(process.env.EMAIL_PORT || 1025),
  secure: false,
  auth: process.env.EMAIL_USER ? { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } : undefined
});

export async function sendOrderEmail(to: string, orderId: string) {
  if (!to) return;
  await transporter.sendMail({ from: process.env.EMAIL_FROM || 'no-reply@macifood.local', to, subject: `Commande ${orderId} confirmée`, text: `Merci pour votre commande ${orderId}.` });
}
