import {
  CationEndGroup,
  generateCationEndGroupCombinations,
  generateEndGroupCombinations,
} from './endgroup'
import { Cation, EndGroup, Monomer } from './types'
import { generateMonomerCombinations } from './monomerCombinations'
import { Result } from './types'

export const generateMalidResults = (
  peak: number,
  threshold: number,
  monomers: Monomer[],
  endGroups: EndGroup[],
  cations: Cation[]
): Result[] => {
  const minMass = peak - threshold
  const maxMass = peak + threshold

  const endGroupCombinations = generateEndGroupCombinations(endGroups)
  const cationEndGroups = generateCationEndGroupCombinations(
    endGroupCombinations,
    cations
  )

  const results: Result[] = cationEndGroups.flatMap((cationEndGroup) =>
    generateResultsForCationEndGroup(cationEndGroup, monomers, peak, maxMass)
  )

  return results
    .filter(({ mass }) => mass.actual >= minMass && mass.actual <= maxMass)
    .sort((a, b) => a.mass.difference - b.mass.difference)
}

const generateResultsForCationEndGroup = (
  cationEndGroup: CationEndGroup,
  monomers: Monomer[],
  targetMass: number,
  maxMass: number
): Result[] => {
  const remainingMass = maxMass - cationEndGroup.totalMass

  return generateMonomerCombinations(remainingMass, monomers).map(
    (monomerCombination) => {
      const actualMass =
        cationEndGroup.totalMass + totalMonomerMass(monomerCombination)
      return {
        ...cationEndGroup,
        monomers: monomerCombination,
        mass: {
          target: targetMass,
          actual: actualMass,
          difference: Math.abs(targetMass - actualMass),
        },
      }
    }
  )
}

const totalMonomerMass = (monomers: Monomer[]) => {
  return monomers.reduce((sum, monomer) => {
    return monomer.count ? sum + monomer.mass * monomer.count : sum
  }, 0)
}
