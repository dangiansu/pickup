import {
  ICreatePricing,
  IFixedPricing,
  IKmPricing,
  IPricing,
  ISeating,
} from '../types/carpricing.interface';
import CarPricing from '../models/carpricing.models';

class CarPricingService {
  async upsertPricing(data: {
    km: IKmPricing[];
    fixed_priced: IFixedPricing[];
    seating_arangment: ISeating[];
  }) {
    const kmData = data.km || [];
    const fixedPriceData = data.fixed_priced || [];
    const seatingData = data.seating_arangment || [];
    if (kmData.length > 0) {
      for (const kmItem of kmData) {
        await CarPricing.upsert({
          car_type: kmItem.car_type,
          distance_km: kmItem.distance_km,
        });
      }
    }
    if (fixedPriceData.length > 0) {
      for (const priceItem of fixedPriceData) {
        await CarPricing.upsert({
          car_type: priceItem.car_type,
          total_price: priceItem.total_price,
        });
      }
    }
    if (seatingData.length > 0) {
      for (const setItem of seatingData) {
        await CarPricing.upsert({
          car_type: setItem.car_type,
          childe: setItem.childe,
          adulte: setItem.adulte,
          bags: setItem.bags,
        });
      }
    }
  }

  async getall(): Promise<IPricing[] | null> {
    return await CarPricing.findAll();
  }

  async getbyId(id: string): Promise<IPricing | null> {
    return await CarPricing.findOne({ where: { id } });
  }
  async priceCalculate(payload: any) {
    const data = await this.getbyId(payload.id);
  }
}

const carpricingService = new CarPricingService();
export default carpricingService;
