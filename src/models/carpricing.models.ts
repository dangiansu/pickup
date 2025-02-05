import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';
import { IPricing, ICreatePricing } from '../types/carpricing.interface';
import { CarType } from '../helpers/constant';

class CarPricing extends Model<ICreatePricing> implements IPricing {
  public id!: string;
  public readonly car_type!: string;
  public distance_km!: number;
  public total_price!: number;
  public childe!: number;
  public adulte!: number;
  public bags!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CarPricing.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    car_type: {
      type: DataTypes.ENUM,
      values: Object.values(CarType),
      allowNull: false,
    },
    distance_km: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 1,
      },
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 1,
      },
    },
    childe: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    adulte: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bags: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'CarPricing',
    tableName: 'car_pricings',
    timestamps: true,
    hooks: {
      beforeCreate: async (carPricing) => {
        carPricing.id = uuidv4();
      },
    },
  }
);

export default CarPricing;
