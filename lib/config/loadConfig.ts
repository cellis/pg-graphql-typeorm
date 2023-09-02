import { resolve } from 'path';

// When we transpile to js,
// the require('./.ftlrc.ts') command would fail
// without this import
import 'typescript-require';

type ConfigFunction = () => Promise<Superluminal.Config>;
export default async (): Promise<Superluminal.Config> => {
  let configFunction: ConfigFunction | undefined = undefined;
  let config: Superluminal.Config = {};
  const cwd = process.cwd();
  try {
    // eslint-disable-next-line
    configFunction = require(resolve(cwd, '.ftlrc.ts')).default;
    if (configFunction) {
      return await configFunction();
    }
  } catch (error) {}

  if (!configFunction) {
    try {
      configFunction = require(resolve(cwd, '.ftlrc.js'));
    } catch (err) {}
  }

  if (configFunction) {
    config = await configFunction();
  }

  return config;
};
