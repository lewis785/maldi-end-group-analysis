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
