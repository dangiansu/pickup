import { Request, Response } from 'express';
import { statusCode } from '../config/statuscode';
import { Type } from '../helpers/constant';
import { badRequest, internalServer, success } from '../helpers/response';
import commonServices from '../services/common.service';
import { ICreateZipCode } from '../types/zipcode.interface';

class CommonController {
  async updateStatus(req: Request, res: Response) {
    try {
      const payload = req.body;
      if (payload.type == Type.AGENCY) {
        const AgencystatusUpdate = await commonServices.updateAgencyStatus(
          payload.id,
          payload
        );
        if (!AgencystatusUpdate) {
          return badRequest(res, statusCode.BAD_REQUEST, 'Status not updated');
        }
        return success(
          res,
          statusCode.SUCCESS,
          undefined,
          'Updated status successfully'
        );
      }
      if (payload.type == Type.DRIVER) {
        const DriverstatusUpdate =
          await commonServices.updateAgencyDriverStatus(payload.id, payload);
        if (!DriverstatusUpdate) {
          return badRequest(res, statusCode.BAD_REQUEST, 'Status not updated');
        }
        return success(
          res,
          statusCode.SUCCESS,
          undefined,
          'Updated status successfully'
        );
      }
      if (payload.type == Type.CAR) {
        const CarstatusUpdate = await commonServices.updateAgencyCarStatus(
          payload.id,
          payload
        );
        if (!CarstatusUpdate) {
          return badRequest(res, statusCode.BAD_REQUEST, 'Status not updated');
        }
        return success(
          res,
          statusCode.SUCCESS,
          undefined,
          'Updated status successfully'
        );
      }
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async createzipcode(req: Request, res: Response) {
    try {
      const payload: ICreateZipCode = req.body;
      const zipcodeData = await commonServices.createZipCode(payload);
      if (!zipcodeData) {
        return badRequest(res, statusCode.BAD_REQUEST, 'zipcode not created');
      }
      return success(
        res,
        statusCode.SUCCESS,
        zipcodeData,
        'ZipCode Created Successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async findallzipcode(req: Request, res: Response) {
    try {
      const findzipcodeData = await commonServices.findAllZipCode();
      if (!findzipcodeData) {
        return badRequest(res, statusCode.BAD_REQUEST, 'ZipCode not found');
      }
      return success(
        res,
        statusCode.SUCCESS,
        findzipcodeData,
        'getall data successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async findbyid(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const findData = await commonServices.findById(id);
      if (!findData) {
        return badRequest(res, statusCode.BAD_REQUEST, 'ZipCode not found');
      }
      return success(
        res,
        statusCode.SUCCESS,
        findData,
        'get data successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async updatezipcode(req: Request, res: Response) {
    try {
      const payload = req.body;
      const zipcodeData = await commonServices.updateZipCode(
        payload.id,
        payload
      );
      if (!zipcodeData) {
        return badRequest(res, statusCode.BAD_REQUEST, 'ZipCode not updated');
      }
      return success(
        res,
        statusCode.SUCCESS,
        undefined,
        'Updated status successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }

  async deletezipcode(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteData = await commonServices.deleteZipCode(id);
      if (!deleteData) {
        return badRequest(res, statusCode.BAD_REQUEST, 'ZipCode not deleted');
      }
      return success(
        res,
        statusCode.SUCCESS,
        undefined,
        'deleted successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
}

const commonController = new CommonController();
export default commonController;
