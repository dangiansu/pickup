import { Time } from '@googlemaps/google-maps-services-js';
import { Response } from 'express';

export interface IQueryPagination {
  offset: number;
  limit: number;
}

export interface IResponseData<T> {
  res: Response;
  statusCode: number;
  success: number;
  message?: string;
  languageCode?: string;
  data?: T;
  error?: string;
  pagination?: IPagination;
}
export interface IResponse<T> {
  res: Response;
  status_code?: number;
  code?: number;
  message?: string;
  languageCode?: string;
  data?: T;
  error?: string;
  pagination?: IPagination;
}
export type ResponseStatus = 'success' | 'error';
export interface ISocketResponseData<T> {
  status: ResponseStatus;
  message: string;
  timestamp: string;
  data?: T | null;
}

export interface IResponseAndCount<T> {
  rows: T;
  count: number;
}

export interface IMediaPath {
  logo: string;
  chat_icon: string;
  video_icon: string;
  audio_icon: string;
}
export interface IPagination {
  Limit: number;
  Page: number;
  total_data?: number;
  Search?: string;
  Pickup_Time?: Date;
  Payment_status?: string;
  Boking_Status?: string;
  Payment_Status?: string;
  Pickup_Date?: Date;
  Status?: boolean;
  Isvip?: boolean;
}
export interface IAllMediaFields {
  icon_image?: string;
  profile_image?: string;
}
