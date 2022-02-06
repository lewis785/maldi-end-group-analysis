import { Column } from './enum'

const expectedHeader = [
  'Peak',
  'Cation',
  'Mass',
  'Monomer',
  'Mass',
  'Endgroup',
  'Mass',
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

  validatePeak(row)
}

const validatePeak = (row: string[]) => {
  const peakString = row[Column.PEAK]

  if (peakString === '') {
    return
  }
  const peakValue = Number(peakString)

  if (isNaN(peakValue)) {
    throw new ValidationError('Peak value must be a number.')
  }

  if (peakValue < 0) {
    throw new ValidationError('Peak value cannot be negative.')
  }
}

const validateMonomer = () => {}

const validateCation = () => {}

const validateEndGroup = () => {}
