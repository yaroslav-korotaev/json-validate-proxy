import type { CliContext } from '../types';
import type { LogArgs } from './presets';
import { exec } from './exec';

export type RunFn = (ctx: CliContext) => Promise<void>;

export function run(args: LogArgs, fn: RunFn): void {
  exec(args, async log => {
    const ctx: CliContext = {
      log,
    };
    
    await fn(ctx);
  });
}
