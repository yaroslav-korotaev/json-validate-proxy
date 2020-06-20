import type yargs from 'yargs';
import * as presets from '../utils/presets';
import { run } from '../utils/run';

export type StartArgs =
  & presets.LogArgs
  & {}
;

export const start: yargs.CommandModule = {
  command: 'start',
  aliases: ['*'],
  describe: 'Start server',
  builder: yargs => {
    return yargs
      .options(presets.log)
    ;
  },
  handler: raw => {
    const args = raw as any as StartArgs;
    
    run(args, async ctx => {
      ctx.log.info('hola, bitch');
    });
  },
};
