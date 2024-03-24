import { IEnvironment } from './environment.interface';

const apiHost = 'localhost:3300';
const apiUrl = `http://${apiHost}/api/v1`;

export const environment: IEnvironment = {
  production: false,
  enableDebugTools: true,
  logLevel: 'debug',
  apiHost,
  apiUrl,
  tokenStorageKey: 'access_token',
};
