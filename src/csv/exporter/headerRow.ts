import { Input } from 'maldi/types'

export const generateHeader = (
  input: Input,
  columnCount: number
): string[][] => {
  const initialColumns = ['Peak Name', 'Peak Mass', 'Actual Mass', 'Difference']
  const initialBuffer = initialColumns.length + 1

  return [
    generateTitleRow(input, initialBuffer),
    generateNameRow(input, initialBuffer),
    generateMassRow(input, initialBuffer),
    [
      ...initialColumns,
      ...generateEmptyArray(columnCount - initialColumns.length),
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
