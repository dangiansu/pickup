import { Request, Response } from 'express';
import { statusCode } from '../config/statuscode';
import { internalServer, badRequest, success } from '../helpers/response';
import { ICreateDriver } from '../types/driver.interface';
import driverService from '../services/driver.service';
import userService from '../services/auth.service';
// import { ICreateUser } from '../types/user.interface';
import { ROLES, USER_STATUS } from '../helpers/constant';
import { encryptPassword, getPassword } from '../helpers/encrypt';
import { uploadFile } from '../helpers/fileUpload';
import mailtemplateservice from '../services/email.template.service';

class DriverController {
  async create(req: Request, res: Response) {
    try {
      const payload: ICreateDriver = req.body;
      const data = await driverService.create(payload);
      if (!data) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, data, 'create sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async agencydriver(req: Request, res: Response) {
    try {
      const payload = req.body;
      const uploadFileData = req.files?.profile_image;
      const uploadFileData1 = req.files?.id_document_image;
      const uploadFileData2 = req.files?.driving_license_image;
      const uploadFileData3 = req.files?.criminal_record_image;

      if (!uploadFileData || Array.isArray(uploadFileData)) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'A single profile image is required.'
        );
      }

      const filePath = await uploadFile(uploadFileData, 'profile_image/');
      const isPassword = getPassword();
      const isBcryptPassword = await encryptPassword(isPassword);

      const driver = {
        first_name: payload.first_name,
        last_name: payload.last_name,
        country_code: payload.country_code,
        mobile_number: payload.mobile_number,
        email: payload.email,
        country: payload.country,
        state: payload.state,
        city: payload.city,
        profile_image: filePath,
        role: ROLES.INDIVIDUAL_DRIVER,
        status: USER_STATUS.PENDING,
        password: isBcryptPassword,
      };

      const register = await userService.create(driver);
      if (!register) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      if (!uploadFileData1 || Array.isArray(uploadFileData1)) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'A single identity image is required.'
        );
      }
      if (!uploadFileData2 || Array.isArray(uploadFileData2)) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'A single license image is required.'
        );
      }
      if (!uploadFileData3 || Array.isArray(uploadFileData3)) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'A single criminal image is required.'
        );
      }

      const identityImage = await uploadFile(
        uploadFileData1,
        'identity_document_image/'
      );
      const drivinglicenseImage = await uploadFile(
        uploadFileData2,
        'driving_license_image/'
      );
      const criminalrecordImage = await uploadFile(
        uploadFileData3,
        'criminal_record_image/'
      );

      const documents = {
        id_number: payload.identity_document_number,
        id_number_image: identityImage,
        driving_license: payload.driving_license_number,
        driving_license_image: drivinglicenseImage,
        criminal_number: payload.criminal_number,
        criminal_record_image: criminalrecordImage,
        agency_id: payload.agency_id,
        user_id: register.id,
      };
      const documentsData = await driverService.create(documents);
      if (!documentsData) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      const mailBody = {
        password: isPassword,
        email: payload.email,
        first_name: payload.first_name,
      };
      await mailtemplateservice.SendDriverCredentialEmail(mailBody);
      return success(res, statusCode.CREATED, undefined, 'create sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async getall(req: Request, res: Response) {
    try {
      const data = await driverService.getall();
      if (!data) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, data, 'create sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async getbyid(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await driverService.getbyid(id);
      if (!data) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, data, 'get sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const payload = req.body;
      const uploadFileData = req.files?.profile_image;
      const uploadFileData1 = req.files?.id_number_image;
      const uploadFileData2 = req.files?.driving_license_image;
      const uploadFileData3 = req.files?.criminal_record_image;

      if (!uploadFileData || Array.isArray(uploadFileData)) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'A single profile image is required.'
        );
      }
      const filePath = await uploadFile(uploadFileData, 'profile_image/');

      const user = {
        profile_image: filePath,
        first_name: payload.first_name,
        last_name: payload.last_name,
        mobile_number: payload.mobile_number,
        status: USER_STATUS.PENDING,
      };

      await userService.update(payload.userId, user);
      if (
        !uploadFileData1 ||
        Array.isArray(uploadFileData1) ||
        !uploadFileData2 ||
        Array.isArray(uploadFileData2) ||
        !uploadFileData3 ||
        Array.isArray(uploadFileData3)
      ) {
        const messages = [
          !uploadFileData1 || Array.isArray(uploadFileData1)
            ? 'A single identity image is required.'
            : null,
          !uploadFileData2 || Array.isArray(uploadFileData2)
            ? 'A single license image is required.'
            : null,
          !uploadFileData3 || Array.isArray(uploadFileData3)
            ? 'A single criminal image is required.'
            : null,
        ].filter(Boolean);

        return badRequest(res, statusCode.BAD_REQUEST, messages.join(' '));
      }

      const identityImage = await uploadFile(
        uploadFileData1,
        'identity_document_image/'
      );
      const drivinglicenseImage = await uploadFile(
        uploadFileData2,
        'driving_license_image/'
      );
      const criminalrecordImage = await uploadFile(
        uploadFileData3,
        'criminal_record_image/'
      );

      const document = {
        id_number: payload.id_number,
        id_number_image: identityImage,
        driving_license: payload.driving_license,
        driving_license_image: drivinglicenseImage,
        criminal_number: payload.criminal_number,
        criminal_record_image: criminalrecordImage,
      };

      const i = await driverService.update(payload.userId, document);
      return success(
        res,
        statusCode.CREATED,
        undefined,
        'updated succussfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await driverService.delete(id);
      if (!data) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, undefined, 'deleted sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async asigncars(req: Request, res: Response) {
    try {
      const { car_id, driver_id } = req.body;
      const payload = car_id.map((id: string) => ({
        car_id: id,
        driver_id,
      }));
      const data = await driverService.createDriverCarRelation(payload);

      return success(
        res,
        statusCode.SUCCESS,
        data,
        'Created data successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async removeasigncar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const removecar = await driverService.removeCar(id);
      if (!removecar) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, undefined, 'deleted sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
}

const drivercontroller = new DriverController();

export default drivercontroller;
