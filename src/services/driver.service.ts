import { IDriver, ICreateDriver } from '../types/driver.interface';
import Driver from '../models/driver.models';
import { FindOptions } from 'sequelize';
import User from '../models/auth.models';
import { ICarDriver, ICarDriverCreate } from '../types/cardrivere.interface';
import DriverCars from '../models/drivercars.models';
import Cars from '../models/car.models';

class DriverService {
  async create(payload: ICreateDriver): Promise<IDriver> {
    const data = Driver.create(payload);
    return await data;
  }

  async getall(): Promise<IDriver[] | null> {
    const filter: FindOptions = {
      include: [
        {
          model: User,
          attributes: [
            'id',
            'first_name',
            'last_name',
            'mobile_number',
            'email',
            'status',
            'createdAt',
          ],
        },
        {
          model: DriverCars,
          attributes: ['id'],
          include: [
            {
              model: Cars,
              attributes: ['car_number', 'company_name'],
            },
          ],
        },
      ],
    };
    return await Driver.findAll(filter);
  }

  async getbyid(id: string): Promise<IDriver | null> {
    return await Driver.findByPk(id, {
      include: [
        {
          model: User,
          attributes: [
            'id',
            'first_name',
            'last_name',
            'mobile_number',
            'email',
            'status',
            'createdAt',
          ],
        },
        {
          model: DriverCars,
          attributes: ['id'],
          include: [
            {
              model: Cars,
              attributes: ['car_number', 'company_name'],
            },
          ],
        },
      ],
    });
  }

  async delete(id: string): Promise<number> {
    return await Driver.destroy({ where: { id } });
  }

  async update(
    id: string,
    payload: Partial<ICreateDriver>
  ): Promise<[affectedCount: number]> {
    const data = await Driver.update(payload, { where: { user_id: id } });
    return data;
  }

  async createDriverCarRelation(
    payload: ICarDriverCreate[]
  ): Promise<ICarDriver[]> {
    return await DriverCars.bulkCreate(payload, {
      ignoreDuplicates: true,
    });
  }

  async removeCar(id: string): Promise<number> {
    return await DriverCars.destroy({ where: { id } });
  }
}

const driverService = new DriverService();
export default driverService;
