export interface ICarDriver {
  id: String;
  car_id: String;
  driver_id: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICarDriverCreate {
  id?: String;
  car_id: String;
  driver_id: String;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAsignDriver {
  car_id: String;
  driver_id: String[];
}
