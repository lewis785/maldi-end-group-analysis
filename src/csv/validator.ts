import { EndGroup } from './../maldi/endgroup'
import { Column } from './enum'

const expectedHeader = [
  'Peak Name',
  'Peak Mass',
  'Monomer Name',
  'Monomer Mass',
  'Cation Name',
  'Cation Mass',
  'Endgroup Name',
  'Endgroup Mass',
]

export class ValidationError extends Error {}

export const validateHeader = (header: string[]) => {
  if (header.length !== expectedHeader.length) {
    throw new ValidationError(
      `Incorrect column count. Expected: ${expectedHeader.length} Recieved: ${header.length}`
    )
  }

  const matching = header.reduce<boolean>((isSame, column, index) => {
    if (!isSame) return isSame

    return column === expectedHeader[index]
  }, true)

  if (!matching) {
    throw new ValidationError(
      `Header is not correct. Expected "${expectedHeader}" Recieved: "${header}"`
    )
  }
}

export const validateRow = (row: string[]) => {
  if (row.length !== expectedHeader.length) {
    throw new ValidationError(
      `Incorrect column count. Expected: ${expectedHeader.length} Recieved: ${row.length}`
    )
  }

  const isEmpty = row.reduce<boolean>((empty, column) => {
    if (!empty) return empty
    return column === ''
  }, true)

  if (isEmpty) {
    throw new ValidationError('No data found in row.')
  }

  // validatePeak(row)
  validateColumnNameAndMass(
    'Peak',
    row[Column.PEAK_NAME],
    row[Column.PEAK_MASS]
  )
  validateColumnNameAndMass(
    'Monomer',
    row[Column.MONOMER_NAME],
    row[Column.MONOMER_MASS]
  )
  validateColumnNameAndMass(
    'Cation',
    row[Column.CATION_NAME],
    row[Column.CATION_MASS]
  )
  validateColumnNameAndMass(
    'Endgroup',
    row[Column.ENDGROUP_NAME],
    row[Column.ENDGROUP_MASS]
  )
}

const validateColumnNameAndMass = (
  column: string,
  name: string,
  massString: string
) => {
  if (name === '' && massString === '') {
    return
  }

  if (name !== '' && massString === '') {
    throw new ValidationError(`${column} does not have a mass.`)
  }

  if (name === '' && massString !== '') {
    throw new ValidationError(`${column} does not have a name.`)
  }

  const mass = Number(massString)

  if (isNaN(mass)) {
    throw new ValidationError(`${column} mass must be a number.`)
  }

  if (mass < 0) {
    throw new ValidationError(`${column} mass cannot be negative.`)
  }
}
