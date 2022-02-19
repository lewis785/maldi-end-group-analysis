import { Cation } from './../../maldi/types'
import { Input, Result, Monomer, NameMass } from 'maldi/types'
import { EndGroupTuple } from 'maldi/endgroup'

export const generateResultRow = (result: Result, input: Input) => {
  return [
    result.peak.name,
    result.peak.mass,
    result.mass.actual,
    result.mass.difference,
    '',
    ...mapMonomers(result.monomers, input.monomers),
    '',
    ...mapCation(result.cation, input.cations),
    '',
    ...mapEndGroups(result.endGroups, input.endGroups),
  ]
}

const mapMonomers = (monomers: Monomer[], monomerInput: NameMass[]) => {
  return monomerInput.map((input) => {
    const matchingMonomers = monomers.filter(
      (monomer) => monomer.name === input.name && monomer.mass === input.mass
    )

    if (matchingMonomers.length === 0) {
      return 0
    }

    if (matchingMonomers.length > 1) {
      throw Error(
        `Multiple monomers match column - Name: ${input.name} Mass: ${input.mass}`
      )
    }

    return matchingMonomers[0].count
  })
}

const mapCation = (cation: Cation, columns: NameMass[]) => {
  return columns.map((column) => {
    return column.name === cation.name && column.mass === cation.mass ? 1 : 0
  })
}

const mapEndGroups = (endGroups: EndGroupTuple, columns: NameMass[]) => {
  console.log('Columns', endGroups)
  return columns.map((column) => {
    const matches = endGroups.filter((endGroup) => {
      return column.name === endGroup.name && column.mass === endGroup.mass
    })

    if (matches.length > 1) {
      throw Error(
        `Multiple endGroups match column - Name: ${column.name} Mass: ${column.mass}`
      )
    }

    return matches.length
  })
}
