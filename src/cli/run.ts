import type { CliContext } from './types';
import type { GlobalArgs } from './global-args';
import { createLog } from '../log';

export type RunFn = (ctx: CliContext) => Promise<void>;

export function run(args: GlobalArgs, fn: RunFn): void {
  const log = createLog({
    level: args.logLevel,
    format: args.logFormat,
  });
  
  const ctx: CliContext = {
    log,
  };
  
  fn(ctx).catch(err => {
    log.error({ err }, err.message);
    
    process.exitCode = 1;
  });
}
