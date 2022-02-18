import {
  CationEndGroup,
  generateCationEndGroupCombinations,
  generateEndGroupCombinations,
} from './endgroup'
import { Cation, EndGroup, Input, Monomer, NameMass } from './types'
import { generateMonomerCombinations } from './monomerCombinations'
import { Result } from './types'

export const generateMalidResults = (
  { peaks, monomers, endGroups, cations }: Input,
  threshold: number
): Result[] => {
  return peaks.reduce<Result[]>((results, peak) => {
    return [
      ...results,
      ...generatePeakResults(peak, monomers, endGroups, cations, threshold),
    ]
  }, [])
}

const generatePeakResults = (
  peak: NameMass,
  monomers: Monomer[],
  endGroups: EndGroup[],
  cations: Cation[],
  threshold: number
): Result[] => {
  const minMass = peak.mass - threshold
  const maxMass = peak.mass + threshold

  const endGroupCombinations = generateEndGroupCombinations(endGroups)
  const cationEndGroups = generateCationEndGroupCombinations(
    endGroupCombinations,
    cations
  )

  const results: Result[] = cationEndGroups.flatMap((cationEndGroup) =>
    generateResultsForCationEndGroup(peak, cationEndGroup, monomers, maxMass)
  )

  return results
    .filter(({ mass }) => mass.actual >= minMass && mass.actual <= maxMass)
    .sort((a, b) => a.mass.difference - b.mass.difference)
}

const generateResultsForCationEndGroup = (
  peak: NameMass,
  cationEndGroup: CationEndGroup,
  monomers: Monomer[],
  maxMass: number
): Result[] => {
  const remainingMass = maxMass - cationEndGroup.totalMass

  return generateMonomerCombinations(remainingMass, monomers).map(
    (monomerCombination) => {
      return generateResult(peak, cationEndGroup, monomerCombination)
    }
  )
}

const generateResult = (
  peak: NameMass,
  cationEndGroup: CationEndGroup,
  monomerCombination: Monomer[]
): Result => {
  const actualMass =
    cationEndGroup.totalMass + totalMonomerMass(monomerCombination)

  return {
    peak,
    ...cationEndGroup,
    monomers: monomerCombination,
    mass: {
      target: peak.mass,
      actual: actualMass,
      difference: Math.abs(peak.mass - actualMass),
    },
  }
}

const totalMonomerMass = (monomers: Monomer[]) => {
  return monomers.reduce((sum, monomer) => {
    return monomer.count ? sum + monomer.mass * monomer.count : sum
  }, 0)
}
