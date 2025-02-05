import { FindOptions } from 'sequelize';
import Banklist from '../models/banklist.models';
import { IBanklist, ICreateBanklist } from '../types/banklist.interface';

class BanklistService {
  async create(payload: ICreateBanklist): Promise<IBanklist> {
    const banklist = await Banklist.create(payload);
    return banklist;
  }

  async findOne(data: FindOptions<ICreateBanklist>): Promise<IBanklist | null> {
    const banklist = await Banklist.findOne(data);
    return banklist;
  }

  async findall(): Promise<IBanklist[] | null> {
    const banklist = await Banklist.findAll();
    return banklist;
  }

  async delete(banklistid: string): Promise<number> {
    const data = await Banklist.destroy({ where: { id: banklistid } });
    return data;
  }

  async update(
    id: string,
    payload: Partial<ICreateBanklist>
  ): Promise<[affectedCount: number]> {
    const banklist = await Banklist.update(payload, { where: { id } });
    return banklist;
  }
}

const banklistService = new BanklistService();

export default banklistService;
