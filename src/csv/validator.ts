import { Column } from './enum'

const expectedHeader = [
  'Peak Name',
  'Peak Mass',
  'Cation Name',
  'Cation Mass',
  'Monomer Name',
  'Monomer Mass',
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

  validatePeak(row)
  validateMonomer(row)
}

const validatePeak = (row: string[]) => {
  const peakString = row[Column.PEAK_MASS]

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

const validateMonomer = (row: string[]) => {
  const monomerName = row[Column.MONOMER_NAME]
  const monomerMassString = row[Column.MONOMER_MASS]

  if (monomerName === '' && monomerMassString === '') {
    return
  }

  if (monomerName !== '' && monomerMassString === '') {
    throw new ValidationError('Monomer does not have a mass.')
  }

  if (monomerName === '' && monomerMassString !== '') {
    throw new ValidationError('Monomer does not have a name.')
  }

  const monomerMass = Number(monomerMassString)

  if (isNaN(monomerMass)) {
    throw new ValidationError('Monomer mass must be a number.')
  }

  if (monomerMass < 0) {
    throw new ValidationError('Monomer mass cannot be negative.')
  }
}

const validateCation = () => {}

const validateEndGroup = () => {}
