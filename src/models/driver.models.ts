import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';
import { IDriver, ICreateDriver } from '../types/driver.interface';
import User from './auth.models';
import Agency from './agency.models';

class Driver extends Model<ICreateDriver> implements IDriver {
  public id!: string;
  public driving_license!: string;
  public driving_license_image!: string;
  public id_number!: string;
  public id_number_image!: string;
  public criminal_number!: string;
  public criminal_record_image!: string;
  public user_id!: string;
  public agency_id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Driver.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    driving_license: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driving_license_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_number_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    criminal_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    criminal_record_image: {
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

    agency_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Agency,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'drivers',
    timestamps: true,
    hooks: {
      beforeCreate: async (driver) => {
        driver.id = uuidv4();
      },
    },
  }
);

Driver.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Driver, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Driver.belongsTo(Agency, { foreignKey: 'agency_id', onDelete: 'CASCADE' });
Agency.hasMany(Driver, { foreignKey: 'agency_id', onDelete: 'CASCADE' });

export default Driver;
