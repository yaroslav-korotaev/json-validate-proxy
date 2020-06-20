export interface Proxy {
  url: string;
  timeout?: number;
}

export interface Route {
  route: string;
  proxy: Proxy;
  schema: string;
}

export interface Config {
  schemas: object[];
  routes: Route[];
}
