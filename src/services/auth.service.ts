import { FindOptions, Op, WhereOptions } from 'sequelize';
import User from '../models/auth.models';
import {
  ICreateUser,
  IUser,
  IUserResponse,
  ValidateOtpPayload,
} from '../types/user.interface';
import { IPagination, IResponseAndCount } from '../types/common.interface';
import { USER_STATUS } from '../helpers/constant';

class UserService {
  async create(payload: ICreateUser): Promise<IUser> {
    const user = await User.create(payload);
    return user;
  }

  async findOneWithPassword(email: string): Promise<IUser | null> {
    const filter: FindOptions = {
      where: {
        email,
        password: {
          [Op.ne]: null,
        },
      },
      raw: true,
    };
    return await User.findOne(filter);
  }

  async findOne(data: FindOptions<ICreateUser>): Promise<IUserResponse | null> {
    const user = await User.findOne(data);
    if (!user) return user;
    const { password, ...userWithoutPassword } = user; // Omit password
    return userWithoutPassword;
  }

  async findAll(pagination: IPagination): Promise<IResponseAndCount<IUser[]>> {
    let where: WhereOptions<ICreateUser> = {};

    if (pagination.Search) {
      where = {
        ...where,
        [Op.or]: [
          { first_name: { [Op.like]: `%${pagination.Search}%` } },
          { last_name: { [Op.like]: `%${pagination.Search}%` } },
          { email: { [Op.like]: `%${pagination.Search}%` } },
          { mobile_number: { [Op.like]: `%${pagination.Search}%` } },
        ],
      };
    }

    // if (pagination.role) {
    //   where = {
    //     ...where,
    //     role: pagination.role,
    //   };
    // }

    if (pagination.Status) {
      where = {
        ...where,
        status: pagination.Status,
      };
    }

    const filter: FindOptions<ICreateUser> = {
      where,
      attributes: { exclude: ['password', 'otp', 'otp_expire_time'] },
      // include: [
      //   {
      //     model: Agency,
      //     as: 'agency',
      //     attributes:[{'document_image'}]
      //   },
      // ],
      limit: pagination.Limit || 10,
      offset: (pagination.Page - 1) * pagination.Limit || 0,
      order: [['createdAt', 'DESC']],
      raw: true,
    };
    return await User.findAndCountAll(filter);
  }

  async findOneByEmail(email: string): Promise<ICreateUser | null> {
    const filter: FindOptions<IUserResponse> = {
      where: {
        email,
      },
      raw: true,
    };
    return await User.findOne(filter);
  }

  async delete(userId: string): Promise<number> {
    return await User.destroy({ where: { id: userId } });
  }

  async update(
    id: string,
    payload: Partial<ICreateUser>
  ): Promise<[affectedCount: number]> {
    return await User.update(payload, { where: { id } });
  }

  async updateViaEmail(
    email: string,
    payload: Partial<ICreateUser>
  ): Promise<[affectedCount: number]> {
    return await User.update(payload, { where: { email } });
  }

  async findOneWithDeleted(payload: Partial<ICreateUser>) {
    return await User.findOne({
      where: {
        ...payload,
      },
      paranoid: false,
    });
  }

  async updatePassword(
    id: string,
    payload: Partial<ICreateUser>
  ): Promise<void> {
    await User.update(payload, {
      where: {
        id,
      },
    });
    return;
  }

  async getById(
    id: string,
    status = USER_STATUS.ACTIVE
  ): Promise<ICreateUser | null> {
    let where: WhereOptions<ICreateUser> = {
      id: id,
    };
    if (status === USER_STATUS.ACTIVE) {
      where = {
        ...where,
        status: USER_STATUS.ACTIVE,
      };
    }

    return User.findOne({
      where,
      attributes: [
        'id',
        'role',
        'first_name',
        'last_name',
        'email',
        'mobile_number',
        'profile_image',
      ],
    });
  }

  async changePassword(
    email: string,
    payload: { password: string }
  ): Promise<void> {
    await User.update(payload, {
      where: { email: email },
      returning: true,
    });
    return;
  }

  async checkopt(payload: ValidateOtpPayload): Promise<boolean | null> {
    const { userOtp, userOtpExpireTime, providedOtp } = payload;
    if (userOtp !== providedOtp) {
      return false;
    }
    if (!userOtpExpireTime || new Date() > new Date(userOtpExpireTime)) {
      return false;
    }
    return true;
  }
}

const userService = new UserService();

export default userService;
