import type yargs from 'yargs';
import * as enw from 'enw';
import { launch } from 'hurp-launch';
import type { GlobalArgs } from '../global-args';
import { load } from '../../config';
import { App } from '../../app';
import { run } from '../run';

export type StartArgs =
  & GlobalArgs
  & {
    config: string;
  }
;

export const start: yargs.CommandModule = {
  command: 'start',
  aliases: ['*'],
  describe: 'Start server',
  builder: yargs => {
    return yargs
      .options({
        'config': {
          type: 'string',
          normalize: true,
          describe: 'Path to config file',
          demandOption: true,
        },
      })
    ;
  },
  handler: raw => {
    const args = raw as any as StartArgs;
    
    const getEnv = enw.scope('JSON_VALIDATE_PROXY', {
      httpServer: enw.scope('HTTP', {
        listen: enw.scope('LISTEN', {
          host: enw.host('HOST', '0.0.0.0', { require_tld: false }),
          port: enw.port('PORT', 3000),
        }),
      }),
    });
    
    const env = getEnv(process.env);
    
    run(args, async ctx => {
      const config = await load(args.config);
      
      launch(async () => {
        const app = new App({
          log: ctx.log,
          config,
          httpServer: env.httpServer,
        });
        
        return app;
      }, {
        log: ctx.log,
      });
    });
  },
};
