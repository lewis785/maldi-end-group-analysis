import { choices, Options } from 'yargs'
import { exporter } from '../../csv/exporter'
import { importer } from '../../csv/importer'
import { generateMaldiResults } from '../../maldi'

interface Arguments {
  file: string
  threshold: number
  output: string
}

export const command = 'analyse [file] [options]'

export const describe = 'Run maldi end group analysis'

export const builder: { [key: string]: Options } = {
  file: {
    alias: 'f',
    demandOption: true,
    nargs: 1,
    describe: 'Path to file being analysed',
    type: 'string',
  },
  threshold: {
    alias: 't',
    demandOption: true,
    nargs: 1,
    default: 0,
    describe: 'Maximum allowed difference from peak',
    type: 'number',
  },
  output: {
    alias: 'o',
    nargs: 1,
    describe: 'Output file name',
    default: 'maldi_end_group_analysis_result',
    type: 'string',
  },
  type: {
    nargs: 1,
    describe: 'Type of file that should be outputted',
    choices: ['csv'],
    default: 'csv',
    type: 'string',
  },
}

export const handler = (argv: Arguments) => {
  const maldiInput = importer(argv.file)
  const results = generateMaldiResults(maldiInput, argv.threshold)
  exporter(argv.output, maldiInput, results)

  console.log(`Output - Total Results: ${results.length}`)
}
