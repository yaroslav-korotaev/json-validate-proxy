import pino from 'pino';
import type { LogLevel, LogFormat, Log } from './types';

export interface CreateLogOptions {
  level: LogLevel;
  format: LogFormat;
}

export function createLog(options: CreateLogOptions): Log {
  const pinoOptions: pino.LoggerOptions = {
    level: options.level,
    base: null,
  };
  
  if (options.format == 'human') {
    pinoOptions.prettyPrint = {
      translateTime: 'yyyy-mm-dd HH:MM:ss.l',
    };
  } else {
    pinoOptions.formatters = {
      level: (label: string, number: number) => {
        return {
          level: label,
        };
      },
    };
    pinoOptions.timestamp = pino.stdTimeFunctions.isoTime;
  }
  
  const log = pino(pinoOptions, process.stdout);
  
  return log;
}
