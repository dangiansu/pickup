export interface ICreateOwner {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  country_code?: string;
  mobile_number?: string;
  owner_id_prof?: string;
  document_number?: string;
  document_image?: string;
  business_license_image?: string;
  business_license_number?: string;
  strip_account_id?: string;
  user_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOwner {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  country_code?: string;
  mobile_number?: string;
  owner_id_prof?: string;
  document_number?: string;
  document_image?: string;
  business_license_image?: string;
  business_license_number?: string;
  strip_account_id?: string;
  user_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
