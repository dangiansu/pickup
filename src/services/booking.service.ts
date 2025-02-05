import { IPagination, IResponseAndCount } from '../types/common.interface';
import Trip from '../models/booking.models';
import { ITrip, ICreateTrip } from '../types/booking.interface';
import { FindOptions, Op, WhereOptions } from 'sequelize';
import User from '../models/auth.models';

class TripService {
  async create(payload: ICreateTrip): Promise<ITrip | null> {
    return await Trip.create(payload);
  }

  async bulkcreate(payload: ICreateTrip[]): Promise<ITrip[]> {
    console.log('---:', payload);
    return await Trip.bulkCreate(payload);
  }

  async getall(
    pagination: IPagination
  ): Promise<IResponseAndCount<ITrip[] | null>> {
    let where: WhereOptions<ICreateTrip> = {};
    // if (pagination.Search) {
    //   where = {
    //     ...where,
    //     [Op.or]: [
    //       { first_name: { [Op.like]: `%${pagination.Search}%` } },
    //       { last_name: { [Op.like]: `%${pagination.Search}%` } },
    //       { email: { [Op.like]: `%${pagination.Search}%` } },
    //       { mobile_number: { [Op.like]: `%${pagination.Search}%` } },
    //     ],
    //   };
    // }

    if (pagination.Pickup_Date) {
      where = {
        ...where,
        pickup_date: { [Op.eq]: pagination.Pickup_Date },
      };
    }

    if (pagination.Pickup_Time) {
      where = {
        ...where,
        pickup_time: { [Op.eq]: pagination.Pickup_Date },
      };
    }

    const filter: FindOptions<ICreateTrip> = {
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'mobile_number', 'email'],
        },
      ],
      limit: pagination.Limit || 10,
      offset: (pagination.Page - 1) * pagination.Limit || 0,
      order: [['createdAt', 'DESC']],
      // raw: true,
    };
    return await Trip.findAndCountAll(filter);
  }

  async getbyId(id: string): Promise<ITrip | null> {
    return await Trip.findByPk(id);
  }
}

const tripService = new TripService();
export default tripService;
