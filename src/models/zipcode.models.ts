import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';
import { IZipCode, ICreateZipCode } from '../types/zipcode.interface';
import { ZipCode } from '../helpers/constant';

class ZipCodes extends Model<ICreateZipCode> implements IZipCode {
  public id!: string;
  public type!: string;
  public zipcode!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ZipCodes.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.values(ZipCode),
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ZipCode',
    tableName: 'zipcode',
    timestamps: true,
    hooks: {
      beforeCreate: async (zipcodes) => {
        zipcodes.id = uuidv4();
      },
    },
  }
);

export default ZipCodes;
