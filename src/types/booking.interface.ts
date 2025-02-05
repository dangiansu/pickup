export interface ITrip {
  id: string;
  pickup_location: string;
  pickup_lat_long: JSON;
  destination_location: string;
  destination_lat_long: JSON;
  pickup_date: Date;
  pickup_time: Date;
  total_distance: string;
  childs: number;
  adults: number;
  bags: number;
  total_amount: number;
  addition_notes?: string;
  flight_number: string;
  terminal_number: string;
  booking_status: string;
  payment_status: string;
  booking_type: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICreateTrip {
  id?: string;
  pickup_location: string;
  pickup_lat_long: JSON;
  destination_location: string;
  destination_lat_long: JSON;
  pickup_date: string;
  pickup_time: string;
  total_distance: string;
  childs: number;
  adults: number;
  bags: number;
  total_amount: number;
  addition_notes?: string;
  flight_number: string;
  booking_status: string;
  payment_status: string;
  booking_type: string;
  terminal_number: string;
  user_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
