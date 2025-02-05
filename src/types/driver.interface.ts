export interface IDriver {
  id: string;
  driving_license: string;
  driving_license_image: string;
  id_number: string;
  id_number_image: string;
  criminal_number: string;
  criminal_record_image: string;
  user_id: string;
  agency_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateDriver {
  id?: string;
  driving_license: string;
  driving_license_image: string;
  id_number: string;
  id_number_image: string;
  criminal_number: string;
  criminal_record_image: string;
  user_id: string;
  agency_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
