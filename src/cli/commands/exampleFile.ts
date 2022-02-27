import { Options } from 'yargs'
import { writeFileSync } from 'fs'

interface Arguments {
  format: string
}

export const command = 'example-file'
export const describe = 'Generate example import file'

export const builder: { [key: string]: Options } = {
  format: {
    nargs: 1,
    describe: 'Format of example import file',
    choices: ['csv'],
    default: 'csv',
  },
}

export const handler = (argv: Arguments) => {
  writeFileSync('example_import.csv', exampleCsv)
}

const exampleCsv = `Peak Name,Peak Mass,Monomer Name,Monomer Mass,Cation Name,Cation Mass,Endgroup Name,Endgroup Mass
Peak A,123,Monomer A,111,Cation A,25,Endgroup A,1
Peak B,234,,,Cation B,50,Endgroup B,2
,,,,,,Endgroup C,3`
