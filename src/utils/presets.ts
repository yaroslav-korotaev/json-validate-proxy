import type yargs from 'yargs';
import type { LogLevel, LogFormat } from '../log';

export type OptionsPreset = { [key: string]: yargs.Options };

export type LogArgs = {
  logLevel: LogLevel;
  logFormat: LogFormat;
};

export const log: OptionsPreset = {
  'log-level': {
    type: 'string',
    default: 'info',
    describe: 'Log level (silent, fatal, error, warn, info, debug, trace)',
  },
  'log-format': {
    type: 'string',
    default: 'human',
    describe: 'Log format (human, json)',
  },
};
