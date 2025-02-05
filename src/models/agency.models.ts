import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';
import { OWNER_PROF } from '../helpers/constant';
import { ICreateOwner, IOwner } from '../types/agency.interface';
import User from './auth.models';

class Agency extends Model<ICreateOwner> implements IOwner {
  public id!: string;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public owner_id_prof!: string;
  public document_number!: string;
  public document_image!: string;
  public business_license_image!: string;
  public business_license_number!: string;
  public country_code!: string;
  public mobile_number!: string;
  public strip_account_id!: string;
  public user_id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Agency.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id_prof: {
      type: DataTypes.ENUM,
      values: Object.values(OWNER_PROF),
      allowNull: true,
    },
    document_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    document_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    business_license_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    business_license_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    strip_account_id: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: 'agency',
    timestamps: true,
    indexes: [
      {
        fields: ['email'],
        unique: true,
      },
    ],
    hooks: {
      beforeCreate: async (agency) => {
        agency.id = uuidv4();
      },
    },
  }
);

Agency.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Agency, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default Agency;
