import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';
import { ROLES, ROLES_ARRAY, USER_STATUS } from '../helpers/constant';
import { ICreateUser, IUser } from '../types/user.interface';

class User extends Model<ICreateUser> implements IUser {
  public id!: string;
  public role!: string;
  public profile_image!: string;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public country_code!: string;
  public mobile_number!: string;
  public country!: string;
  public state!: string;
  public city!: string;
  public otp!: number | null;
  public otp_expire_time!: Date | null;
  public status!: string;
  public vip!: boolean;
  public payment_method_id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
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
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ROLES_ARRAY,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
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
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    otp_expire_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(USER_STATUS),
      defaultValue: USER_STATUS.PENDING,
      allowNull: false,
    },
    vip: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
    payment_method_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'users',
    timestamps: true,
    // paranoid: true,
    indexes: [
      {
        fields: ['email'],
        unique: true,
      },
    ],
    scopes: {
      withPassword: {
        attributes: undefined,
      },
    },
    hooks: {
      beforeCreate: async (user) => {
        user.id = uuidv4();
      },
    },
  }
);

export default User;
