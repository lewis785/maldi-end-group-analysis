import { readFileSync } from 'fs'
import { Options } from 'yargs'
import { exportToFile } from '../../csv/exporter'
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
  format: {
    nargs: 1,
    describe: 'Format of file that should be outputted',
    choices: ['csv'],
    default: 'csv',
    type: 'string',
  },
}

export const handler = (argv: Arguments) => {
  try {
    const maldiInput = parseMaldiInput(argv.file)
    const results = generateMaldiResults(maldiInput, argv.threshold)
    exporter(argv.output, maldiInput, results)

    console.log(`Output - Total Results: ${results.length}`)
  } catch (e) {
    console.log(`Error occurred: ${(e as Error).message}`)
  }
}

const parseMaldiInput = (filePath: string) => {
  const fileExtension = filePath.split('.').pop()

  switch (fileExtension) {
    case 'csv':
      return importer(filePath)
    case 'json':
      return parseInputJson(filePath)
    default:
      throw Error(`Unsupported file type .${fileExtension}`)
  }
}

const parseInputJson = (filePath: string) => {
  const input = JSON.parse(readFileSync(filePath, 'utf8'))

  const fields = ['peaks', 'monomers', 'cations', 'endGroups']

  fields.forEach((field) => {
    if (!(field in input)) {
      throw Error(`Input json does not contain property: ${field}`)
    }
  })

  return input
}
