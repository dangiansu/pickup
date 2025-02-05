export interface IUser {
  id: string;
  role: string;
  profile_image?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  country_code: string;
  country: string;
  state: string;
  city: string;
  mobile_number: string;
  otp?: number | null;
  otp_expire_time?: Date | null;
  status: string;
  vip?: boolean;
  payment_method_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUser {
  id?: string;
  role: string | undefined;
  profile_image?: string;
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  country_code?: string;
  country?: string;
  state?: string;
  city?: string;
  mobile_number: string;
  otp?: number | null;
  otp_expire_time?: Date | null;
  status?: string;
  vip?: boolean;
  payment_method_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUserResponse {
  id: string;
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  country_code: string;
  country: string;
  state: string;
  city: string;
  mobile_number: string;
  otp?: number | null;
  otp_expire_time?: Date | null;
  status: string;
  vip: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserTokenPayload {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface ProfileImageStatus {
  profile_image: boolean;
}

export interface ValidateOtpPayload {
  userOtp: number | null | undefined;
  userOtpExpireTime: Date | null | undefined;
  providedOtp: number | null | undefined;
}

// export interface IRegisterUserPayload {
//   role: string;
//   profile_image?: string;
//   first_name: string;
//   last_name?: string;
//   email: string;
//   password: string;
//   country_code?: string;
//   country?: string;
//   state?: string;
//   city?: string;
//   mobile_number?: string;
//   otp?: number | null;
//   otp_expire_time?: Date | null;
//   status?: string;
//   vip?: boolean;
// }
