import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.info(`Incoming Request: ${req.method} ${req.url} from ${req.ip}`);
  res.on('finish', () => {
    logger.info(`Response: ${res.statusCode} for ${req.method} ${req.url}`);
  });
  next();
};

export default requestLogger;
