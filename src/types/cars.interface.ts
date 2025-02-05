export interface ICars {
  id: string;
  car_number: string;
  company_name: string;
  model_name: string;
  car_type: string;
  status: string;
  vehicle_register_image: string;
  vehicle_register_number: string;
  insurance_policy_image: string;
  insurance_policy_number: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCars {
  id?: string;
  car_number: string;
  company_name: string;
  model_name: string;
  car_type: string;
  status: string;
  vehicle_register_image: string;
  vehicle_register_number: string;
  insurance_policy_image: string;
  insurance_policy_number: string;
  createdAt?: Date;
  updatedAt?: Date;
  distinct?: boolean;
}
