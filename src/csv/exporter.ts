import { Monomer } from './../maldi/types'
import { Input, Result } from '../maldi/types'

export const exporter = (input: Input, results: Result[]) => {
  const columnCount = getColumnCount(input)
  let output = [...generateHeader(input, columnCount)]

  console.log(output.map((row) => row.join(',')).join('\n'))

  return output.map((row) => row.join(',')).join('\n')
}

const generateHeader = (input: Input, columnCount: number): string[][] => {
  const initialColumns = ['Peak Name', 'Peak Mass', 'Actual Mass', 'Difference']
  const header = []

  return [
    generateTitleRow(input),
    generateNameRow(input),
    generateMassRow(input),
    [...initialColumns, ...Array(columnCount - initialColumns.length)],
  ]
}

const generateTitleRow = ({ monomers, cations, endgroups }: Input) => {
  return [
    ...Array(5),
    'Monomer',
    ...Array(monomers.length),
    'Cations',
    ...Array(cations.length),
    'Endgroup',
    ...Array(endgroups.length - 1),
  ]
}

const generateNameRow = ({ monomers, cations, endgroups }: Input) => {
  return [
    ...Array(5),
    ...monomers.map((monomer) => monomer.name),
    ,
    ...cations.map((cation) => cation.name),
    ,
    ...endgroups.map((endgroup) => endgroup.name),
  ]
}

const generateMassRow = ({ monomers, cations, endgroups }: Input) => {
  return [
    ...Array(5),
    ...monomers.map((monomer) => monomer.mass),
    ,
    ...cations.map((cation) => cation.mass),
    ,
    ...endgroups.map((endgroup) => endgroup.mass),
  ]
}

const getColumnCount = ({ monomers, cations, endgroups }: Input): number => {
  let columnCount = 5
  columnCount += monomers.length > 0 ? monomers.length + 1 : 2
  columnCount += cations.length > 0 ? cations.length + 1 : 2
  columnCount += endgroups.length > 0 ? endgroups.length + 1 : 2

  return columnCount
}
