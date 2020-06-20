import type Koa from 'koa';
import * as e from 'erroar';

export type ErroarToHttpCodeMap = { [key: string]: number | undefined };

const DEFAULT_ERROAR_TO_HTTP_CODE_MAP: ErroarToHttpCodeMap = {
  'EINVALID': 400,
  'EACCESS': 403,
  'ENOTFOUND': 404,
  'EINTERNAL': 500,
};

export interface ErroarOptions {
  httpCodeMap?: ErroarToHttpCodeMap;
}

export function erroar(options?: ErroarOptions): Koa.Middleware {
  const httpCodeMap = {
    ...DEFAULT_ERROAR_TO_HTTP_CODE_MAP,
    ...options?.httpCodeMap,
  };
  
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const error = (e.isErroar(err) && err.expose) ? err : e.internal();
      
      ctx.response.status = httpCodeMap[error.code] || 500;
      ctx.response.body = { error };
    }
  };
}
