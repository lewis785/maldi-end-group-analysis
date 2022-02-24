#!/usr/bin/env node

import { importer } from '../csv/importer'
import { generateMaldiResults } from '../maldi'
import yargs from 'yargs'
import { exporter } from '../csv/exporter'

const argv = yargs
  .usage('Usage: $0 [options]')
  .option('file', {
    alias: 'f',
    demandOption: true,
    nargs: 1,
    describe: 'Path to file being analysed',
    type: 'string',
  })
  .option('threshold', {
    alias: 't',
    demandOption: true,
    nargs: 1,
    default: 0,
    describe: 'Maximum allowed difference from peak',
    type: 'number',
  })
  .option('output', {
    alias: 'o',
    nargs: 1,
    describe: 'Output file name',
    default: 'maldi_end_group_analysis_result',
    type: 'string',
  })
  .help('h')
  .example('$0 -f input.csv -t 10 -o test-result', 'run analysis on given file')
  .alias('help', 'help').argv

const maldiInput = importer(argv.file)
const results = generateMaldiResults(maldiInput, argv.threshold)
exporter(argv.output, maldiInput, results)

console.log(`Output - Total Results: ${results.length}`)
