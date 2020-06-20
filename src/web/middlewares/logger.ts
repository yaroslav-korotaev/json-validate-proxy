import type Koa from 'koa';
import type { Log } from 'hurp-types';

export interface LoggerOptions {
  log: Log;
}

export function logger(options: LoggerOptions): Koa.Middleware {
  const {
    log,
  } = options;
  
  return async (ctx, next) => {
    log.trace({
      method: ctx.request.method,
      url: ctx.request.originalUrl,
    });
    
    try {
      await next();
    } catch (err) {
      log.error({
        method: ctx.request.method,
        url: ctx.request.originalUrl,
        err,
      });
      
      throw err;
    }
  };
}
