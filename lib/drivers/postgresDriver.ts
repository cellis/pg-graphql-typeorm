import { Client, ClientConfig } from 'pg';

export default (config: ClientConfig) => {
  return new Client(config);
};
