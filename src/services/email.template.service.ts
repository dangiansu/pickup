import sendotptempleate from '../template/otp.template';
import { sendEmail } from '../helpers/email';
import { DriverCredentailsEmail, OtpVerify } from '../types/email.interface';

class MailtemplateService {
  async SendOtpEmail(body: any) {
    try {
      const emailCheckData = {
        to: body?.email,
        subject: 'Your Otp For Verification',
        html: sendotptempleate.sendOtpInquiryEmail(body),
      };
      const isMailSent = await sendEmail(emailCheckData);
      return isMailSent;
    } catch (error) {
      console.error('Failed to send email.', error);
      throw error;
    }
  }
  async SendDriverCredentialEmail(body: DriverCredentailsEmail) {
    try {
      const emailCheckData = {
        to: body?.email,
        subject: 'For Driver Credentials',
        html: sendotptempleate.sendDriverCredentialsEmail(body),
      };
      const isMailSent = await sendEmail(emailCheckData);
      return isMailSent;
    } catch (error) {
      console.error('Failed to send email.', error);
      throw error;
    }
  }
}

const mailtemplateservice = new MailtemplateService();

export default mailtemplateservice;
