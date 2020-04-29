import winston from 'winston';
import {LEVEL, MESSAGE} from 'triple-beam';

export class LogFactory {
  public static createLogger(name = 'unknown') {
    return winston.createLogger({
      level: process.env.LOG_LEVEL,
      defaultMeta: {service: name},
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(info => `[${info.level}] [${info.service}]: ${info.message}`)
      ),
      transports: [
        new winston.transports.Console({
          log(info, callback) {
            setImmediate(() => this.emit('logged', info));
            if (this.stderrLevels[info[LEVEL]]) {
              console.error(info[MESSAGE]);
              if (callback) {
                callback();
              }
              return;
            }
            console.log(info[MESSAGE]);
            if (callback) {
              callback();
            }
          }
        })
      ]
    });
  }
}
