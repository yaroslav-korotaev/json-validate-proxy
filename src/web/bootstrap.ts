import type { RequestListener } from 'http';
import Koa from 'koa';
import mount from 'koa-mount';
import type { Log } from 'hurp-types';
import type { Config } from '../config';
import { erroar } from './middlewares/erroar';
import { logger } from './middlewares/logger';
import { createProxy } from './proxy';

export interface BootstrapOptions {
  log: Log;
  config: Config;
}

export function bootstrap(options: BootstrapOptions): RequestListener {
  const {
    log,
    config,
  } = options;
  
  const koa = new Koa();
  koa.proxy = true;
  koa.on('error', err => {
    log.error({ err }, 'request handling error');
  });
  
  koa.use(erroar({
    httpCodeMap: {
      'EBADGATEWAY': 502,
      'EGATEWAYTIMEOUT': 504,
    },
  }));
  
  koa.use(logger({ log }));
  
  koa.use(mount('/proxy', createProxy({
    log,
    config,
  })));
  
  return koa.callback();
}
