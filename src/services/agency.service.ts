import { ICreateOwner, IOwner } from '../types/agency.interface';
import Agency from '../models/agency.models';
import User from '../models/auth.models';
import { FindOptions } from 'sequelize';

class AgencyService {
  async create(payload: ICreateOwner): Promise<IOwner> {
    const agency = await Agency.create(payload);
    return agency;
  }

  async getall(): Promise<IOwner[]> {
    const filter: FindOptions = {
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      ],
    };
    const agencydata = await Agency.findAll(filter);
    return agencydata;
  }

  async getbyid(id: string): Promise<IOwner | null> {
    const data = await Agency.findByPk(id);
    return data;
  }
  async getbyuserid(user_id: string): Promise<IOwner | null> {
    const data = await Agency.findOne({ where: { user_id: user_id } });
    return data;
  }

  async update(
    id: string,
    payload: ICreateOwner
  ): Promise<[affectedCount: number]> {
    return await Agency.update(payload, { where: { user_id: id } });
  }
}

const agencyService = new AgencyService();

export default agencyService;
