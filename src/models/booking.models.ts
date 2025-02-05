import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';
import { ICreateTrip, ITrip } from '../types/booking.interface';
import User from './auth.models';
import {
  BOOKING_TYPES,
  PAYMENT_STATUS,
  USER_STATUS,
} from '../helpers/constant';

class Trip extends Model<ICreateTrip> implements ITrip {
  public id!: string;
  public pickup_location!: string;
  public pickup_lat_long!: JSON;
  public destination_location!: string;
  public destination_lat_long!: JSON;
  public total_amount!: number;
  public total_distance!: string;
  public pickup_date!: Date;
  public pickup_time!: Date;
  public childs!: number;
  public adults!: number;
  public bags!: number;
  public addition_notes!: string;
  public flight_number!: string;
  public terminal_number!: string;
  public booking_status!: string;
  public payment_status!: string;
  public booking_type!: string;
  public user_id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Trip.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    pickup_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pickup_lat_long: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    destination_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination_lat_long: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    total_distance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pickup_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pickup_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    booking_type: {
      type: DataTypes.ENUM,
      values: Object.values(BOOKING_TYPES),
      defaultValue: BOOKING_TYPES.ONWARD,
      allowNull: false,
    },
    booking_status: {
      type: DataTypes.ENUM,
      values: Object.values(USER_STATUS),
      defaultValue: USER_STATUS.PENDING,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM,
      values: Object.values(PAYMENT_STATUS),
      defaultValue: PAYMENT_STATUS.UNPAID,
      allowNull: false,
    },
    childs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    adults: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bags: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    addition_notes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flight_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    terminal_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Trip',
    tableName: 'trips',
    timestamps: true,
    hooks: {
      beforeCreate: async (trips) => {
        trips.id = uuidv4();
      },
    },
  }
);

Trip.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Trip, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default Trip;
