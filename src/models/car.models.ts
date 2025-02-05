import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';
import { CARS_STATUS } from '../helpers/constant';
import { ICreateCars, ICars } from '../types/cars.interface';

class Cars extends Model<ICreateCars> implements ICars {
  public id!: string;
  public car_number!: string;
  public company_name!: string;
  public model_name!: string;
  public car_type!: string;
  public status!: string;
  public vehicle_register_image!: string;
  public vehicle_register_number!: string;
  public insurance_policy_image!: string;
  public insurance_policy_number!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cars.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    car_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    car_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(CARS_STATUS),
      defaultValue: CARS_STATUS.PENDING,
      allowNull: false,
    },
    vehicle_register_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vehicle_register_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    insurance_policy_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    insurance_policy_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'cars',
    timestamps: true,
    // paranoid: true,
    hooks: {
      beforeCreate: async (cars) => {
        cars.id = uuidv4();
      },
    },
  }
);
export default Cars;
