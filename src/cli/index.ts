#!/usr/bin/env node

import { importer } from '../csv/importer'
import { generateMaldiResults } from '../maldi'
import yargs from 'yargs'
import { exporter } from '../csv/exporter'

const argv = yargs
  .usage('Usage: $0 <command> [options]')
  .commandDir('commands')
  .demandCommand()
  .help('h')
  .example('$0 example-file', 'Generate an example csv file')
  .example('$0 analyse input.csv -t 10 -o test-result', 'Run analysis on file')
  .alias('help', 'help').argv
