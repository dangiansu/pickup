import { Request, Response } from 'express';
import { statusCode } from '../config/statuscode';
import {
  badRequest,
  internalServer,
  success,
  notFoundResponse,
} from '../helpers/response';
import carpricingService from '../services/carpricing.service';

class CarPricingController {
  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      await carpricingService.upsertPricing(payload);

      return success(
        res,
        statusCode.SUCCESS,
        undefined,
        'Pricing Added Successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
  async getall(req: Request, res: Response) {
    try {
      const data = await carpricingService.getall();
      if (!data) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(
        res,
        statusCode.SUCCESS,
        data,
        'Pricing Added Successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
  async getbyid(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await carpricingService.getbyId(id);
      return success(res, statusCode.SUCCESS, data, 'get data successfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
}

const carpricingController = new CarPricingController();

export default carpricingController;
