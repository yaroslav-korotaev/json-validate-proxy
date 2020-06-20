import type yargs from 'yargs';
import type { LogLevel, LogFormat } from '../log';

export type GlobalArgs = {
  logLevel: LogLevel;
  logFormat: LogFormat;
};

export const globalOptions: { [key: string]: yargs.Options } = {
  'log-level': {
    type: 'string',
    choices: ['silent', 'fatal', 'error', 'warn', 'info', 'debug', 'trace'],
    default: 'info',
    describe: 'Log level',
    global: true,
  },
  'log-format': {
    type: 'string',
    choices: ['human', 'json'],
    default: 'human',
    describe: 'Log format',
    global: true,
  },
};
