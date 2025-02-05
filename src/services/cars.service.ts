import { ICars, ICreateCars } from '../types/cars.interface';
import Cars from '../models/car.models';
import { IPagination, IResponseAndCount } from '../types/common.interface';
import { FindOptions, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import DriverCars from '../models/drivercars.models';
import { ICarDriver, ICarDriverCreate } from '../types/cardrivere.interface';
import User from '../models/auth.models';
import Driver from '../models/driver.models';

class CarsServices {
  async create(payload: ICreateCars): Promise<ICars> {
    const data = Cars.create(payload);
    return await data;
  }

  async findAll(pagination: IPagination): Promise<IResponseAndCount<ICars[]>> {
    let where: WhereOptions<ICreateCars> = {};

    if (pagination.Search) {
      where = {
        ...where,
        [Op.or]: [
          { car_number: { [Op.like]: `%${pagination.Search}%` } },
          { company_name: { [Op.like]: `%${pagination.Search}%` } },
          { model_name: { [Op.like]: `%${pagination.Search}%` } },
          { car_type: { [Op.like]: `%${pagination.Search}%` } },
        ],
      };
    }

    if (pagination.Status) {
      where = {
        ...where,
        status: pagination.Status,
      };
    }

    const filter: FindOptions<ICreateCars> = {
      where,
      include: [
        {
          model: DriverCars,
          attributes: ['id'],
          include: [
            {
              model: Driver,
              attributes: ['id'],
              include: [
                {
                  model: User,
                  attributes: ['first_name', 'last_name'],
                  as: 'user',
                },
              ],
            },
          ],
        },
      ],
      limit: pagination.Limit || 10,
      offset: (pagination.Page - 1) * pagination.Limit || 0,
      logging: true,
    };
    const data = await Cars.findAndCountAll(filter);

    return data;
  }

  async findById(id: string): Promise<ICars | null> {
    const data = await Cars.findByPk(id, {
      include: [
        {
          model: DriverCars,
          attributes: ['id'],
          include: [
            {
              model: Driver,
              attributes: ['id'],
              include: [
                {
                  model: User,
                  attributes: ['first_name', 'last_name'],
                },
              ],
            },
          ],
        },
      ],
    });

    return data;
  }

  async createCarDriverRelation(
    payload: ICarDriverCreate[]
  ): Promise<ICarDriver[]> {
    return await DriverCars.bulkCreate(payload, {
      ignoreDuplicates: true,
    });
  }

  async deleteCar(carId: string): Promise<number> {
    return await Cars.destroy({ where: { id: carId } });
  }

  async update(
    id: string,
    payload: Partial<ICreateCars>
  ): Promise<[affectedCount: number]> {
    const data = await Cars.update(payload, { where: { id: id } });
    return data;
  }
}
const carsServices = new CarsServices();
export default carsServices;
