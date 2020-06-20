import * as e from 'erroar';

export * from 'erroar';

export const gateway = e.createFactory('EBADGATEWAY', 'bad gateway', true);

export const gatewayTimeout = e.createFactory('EGATEWAYTIMEOUT', 'gateway timeout', true);
