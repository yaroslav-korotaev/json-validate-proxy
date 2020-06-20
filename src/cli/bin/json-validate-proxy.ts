#!/usr/bin/env node

import 'source-map-support/register';
import yargs from 'yargs';
import { globalOptions } from '../global-args';
import { start } from '../commands/start';

yargs
  .options(globalOptions)
  .command(start)
  .demandCommand()
  .help()
  .version()
  .strict(true)
  .wrap(Math.min(120, yargs.terminalWidth()))
  .parse()
;
