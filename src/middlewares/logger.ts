import winston from 'winston';
import expressWinston from 'express-winston';

import 'winston-daily-rotate-file';

const transport = new winston.transports.DailyRotateFile({
  // указываем формат имени файла
  filename: 'error-%DATE%.log',
  // указываем шаблон для даты
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
});

export const requestLogger = expressWinston.logger({
  transports: [
    transport,
    new winston.transports.File({
      filename: 'request.log',
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    transport,
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});
