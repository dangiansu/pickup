export interface IBank {
  id: string;
  account_type: string;
  account_number: string;
  account_holder_name: string;
  routing_number: string;
  bank_list_id: string;
  agency_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateBank {
  id?: string;
  account_type: string;
  account_number: string;
  account_holder_name: string;
  routing_number: string;
  bank_list_id: string;
  agency_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
