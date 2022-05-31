#!/usr/bin/env node

import yargs from 'yargs'

yargs
  .usage('Usage: $0 <command> [options]')
  .commandDir('commands')
  .demandCommand()
  .help()
  .example('$0 example-file csv', 'Generate an example csv file')
  .example('$0 analyse input.csv -t 10 -o test-result', 'Run analysis on file')
  .alias('help', 'help').argv
