import { Hurp } from 'hurp';
import type { Log } from 'hurp-types';
import HttpServer from 'hurp-http-server';
import type { Config } from '../config';
import * as web from '../web';

export interface AppOptions {
  log: Log;
  config: Config;
  httpServer: {
    listen: {
      host: string;
      port: number;
    };
  };
}

export class App extends Hurp {
  public constructor(options: AppOptions) {
    super();
    
    const {
      log,
      config,
    } = options;
    
    const httpServer = new HttpServer({
      log,
      handler: web.bootstrap({
        log,
        config,
      }),
      listen: options.httpServer.listen,
    });
    
    this.use(httpServer);
  }
}
