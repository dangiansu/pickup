import { Request, response, Response } from 'express';
import { statusCode } from '../config/statuscode';
import {
  encryptPassword,
  verifyPassword,
  verifyUser,
} from '../helpers/encrypt';
import { badRequest, internalServer, success } from '../helpers/response';
import userService from '../services/auth.service';
import { ICreateUser, IUserTokenPayload } from '../types/user.interface';
import { USER_STATUS } from '../helpers/constant';
import { generateToken } from '../helpers/token';
import logger from '../config/logger';
import { generateOTP, calculateOTPExpiry } from '../helpers/otp.helper';
import { uploadFile } from '../helpers/fileUpload';
import agencyService from '../services/agency.service';
import mailtemplateservice from '../services/email.template.service';
import { IPagination } from '../types/common.interface';

class AuthController {
  /****************************************
   * REST API endpoint for registser user
   * @param req
   * @param res
   * @returns
   ***************************************/
  async register(req: Request, res: Response) {
    try {
      const userPayload: ICreateUser = req.body;
      userPayload.password = await encryptPassword(userPayload.password);
      const user = await userService.findOneByEmail(userPayload.email);
      if (user) {
        return badRequest(res, statusCode.BAD_REQUEST, 'Email_Alredy_Exist');
      }
      const otp = generateOTP();
      userPayload.otp = otp;
      userPayload.otp_expire_time = calculateOTPExpiry(5);
      const mailBody = {
        email: userPayload.email,
        first_name: userPayload.first_name,
        last_name: userPayload.last_name,
        otp,
      };

      const queryResponse = await userService.create(userPayload);

      await mailtemplateservice.SendOtpEmail(mailBody);

      return success(
        res,
        statusCode.CREATED,
        queryResponse,
        'User Create Sucussfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
  /****************************************
   * REST API endpoint for registser user
   * @param req
   * @param res
   * @returns
   ***************************************/
  async login(req: Request, res: Response) {
    try {
      if (req.headers.authorization?.split(' ')[1] === '')
        return badRequest(res, statusCode.BAD_REQUEST, 'REQUIRED_PARAMETERES');

      const base64Credentials = req.headers.authorization?.split(' ')[1] ?? '';
      const credentials = Buffer.from(base64Credentials, 'base64').toString(
        'ascii'
      );
      const requestData = credentials.split(':');

      const email = requestData[0];
      const password = requestData[1];
      let isValidUser = await verifyUser(password, email);

      if (isValidUser) {
        if (isValidUser.status === USER_STATUS.Block) {
          return badRequest(res, statusCode.BAD_REQUEST, 'You are blocked.');
        } else if (isValidUser.status === USER_STATUS.PENDING) {
          return badRequest(
            res,
            statusCode.BAD_REQUEST,
            'Your account is pending approval.'
          );
        } else if (isValidUser.status === USER_STATUS.REJECTED) {
          return badRequest(
            res,
            statusCode.BAD_REQUEST,
            'Your account is Rejected.'
          );
        }

        // If the user is valid and not blocked/pending, generate the token
        const token = await generateToken(isValidUser);
        return success(
          res,
          statusCode.SUCCESS,
          { token },
          'Login successfully'
        );
      }
      logger.error('not a valide user');
      return badRequest(res, statusCode.BAD_REQUEST, 'Not a valide user');
    } catch (error) {
      logger.error('InternalServer error');
      return internalServer(res, req.body, (error as Error).message);
    }
  }
  /****************************************
   * REST API endpoint for registser user
   * @param req
   * @param res
   * @returns
   ***************************************/
  async agencydeatil(req: Request, res: Response) {
    try {
      const { body, files } = req;
      const uploadFileData = req.files?.profile_image;

      // Validate profile image
      if (!uploadFileData || Array.isArray(uploadFileData)) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'A single profile image is required.'
        );
      }

      const filePath = await uploadFile(uploadFileData, 'profile_image/');
      const agencyData = {
        country_code: body.country_code,
        mobile_number: body.mobile_number,
        profile_image: filePath,
      };
      const ownerData = {
        first_name: body.first_name,
        last_name: body.last_name,
        country_code: body.agency_country_code,
        mobile_number: body.agency_mobile_number,
        user_id: body.user_id,
        email: body.email,
      };
      const [agencyUpdateResult, ownerCreationResult] = await Promise.all([
        userService.update(ownerData.user_id, agencyData),
        agencyService.create(ownerData),
      ]);
      if (!agencyUpdateResult || !ownerCreationResult) {
        return internalServer(
          res,
          req.body,
          'Failed to update agency or create owner details.'
        );
      }

      return success(
        res,
        statusCode.CREATED,
        undefined,
        'Agency details updated and owner created successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
  /****************************************
   * REST API endpoint for registser user
   * @param req
   * @param res
   * @returns
   ***************************************/
  async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      const user = await userService.findOneByEmail(email);
      if (!user) {
        return badRequest(res, statusCode.NOTFOUND, 'USER_NOT_FOUND');
      }

      const isvalide = await userService.checkopt({
        userOtp: user.otp,
        userOtpExpireTime: user.otp_expire_time,
        providedOtp: otp,
      });

      if (!isvalide) {
        return badRequest(res, statusCode.NOTFOUND, 'Otp is not valide');
      }

      const updateData: Partial<typeof user> = {
        otp: null,
        otp_expire_time: null,
      };

      if (user.role === 'user' || user.role === 'super_admin') {
        updateData.status = 'Active';
      }
      if (!user || !user.id) {
        throw new Error('User not found or ID is missing');
      }
      await userService.update(user.id, {
        ...updateData,
      });
      return success(
        res,
        statusCode.SUCCESS,
        null,
        'OTP verified successfully.'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async resendOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await userService.findOneByEmail(email);
      if (!user) {
        return badRequest(res, statusCode.BAD_REQUEST, 'Email_Alredy_Exist');
      }
      const otp = generateOTP();
      const otp_expire_time = calculateOTPExpiry(5);
      const mailBody = {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        otp,
      };

      const data = await userService.updateViaEmail(email, {
        otp: otp,
        otp_expire_time: otp_expire_time,
      });
      if (!data) {
        return badRequest(res, statusCode.BAD_REQUEST, 'Email_Alredy_Exist');
      }
      const emailSent = await mailtemplateservice.SendOtpEmail(mailBody);

      return success(
        res,
        statusCode.CREATED,
        undefined,
        'Otp Resend Successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async fetchAllUsers(req: Request, res: Response) {
    try {
      const { Search, Page, Limit, Isvip, Status } = req.query;
      const pagination: IPagination = {
        Search: typeof Search === 'undefined' ? undefined : String(Search),
        Page: typeof Page === 'undefined' ? 1 : Number(Page),
        Limit: typeof Limit === 'undefined' ? 10 : Number(Limit),
        Isvip: typeof Isvip === 'undefined' ? false : Boolean(Isvip),
        Status: typeof Status === 'undefined' ? false : Boolean(Status),
      };

      const data = await userService.findAll(pagination);
      console.log('---::', data);
      return success(res, statusCode.SUCCESS, data, 'Get Data Successfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async fetchById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await userService.getById(id);
      if (!data) {
        return badRequest(res, statusCode.NOTFOUND, 'USER_NOT_FOUND');
      }
      return success(res, statusCode.SUCCESS, data, 'Get Data Successfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async changepassword(req: Request, res: Response) {
    try {
      const useremail = (req.user as IUserTokenPayload).email;
      const { oldPassword, newPassword } = req.body;

      const isExistUser = await userService.findOneWithPassword(useremail);
      if (!isExistUser) {
        return badRequest(res, statusCode.BAD_REQUEST, 'USER_NOT_EXIST');
      }
      const isPasswordCorrect = await verifyPassword(
        oldPassword,
        isExistUser!.password
      );
      if (!isPasswordCorrect) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'INCORRECT_OLD_PASSWORD'
        );
      }
      isExistUser.password = await encryptPassword(newPassword);
      const isPasswordSame = await verifyPassword(
        oldPassword,
        isExistUser.password
      );
      if (isPasswordSame) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'Old and New Password Same'
        );
      }
      await userService.changePassword(useremail, {
        password: isExistUser.password,
      });
      return success(
        res,
        statusCode.CREATED,
        undefined,
        'Change password successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
}

const authController = new AuthController();

export default authController;
