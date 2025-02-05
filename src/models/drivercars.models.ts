import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';
import { ICarDriver, ICarDriverCreate } from '../types/cardrivere.interface';
import Driver from './driver.models';
import Cars from './car.models';

class DriverCars extends Model<ICarDriverCreate> implements ICarDriver {
  public id!: string;
  public car_id!: string;
  public driver_id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DriverCars.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    car_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Cars,
        key: 'id',
      },
    },
    driver_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Driver,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'DriverCars',
    tableName: 'drivercars',
    timestamps: true,
    hooks: {
      beforeCreate: async (drivercars) => {
        drivercars.id = uuidv4();
      },
    },
    indexes: [
      {
        unique: true,
        fields: ['car_id', 'driver_id'],
      },
    ],
  }
);

DriverCars.belongsTo(Driver, { foreignKey: 'driver_id', onDelete: 'CASCADE' });
Driver.hasMany(DriverCars, { foreignKey: 'driver_id', onDelete: 'CASCADE' });

DriverCars.belongsTo(Cars, { foreignKey: 'car_id', onDelete: 'CASCADE' });
Cars.hasMany(DriverCars, { foreignKey: 'car_id', onDelete: 'CASCADE' });

export default DriverCars;
