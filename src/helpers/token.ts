import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser, IUserTokenPayload } from '../types/user.interface';
import { CONFIG } from '../config/dotenv';
import { internalServer, unAuthorized } from './response';
import userService from '../services/auth.service';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Function to generate a JWT token
 * @param userPayload - The data to encode in the token (e.g., user information)
 * @returns The generated token
 */
export const generateToken = async (userPayload: IUser) => {
  const Secret = CONFIG.JWT_SECRET ?? 'your_secret_key';
  const user = {
    id: userPayload.id,
    first_name: userPayload.first_name,
    last_name: userPayload.last_name,
    email: userPayload.email,
    role: userPayload.role,
  };
  const token = jwt.sign({ user }, Secret, { expiresIn: '1h' });
  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, CONFIG.JWT_SECRET, {
    ignoreExpiration: false,
  }) as JwtPayload;
};

export const commonValidation = async (
  req: Request,
  res: Response,
  token: string
): Promise<IUserTokenPayload> => {
  const payload = verifyToken(token);
  const data: IUserTokenPayload = payload.user;
  return data;
};

export const AuthGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return unAuthorized(res, 'Authorization header is missing or invalid.');
    }

    const token = authorization.startsWith('Bearer ')
      ? authorization.slice(7, authorization.length)
      : authorization;
    const reqUser = await commonValidation(req, res, token);

    if (!reqUser) {
      return unAuthorized(res, 'Invalide token');
    }

    const user = await userService.findOne({
      where: { id: reqUser.id, email: reqUser.email },
    });

    if (!user) {
      return unAuthorized(res, 'User not found');
    }
    req.user = reqUser;
    next();
  } catch (error) {
    return internalServer(res, req.body, (error as Error).message);
  }
};

export const CheckRole = (requiredRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !requiredRole.includes(userRole)) {
      return unAuthorized(res, 'not access for this user:');
    }
    next();
  };
};
