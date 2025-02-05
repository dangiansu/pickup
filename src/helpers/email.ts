import nodemailer from 'nodemailer';
import { CONFIG } from '../config/dotenv';
import { EmailOptions } from '../types/email.interface';
import logger from '../config/logger';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: CONFIG.ADMIN_EMAIL,
    pass: CONFIG.ADMIN_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error configuring email transporter:', error);
    logger.error('Error configuring email transporter:', error);
  } else {
    console.log('Email transporter is ready:', success);
    logger.info('Email transporter is ready:', success);
  }
});

export const sendEmail = async (emailOptions: EmailOptions): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: `Wellcome to in Pickup Time <${CONFIG.ADMIN_EMAIL}>`,
      ...emailOptions,
    });

    console.log(`Email sent successfully: ${info.messageId}`);
    logger.info(`Email transporter is ready: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
