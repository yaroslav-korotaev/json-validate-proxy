import type pino from 'pino';

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export type LogFormat = 'human' | 'json';

export type Log = pino.Logger;

