export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
export interface OtpVerify {
  email: string;
  first_name: string;
  last_name: string;
  otp: number;
}
export interface DriverCredentailsEmail {
  email: string;
  password: string;
  first_name: string;
}
