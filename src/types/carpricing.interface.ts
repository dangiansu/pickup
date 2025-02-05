export interface IPricing {
  id: string;
  car_type: string;
  childe?: number;
  adulte?: number;
  bags?: number;
  distance_km: number;
  total_price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreatePricing {
  id?: string;
  car_type: string;
  distance_km?: number;
  total_price?: number;
  childe?: number;
  adulte?: number;
  bags?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IKmPricing {
  car_type: string;
  distance_km: number;
}

export interface IFixedPricing {
  car_type: string;
  total_price: number;
}

export interface ISeating {
  car_type: string;
  childe: number;
  adulte: number;
  bags: number;
}
