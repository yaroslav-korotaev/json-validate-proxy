import stream from 'stream';
import _ from 'lodash';
import compose from 'koa-compose';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import Ajv from 'ajv';
import got, * as Got from 'got';
import type { Log } from 'hurp-types';
import type { Config } from '../config';
import type { Middleware } from './types';
import * as e from './errors';

const FILTER_REQUEST_HEADERS = ['host', 'content-length', 'x-forward-for'];

interface CreateProxyOptions {
  log: Log;
  config: Config;
}

export function createProxy(options: CreateProxyOptions): Middleware {
  const {
    log,
    config,
  } = options;
  
  const router = new Router();
  const ajv = new Ajv();
  
  ajv.addSchema(config.schemas);
  
  for (const route of config.routes) {
    const proxyTimeout = _.defaultTo(route.proxy.timeout, 5000);
    
    router.post(route.route, async (ctx, next) => {
      const valid = ajv.validate(route.schema, ctx.request.body);
      
      if (!valid) {
        throw e.invalid({ what: 'request', payload: { errors: ajv.errors } });
      }
      
      const filteredRequestHeaders = _.omit(ctx.request.headers, FILTER_REQUEST_HEADERS);
      
      try {
        const proxyRes = await got(route.proxy.url, {
          method: ctx.request.method as Got.Method,
          headers: {
            ...filteredRequestHeaders,
            'x-forward-for': ctx.request.ip,
          },
          body: ctx.request.rawBody,
          responseType: 'buffer',
          timeout: proxyTimeout,
          retry: 0,
          followRedirect: false,
          throwHttpErrors: false,
        });
        
        ctx.response.status = proxyRes.statusCode;
        ctx.response.set(proxyRes.headers as { [key: string]: string });
        ctx.response.body = proxyRes.body;
      } catch (err) {
        if (err instanceof Got.TimeoutError) {
          throw e.gatewayTimeout({ err });
        }
        
        throw e.gateway({ err });
      }
    });
  }
  
  return compose([
    bodyParser({
      enableTypes: ['json'],
      jsonLimit: '10mb',
    }),
    router.routes(),
    router.allowedMethods(),
  ]);
}
