import { Request, Response } from 'express';
import { statusCode } from '../config/statuscode';
import { ICreateBanklist } from 'types/banklist.interface';
import banklistService from '../services/banklist.service';
import {
  badRequest,
  internalServer,
  notFoundResponse,
  success,
} from '../helpers/response';

class BanklistController {
  /****************************************
   * REST API endpoint for registser user
   * @param req
   * @param res
   * @returns
   ***************************************/

  async create(req: Request, res: Response) {
    try {
      const bankPayload: ICreateBanklist = req.body;
      const bank = await banklistService.create(bankPayload);
      if (!bank) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, bank, 'create sucussfully');
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
  async getbyId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const banklist = await banklistService.findOne({
        where: {
          id,
        },
      });
      if (!banklist) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, banklist, 'get sucussfully');
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
  async getall(req: Request, res: Response) {
    try {
      const banklist = await banklistService.findall();
      if (!banklist) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, banklist, 'getall sucussfully');
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
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletebank = await banklistService.delete(id);
      if (!deletebank) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, undefined, 'delete sucussfully');
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
  async update(req: Request, res: Response) {
    try {
      const payload = req.body;
      const { id } = req.body;
      const banklist = await banklistService.update(id, payload);
      if (!banklist) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(res, statusCode.CREATED, undefined, 'updated sucussfully');
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
}

const banklistController = new BanklistController();

export default banklistController;
