import User from '../models/auth.models';
import Driver from '../models/driver.models';
import Cars from '../models/car.models';
import ZipCodes from '../models/zipcode.models';
import { ICreateZipCode, IZipCode } from '../types/zipcode.interface';

class CommonServices {
  async updateAgencyStatus(
    id: string,
    payload: any
  ): Promise<[affectedCount: number]> {
    return await User.update(payload, { where: { id: id } });
  }

  async updateAgencyDriverStatus(
    id: string,
    payload: any
  ): Promise<[affectedCount: number]> {
    return await Driver.update(payload, { where: { id: id } });
  }

  async updateAgencyCarStatus(
    id: string,
    payload: any
  ): Promise<[affectedCount: number]> {
    return await Cars.update(payload, { where: { id: id } });
  }

  async createZipCode(payload: ICreateZipCode): Promise<IZipCode> {
    return await ZipCodes.create(payload);
  }

  async deleteZipCode(id: string): Promise<number> {
    return await ZipCodes.destroy({ where: { id } });
  }

  async updateZipCode(
    id: string,
    payload: ICreateZipCode
  ): Promise<[affectedCount: number]> {
    return await ZipCodes.update(payload, { where: { id } });
  }

  async findAllZipCode(): Promise<IZipCode[] | null> {
    return await ZipCodes.findAll();
  }

  async findById(id: string): Promise<IZipCode | null> {
    return await ZipCodes.findByPk(id);
  }

  async findziptype(pickup_zipCode: string, destination_zipCode: string) {
    const pickupZipInfo = await ZipCodes.findOne({
      where: { zipcode: pickup_zipCode },
    });

    const destinationZipInfo = await ZipCodes.findOne({
      where: { zipcode: destination_zipCode },
    });

    return {
      pickupZipType: pickupZipInfo ? pickupZipInfo.type : null,
      destinationZipType: destinationZipInfo ? destinationZipInfo.type : null,
    };
  }
}

const commonServices = new CommonServices();
export default commonServices;
