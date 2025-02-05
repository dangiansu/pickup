import { response, Response } from 'express';
import { IResponse } from '../types/response.interface';
import { statusCode } from '../config/statuscode';

export const success = (
  res: Response,
  status_code = statusCode.SUCCESS,
  data: object | object[] | null = null,
  message: string
) => {
  if (data !== null) {
    const resData = {
      message: message,
      statusCode: status_code,
      data,
    };
    return res.status(status_code).json(resData);
  } else {
    const resData = {
      message: message,
      statusCode: status_code,
    };
    return res.status(status_code).json(resData);
  }
};

export const badRequest = (
  res: Response,
  status_code = statusCode.BAD_REQUEST,
  message: string
) => {
  const resData = {
    message: message,
    statusCode: status_code,
  };
  return res.status(status_code).json(resData);
};

export function errorResponse(
  message: string,
  statusCode: number,
  data: any = null
): IResponse {
  return {
    success: false,
    message,
    statusCode: statusCode,
    data,
  };
}

export const notFoundResponse = (
  res: Response,
  status_code = statusCode.NOTFOUND,
  message: string
) => {
  const resData = {
    message: message,
    statusCode: status_code,
  };
  return res.status(status_code).json(resData);
};

export const internalServer = (
  res: Response,
  reqBody = {},
  message: string,
  status_code = statusCode.INTERNAL_SERVER_ERROR
) => {
  const resData = {
    message: message,
    statusCode: status_code,
    reqBody,
  };
  return res.status(status_code).json(resData);
};

export const unAuthorized = (
  res: Response,
  message: string = 'Unauthorized access',
  status_code: number = statusCode.UNAUTHORIZED
) => {
  const resData = {
    success: false,
    message: message,
    statusCode: status_code,
  };
  return res.status(status_code).json(resData);
};
