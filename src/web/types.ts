import type Koa from 'koa';
import type Router from 'koa-router';

export interface State {
}

export interface Custom {
}

export type StateT =
  & State
;

export type CustomT =
  & Custom
  & Router.IRouterParamContext<State, Custom>
;

export type Middleware = Koa.Middleware<StateT, CustomT>;
