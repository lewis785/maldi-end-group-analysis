import { Monomer } from './types'

export const generateMonomerCombinations = (
  target: number,
  monomers: Monomer[]
): Monomer[][] => {
  if (monomers.length > 1) {
    return multiMonomer(target, monomers)
  }

  return singleMonomer(target, monomers[0])
}

const singleMonomer = (target: number, monomer: Monomer): Monomer[][] => {
  return possibleRepeatUnits(target, monomer).map<Monomer[]>((repeatUnits) => {
    return [{ ...monomer, count: repeatUnits }]
  })
}

const multiMonomer = (target: number, monomers: Monomer[]): Monomer[][] => {
  const fullMonomers = monomers.map((monomer) => ({
    monomer,
    repeatUnits: possibleRepeatUnits(target, monomer),
  }))

  return detectCombinations(fullMonomers, target)
}

const possibleRepeatUnits = (target: number, monomer: Monomer): number[] => {
  const maxRepeatUnits = Math.floor(target / monomer.mass)

  if (maxRepeatUnits < 0) {
    return []
  }

  return [...Array(maxRepeatUnits)].map((_, index) => {
    return index + 1
  })
}

const detectCombinations = (
  input: { monomer: Monomer; repeatUnits: number[] }[],
  target: number,
  output: Monomer[][] = [],
  pos = 0,
  path: Monomer[] = []
): Monomer[][] => {
  if (pos >= input.length) {
    return [...output, [...path]]
  }

  const item = input[pos]
  item.repeatUnits.forEach((repeatUnit) => {
    const newPath = [...path, { ...item.monomer, count: repeatUnit }]
    if (combinationTotalMass(newPath) <= target) {
      output = detectCombinations(input, target, output, pos + 1, newPath)
    }
  })

  return output
}

const combinationTotalMass = (combination: Monomer[]) => {
  return combination.reduce((total, monomer) => {
    return monomer.count ? total + monomer.mass * monomer.count : total
  }, 0)
}
