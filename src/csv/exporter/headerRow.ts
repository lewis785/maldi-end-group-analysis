import { Input } from '../../maldi/types'

const initialColumns = ['Peak Name', 'Peak Mass', 'Actual Mass', 'Difference']

export const generateHeader = (input: Input): string[][] => {
  const initialBuffer = initialColumns.length + 1

  return [
    generateTitleRow(input, initialBuffer),
    generateNameRow(input, initialBuffer),
    generateMassRow(input, initialBuffer),
    [
      ...initialColumns,
      ...generateEmptyArray(getColumnCount(input) - initialColumns.length),
    ],
  ]
}

const generateTitleRow = (
  { monomers, cations, endGroups }: Input,
  initialBuffer: number
) => {
  return [
    ...generateEmptyArray(initialBuffer),
    'Monomer',
    ...generateEmptyArray(monomers.length),
    'Cation',
    ...generateEmptyArray(cations.length),
    'Endgroup',
    ...generateEmptyArray(endGroups.length - 1),
  ]
}

const generateNameRow = (
  { monomers, cations, endGroups }: Input,
  initialBuffer: number
) => {
  return [
    ...generateEmptyArray(initialBuffer),
    ...monomers.map(({ name }) => name),
    '',
    ...cations.map(({ name }) => name),
    '',
    ...endGroups.map(({ name }) => name),
  ]
}

const generateMassRow = (
  { monomers, cations, endGroups }: Input,
  initialBuffer: number
) => {
  return [
    ...generateEmptyArray(initialBuffer),
    ...monomers.map(({ mass }) => mass.toString()),
    '',
    ...cations.map(({ mass }) => mass.toString()),
    '',
    ...endGroups.map(({ mass }) => mass.toString()),
  ]
}

const generateEmptyArray = (length: number) => {
  return Array(length).fill('')
}

const getColumnCount = ({ monomers, cations, endGroups }: Input): number => {
  let columnCount = initialColumns.length + 1
  columnCount += monomers.length > 0 ? monomers.length + 1 : 2
  columnCount += cations.length > 0 ? cations.length + 1 : 2
  columnCount += endGroups.length > 0 ? endGroups.length : 1

  return columnCount
}
