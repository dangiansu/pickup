import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';
import { IBank, ICreateBank } from '../types/bank.interface';
import BankList from './banklist.models';
import User from './auth.models';
import Agency from './agency.models';

class Bank extends Model<ICreateBank> implements IBank {
  public id!: string;
  public account_type!: string;
  public account_number!: string;
  public account_holder_name!: string;
  public routing_number!: string;
  public bank_list_id!: string;
  public agency_id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bank.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    account_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    account_holder_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    routing_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bank_list_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: BankList,
        key: 'id',
      },
    },
    agency_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Agency,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'banks',
    timestamps: true,
    // paranoid: true,
    hooks: {
      beforeCreate: async (banks) => {
        banks.id = uuidv4();
      },
    },
  }
);
Bank.belongsTo(Agency, { foreignKey: 'agency_id', onDelete: 'CASCADE' });
Agency.hasOne(Bank, { foreignKey: 'agency_id', onDelete: 'CASCADE' });
Bank.belongsTo(BankList, { foreignKey: 'bank_list_id', onDelete: 'CASCADE' });
BankList.hasMany(Bank, { foreignKey: 'bank_list_id', onDelete: 'CASCADE' });

export default Bank;
