import { Options } from 'yargs'
import { writeFileSync } from 'fs'
import { Input } from '../../maldi/types'

interface Arguments {
  format: string
}

export const command = 'example-file [format]'
export const describe = 'Generate example import file'

export const builder: { [key: string]: Options } = {
  format: {
    nargs: 1,
    demandOption: true,
    describe: 'Format of example import file',
    choices: ['csv', 'json'],
  },
}

export const handler = (argv: Arguments) => {
  switch (argv.format) {
    case 'csv':
      writeFileSync('example_import.csv', exampleCsv)
      break
    case 'json':
      writeFileSync('example_import.json', JSON.stringify(exampleJson, null, 2))
      break
    default:
      throw Error(`Unsupported file type: ${argv.format}`)
  }
}

const exampleCsv = `Peak Name,Peak Mass,Monomer Name,Monomer Mass,Cation Name,Cation Mass,Endgroup Name,Endgroup Mass
Peak A,123,Monomer A,111,Cation A,25,Endgroup A,1
Peak B,234,,,Cation B,50,Endgroup B,2
,,,,,,Endgroup C,3`

const exampleJson: Input = {
  peaks: [
    { name: 'Peak A', mass: 123 },
    { name: 'Peak B', mass: 321 },
  ],
  monomers: [{ name: 'Monomer A', mass: 111 }],
  cations: [
    { name: 'Cation A', mass: 25 },
    { name: 'Cation B', mass: 50 },
  ],
  endGroups: [
    { name: 'Endgroup A', mass: 1 },
    { name: 'Endgroup B', mass: 2 },
    { name: 'Endgroup B', mass: 3 },
  ],
}
