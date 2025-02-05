import { FindOptions } from 'sequelize';
import Bank from '../models/bank.models';
import { IBank, ICreateBank } from '../types/bank.interface';
import banklist from '../models/banklist.models';
import BankList from '../models/banklist.models';
import { Attribute } from '@angular/core';

class BankService {
  async create(payload: ICreateBank): Promise<IBank> {
    const banklist = await Bank.create(payload);
    return banklist;
  }

  async getall(): Promise<IBank[]> {
    const filter: FindOptions = {
      include: [
        {
          model: banklist,
          as: 'bankList',
          attributes: ['name'],
        },
      ],
    };

    const bankList = await Bank.findAll(filter); // Fetch data from the database
    return bankList;
  }

  async getbyid(id: string): Promise<ICreateBank | null> {
    const data = await Bank.findOne({
      where: { id: id },
      include: [{ model: banklist, as: 'bankList', attributes: ['name'] }],
    });
    return data;
  }
}

const bankService = new BankService();

export default bankService;
