import exp from 'constants';

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  AGENCY: 'agency',
  AGENCY_DRIVER: 'agency_driver',
  INDIVIDUAL_DRIVER: 'individual_driver',
  USER: 'user',
};
export const ROLES_ARRAY = [
  ROLES.SUPER_ADMIN,
  ROLES.AGENCY,
  ROLES.AGENCY_DRIVER,
  ROLES.INDIVIDUAL_DRIVER,
  ROLES.USER,
];
export const USER_STATUS = {
  ACTIVE: 'Active',
  Block: 'Blocked',
  PENDING: 'Pending',
  REJECTED: 'Rejected',
  ALL: 'All',
};

export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PAID: 'paid',
};

export const BOOKING_TYPES = {
  ONWARD: 'On Way Trip',
  RETURN: 'Round Trip',
};

export const CARS_STATUS = {
  ACTIVE: 'Active',
  Block: 'Blocked',
  PENDING: 'Pending',
  INACTIVE: 'Inactive',
};
export const OWNER_PROF = {
  PASSWORD: 'password',
  ADHAR_CARD: 'adhar_card',
};
export const LANGUAGE_CODE = {
  EN: 'en',
  IT: 'it',
};
export const EVENT_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  PUBLISHED: 'published',
  REJECTED: 'rejected',
};
export const EVENT_MEDIA_TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
} as const;

export const NEWS_STATUS = {
  PUBLISHED: 'published',
  PENDING: 'pending',
  REJECTED: 'rejected',
  DRAFT: 'draft',
} as const;

export const Type = {
  AGENCY: 'agency',
  DRIVER: 'driver',
  CAR: 'car',
};

export const CarType = {
  REGULARCAR: 'Regula Car',
  REGULARMINIVAN: 'Regular Minivan',
  BUSINESSCAR: 'Business Car',
  BUSINESSMINIVAN: 'Business Minivan',
};

export const ZipCode = {
  CITYCENTER: 'city_center',
  AIRPORTBUSTRAIN: 'airport_bus_train',
};

export type EventStatus = keyof typeof NEWS_STATUS;
