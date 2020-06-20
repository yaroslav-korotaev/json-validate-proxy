import type { LogArgs } from './presets';
import { Log, createLog } from '../log';

export type ExecFn = (log: Log) => Promise<void>;

export function exec(args: LogArgs, fn: ExecFn): void {
  const log = createLog({
    level: args.logLevel,
    format: args.logFormat,
  });
  
  fn(log).catch(err => {
    log.error({ err }, err.message);
    
    process.exitCode = 1;
  });
}
