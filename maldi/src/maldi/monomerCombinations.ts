import { Monomer } from './types'

export const generateMonomerCombinations = (
  target: number,
  monomers: Monomer[]
): Monomer[][] => {
  switch (monomers.length) {
    case 1:
      return singleMonomer(target, monomers[0])
    default:
      throw Error(`More than one monomer is not support`)
  }
}

const singleMonomer = (target: number, monomer: Monomer): Monomer[][] => {
  const maxRepeatUnits = Math.floor(target / monomer.mass)

  if (maxRepeatUnits < 0) {
    return []
  }

  return [...Array(maxRepeatUnits)].map((_, index) => {
    return [{ ...monomer, count: index + 1 }]
  })
}
