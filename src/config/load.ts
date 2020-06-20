import fs from 'fs-extra';
import * as YAML from 'yaml';
import type { Config } from './types';

export async function load(filepath: string): Promise<Config> {
  const content = await fs.readFile(filepath, { encoding: 'utf8' });
  const object = YAML.parse(content);
  
  return object;
}
