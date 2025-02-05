export interface IZipCode {
  id: string;
  type: string;
  zipcode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateZipCode {
  id?: string;
  type: string;
  zipcode: string;
  createdAt?: Date;
  updatedAt?: Date;
}
