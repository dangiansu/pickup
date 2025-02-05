import { createLogger, format, transports } from 'winston';
import * as path from 'path';

const { combine, timestamp, printf, colorize, errors } = format;

// Define custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create the logger instance
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Capture stack trace for errors
    logFormat
  ),
  transports: [
    // Console transport for development
    new transports.Console({
      format: combine(colorize(), logFormat),
    }),
    // File transport for logs
    new transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error', // Log only errors to this file
    }),
    new transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
    }),
  ],
  // Handle uncaught exceptions
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '../../logs/exceptions.log'),
    }),
  ],
});

// If in production, disable console logs
if (process.env.NODE_ENV === 'production') {
  logger.remove(new transports.Console());
}

export default logger;
