#!/usr/bin/env node

import 'source-map-support/register';
import yargs from 'yargs';
import { start } from '../commands/start';

yargs
  .command(start)
  .demandCommand()
  .help()
  .version()
  .strict(true)
  .wrap(Math.min(120, yargs.terminalWidth()))
  .parse()
;
