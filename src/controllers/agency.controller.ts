import { Request, Response } from 'express';
import { statusCode } from '../config/statuscode';
import agencyService from '../services/agency.service';
import {
  badRequest,
  internalServer,
  success,
  notFoundResponse,
} from '../helpers/response';
import userService from '../services/auth.service';
import { uploadFile } from '../helpers/fileUpload';

class AgencyController {
  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      const data = await agencyService.create(payload);
      if (!data) {
        return notFoundResponse(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, data, 'create sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async getall(req: Request, res: Response) {
    try {
      const data = await agencyService.getall();
      if (!data) {
        return notFoundResponse(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, data, 'create sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async getbyid(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await agencyService.getbyid(id);
      if (!data) {
        return notFoundResponse(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, data, 'create sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // const data = await
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  async uploaddocument(req: Request, res: Response) {
    try {
      const { body, files } = req;
      const IdentityDocuments = files?.document_image;
      const BusinessLicense = files?.business_license_image;
      if (
        !IdentityDocuments ||
        Array.isArray(IdentityDocuments) ||
        !BusinessLicense ||
        Array.isArray(BusinessLicense)
      ) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'A single profile image is required.'
        );
      }
      const identitydocuments = await uploadFile(
        IdentityDocuments,
        'identity_document_images/'
      );

      const businesslicense = await uploadFile(
        BusinessLicense,
        'business_licensse_images/'
      );
      const uploaddocumets = {
        owner_id_prof: body.owner_id_prof,
        document_number: body.document_number,
        document_image: identitydocuments,
        business_license_image: businesslicense,
        business_license_number: body.business_license_number,
      };
      const { user_id } = body;
      const data = await agencyService.update(user_id, uploaddocumets);
      if (!data) {
        internalServer(
          res,
          req.body,
          'Failed to update agency or create documents details.'
        );
      }
      return success(
        res,
        statusCode.CREATED,
        undefined,
        'Documents uploaded and details saved successfully.'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async agencydeatil(req: Request, res: Response) {
    try {
      const { body, files } = req;
      const uploadFileData = files?.profile_image;

      // Validate profile image
      if (!uploadFileData || Array.isArray(uploadFileData)) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'A single profile image is required.'
        );
      }

      const filePath = await uploadFile(uploadFileData, 'profile_images/');
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
}

const agencyController = new AgencyController();
export default agencyController;
