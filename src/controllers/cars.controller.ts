import { Request, Response } from 'express';
import { statusCode } from '../config/statuscode';
import { internalServer, badRequest, success } from '../helpers/response';
import { ICars, ICreateCars } from '../types/cars.interface';
import carsService from '../services/cars.service';
import { uploadFile } from '../helpers/fileUpload';
import { IPagination } from '../types/common.interface';
import { USER_STATUS } from '../helpers/constant';

class CarsController {
  async create(req: Request, res: Response) {
    try {
      const { body, files } = req;
      const file1 = files?.vehicle_register_image;
      const file2 = files?.insurance_policy_image;
      if (!file1 || Array.isArray(file1) || !file2 || Array.isArray(file2)) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'A single image is required.'
        );
      }

      const vehicle_image = await uploadFile(file1, 'vehicle_register_image/');
      const insurance_image = await uploadFile(
        file2,
        'insurance_policy_image/'
      );
      const carsdata: ICreateCars = {
        car_number: body.car_number,
        company_name: body.company_name,
        model_name: body.model_name,
        car_type: body.car_type,
        status: body.status,
        vehicle_register_image: vehicle_image,
        vehicle_register_number: body.vehicle_register_number,
        insurance_policy_image: insurance_image,
        insurance_policy_number: body.insurance_policy_number,
      };

      const IsCarsCreated: ICars = await carsService.create(carsdata);
      if (!IsCarsCreated) {
        return badRequest(res, statusCode.BAD_REQUEST, 'field to creation.');
      }
      return success(
        res,
        statusCode.CREATED,
        IsCarsCreated,
        'created successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
  async findAll(req: Request, res: Response) {
    try {
      const { Search, Page, Limit, Status } = req.query;
      const pagination: IPagination = {
        Search: typeof Search === 'undefined' ? undefined : String(Search),
        Page: typeof Page === 'undefined' ? 1 : Number(Page),
        Limit: typeof Limit === 'undefined' ? 10 : Number(Limit),
        Status: typeof Status === 'undefined' ? false : Boolean(Status),
      };
      const IsCarsData = await carsService.findAll(pagination);
      if (!IsCarsData) {
        return badRequest(res, statusCode.BAD_REQUEST, 'not found');
      }
      return success(
        res,
        statusCode.CREATED,
        IsCarsData,
        'get all cars sucussfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const CarsDeatails = await carsService.findById(id);
      if (!CarsDeatails) {
        return badRequest(res, statusCode.BAD_REQUEST, 'Not created!');
      }
      return success(
        res,
        statusCode.SUCCESS,
        CarsDeatails,
        'get data successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
  async asignDriver(req: Request, res: Response) {
    try {
      const { car_id, driver_id } = req.body;
      const payload = driver_id.map((id: string) => ({
        car_id,
        driver_id: id,
      }));

      const data = await carsService.createCarDriverRelation(payload);

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
  async deleteCar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteCar = await carsService.deleteCar(id);
      if (!deleteCar) {
        return badRequest(res, statusCode.BAD_REQUEST, 'Not existed!');
      }
      return success(
        res,
        statusCode.SUCCESS,
        undefined,
        'delete car successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { body: payload, files } = req;
      const vehicleImage = files?.vehicle_register_image;
      const insuranceImage = files?.insurance_policy_image;
      if (
        !vehicleImage ||
        Array.isArray(vehicleImage) ||
        !insuranceImage ||
        Array.isArray(insuranceImage)
      ) {
        return badRequest(
          res,
          statusCode.BAD_REQUEST,
          'A single image is required.'
        );
      }
      const vehicle_image = await uploadFile(
        vehicleImage,
        'vehicle_register_image/'
      );
      const insurance_image = await uploadFile(
        insuranceImage,
        'insurance_policy_image/'
      );

      const carData = {
        car_number: payload.car_number,
        company_name: payload.company_name,
        model_name: payload.model_name,
        car_type: payload.car_type,
        status: USER_STATUS.PENDING,
        vehicle_register_image: vehicle_image,
        vehicle_register_number: payload.vehicle_register_number,
        insurance_policy_image: insurance_image,
        insurance_policy_number: payload.insurance_policy_number,
      };
      await carsService.update(payload.car_id, carData);
      return success(
        res,
        statusCode.SUCCESS,
        undefined,
        'updated car successfully'
      );
    } catch (error) {
      return internalServer(res, req.body, (error as Error).message);
    }
  }
}

const carController = new CarsController();
export default carController;
