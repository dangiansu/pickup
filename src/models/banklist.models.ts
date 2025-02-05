import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';
import { IBanklist, ICreateBanklist } from 'types/banklist.interface';

class BankList extends Model<ICreateBanklist> implements IBanklist {
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BankList.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'bankList',
    timestamps: true,

    hooks: {
      beforeCreate: async (bank) => {
        bank.id = uuidv4();
      },
    },
  }
);

export default BankList;
